import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X, Plus, DollarSign } from 'lucide-react';
import { Input, Textarea } from '@components/common/Input';
import { useArtworkStore } from '@store/artworkStore';
import { useUserStore } from '@store/userStore';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface ArtworkUploadFormProps {
  onSuccess?: (artworkId: string) => void;
  onCancel?: () => void;
}

export const ArtworkUploadForm: React.FC<ArtworkUploadFormProps> = ({ onSuccess, onCancel }) => {
  const { submitArtwork } = useArtworkStore();
  const { currentUser } = useUserStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    medium: '',
    dimensions: '',
    year: new Date().getFullYear(),
    tags: [] as string[],
    forSale: false,
    price: 0,
  });

  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server here
      // For now, we'll use a placeholder URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        // In production, this would be the uploaded image URL
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('You must be logged in to submit artwork');
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    if (!formData.medium.trim()) {
      toast.error('Please enter the medium');
      return;
    }

    setIsSubmitting(true);

    try {
      const artwork = submitArtwork(formData, currentUser.id, currentUser.name);

      toast.success('🎨 Artwork submitted successfully!');

      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        medium: '',
        dimensions: '',
        year: new Date().getFullYear(),
        tags: [],
        forSale: false,
        price: 0,
      });
      setImagePreview('');
      setTagInput('');

      onSuccess?.(artwork.id);
    } catch (error) {
      toast.error('Failed to submit artwork');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image Upload */}
      <div className="mb-8">
        <label className="block text-lg font-display font-semibold text-burnt-umber mb-3">
          Artwork Image *
        </label>

        {!imagePreview ? (
          <label className="relative block w-full h-96 border-4 border-dashed border-burnt-umber/30 rounded-2xl hover:border-burnt-umber/50 transition-colors cursor-pointer bg-parchment-light group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <Upload className="w-12 h-12 text-gold" />
              </motion.div>
              <p className="text-xl font-display font-semibold text-burnt-umber mb-2">
                Upload Your Artwork
              </p>
              <p className="text-sm text-burnt-umber/60">
                Click to browse or drag and drop
              </p>
              <p className="text-xs text-burnt-umber/50 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </label>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-96 object-cover rounded-2xl border-4 border-burnt-umber"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview('');
                setFormData({ ...formData, image: '' });
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-vote-reject hover:bg-vote-reject/80 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-parchment" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <label className="flex-1 btn-secondary">
                <ImageIcon className="w-4 h-4" />
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
          Title *
        </label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Give your artwork a memorable title"
          className="text-lg"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Tell us about your artwork - inspiration, technique, story behind it..."
          rows={5}
        />
      </div>

      {/* Medium & Dimensions Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
            Medium *
          </label>
          <Input
            value={formData.medium}
            onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
            placeholder="e.g., Oil on canvas, Digital, Watercolor"
          />
        </div>

        <div>
          <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
            Dimensions
          </label>
          <Input
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 24 x 36 inches"
          />
        </div>
      </div>

      {/* Year */}
      <div className="mb-6">
        <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
          Year Created
        </label>
        <Input
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          min={1900}
          max={new Date().getFullYear()}
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-lg font-display font-semibold text-burnt-umber mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add tags (press Enter)"
            className="flex-1"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="btn-secondary"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <motion.div
                key={tag}
                className="px-3 py-1 bg-gold/20 rounded-full text-sm text-burnt-umber font-display flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-vote-reject transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* For Sale */}
      <div className="mb-8 p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.forSale}
            onChange={(e) => setFormData({ ...formData, forSale: e.target.checked })}
            className="w-5 h-5 rounded border-2 border-burnt-umber text-gold focus:ring-gold"
          />
          <span className="text-lg font-display font-semibold text-burnt-umber">
            Available for Purchase
          </span>
        </label>

        {formData.forSale && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
              Price (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/60" />
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                min={0}
                step={0.01}
                className="pl-12"
                placeholder="0.00"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={clsx('btn-primary', isSubmitting && 'opacity-50 cursor-not-allowed')}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Artwork'}
        </button>
      </div>
    </motion.form>
  );
};
