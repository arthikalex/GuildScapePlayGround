import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork, QualityRating } from '@/types/artwork';
import { Textarea } from '@components/common/Input';
import { useArtworkStore } from '@store/artworkStore';
import { useUserStore } from '@store/userStore';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface PeerReviewFormProps {
  artwork: Artwork;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PeerReviewForm: React.FC<PeerReviewFormProps> = ({ artwork, onSuccess, onCancel }) => {
  const { submitReview } = useArtworkStore();
  const { currentUser } = useUserStore();

  const [scores, setScores] = useState({
    technical: 70,
    creativity: 70,
    craftsmanship: 70,
  });
  const [rating, setRating] = useState<QualityRating>('proficiency');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null;

  const handleScoreChange = (category: keyof typeof scores, value: number) => {
    setScores({ ...scores, [category]: value });

    // Auto-update rating based on average
    const avg = (scores.technical + scores.creativity + scores.craftsmanship + value) / 3;
    if (avg >= 85) setRating('breakthrough');
    else if (avg >= 70) setRating('excellence');
    else if (avg >= 50) setRating('proficiency');
    else setRating('fundamental');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim() || feedback.trim().length < 20) {
      toast.error('Please provide detailed feedback (at least 20 characters)');
      return;
    }

    setIsSubmitting(true);

    try {
      submitReview(artwork.id, {
        reviewerId: currentUser.id,
        reviewer: currentUser.name,
        reviewerAvatar: currentUser.avatar,
        reviewerTier: currentUser.tier,
        rating,
        technicalScore: scores.technical,
        creativityScore: scores.creativity,
        craftsmanshipScore: scores.craftsmanship,
        feedback: feedback.trim(),
        timestamp: new Date(),
      });

      toast.success('🎨 Review submitted! +5 REP earned');

      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit review');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgScore = Math.round((scores.technical + scores.creativity + scores.craftsmanship) / 3);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2">
          Peer Review
        </h2>
        <p className="text-burnt-umber/70">
          Provide constructive feedback to help <strong>{artwork.artistName}</strong> grow
        </p>
      </div>

      {/* Scoring Section */}
      <div className="mb-8 p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
        <h3 className="text-xl font-display font-bold text-burnt-umber mb-6">
          Assessment Scores
        </h3>

        {/* Technical Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-display font-semibold text-burnt-umber">
              Technical Execution
            </label>
            <span className="text-2xl font-display font-bold text-council-blue">
              {scores.technical}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={scores.technical}
            onChange={(e) => handleScoreChange('technical', parseInt(e.target.value))}
            className="w-full h-3 bg-parchment-dark rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-council-blue
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-burnt-umber
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-seal
                     [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-council-blue
                     [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-burnt-umber
                     [&::-moz-range-thumb]:cursor-pointer"
          />
          <p className="text-xs text-burnt-umber/60 mt-1">
            Technique, skill level, and execution quality
          </p>
        </div>

        {/* Creativity Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-display font-semibold text-burnt-umber">
              Creativity & Originality
            </label>
            <span className="text-2xl font-display font-bold text-council-purple">
              {scores.creativity}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={scores.creativity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleScoreChange('creativity', parseInt(e.target.value))}
            className="w-full h-3 bg-parchment-dark rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-council-purple
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-burnt-umber
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-seal
                     [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-council-purple
                     [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-burnt-umber
                     [&::-moz-range-thumb]:cursor-pointer"
          />
          <p className="text-xs text-burnt-umber/60 mt-1">
            Unique vision, innovation, and artistic expression
          </p>
        </div>

        {/* Craftsmanship Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-display font-semibold text-burnt-umber">
              Craftsmanship & Detail
            </label>
            <span className="text-2xl font-display font-bold text-gold">
              {scores.craftsmanship}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={scores.craftsmanship}
            onChange={(e) => handleScoreChange('craftsmanship', parseInt(e.target.value))}
            className="w-full h-3 bg-parchment-dark rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-burnt-umber
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-seal
                     [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold
                     [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-burnt-umber
                     [&::-moz-range-thumb]:cursor-pointer"
          />
          <p className="text-xs text-burnt-umber/60 mt-1">
            Attention to detail, finish quality, and professionalism
          </p>
        </div>

        {/* Overall Score */}
        <div className="pt-6 border-t-2 border-burnt-umber/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-semibold text-burnt-umber mb-1">
                Overall Assessment
              </div>
              <div className={clsx(
                'inline-block px-4 py-2 rounded-lg border-2 font-display font-bold uppercase text-sm',
                rating === 'breakthrough' && 'bg-gold/20 border-gold text-gold',
                rating === 'excellence' && 'bg-blue-600/20 border-blue-600 text-blue-600',
                rating === 'proficiency' && 'bg-green-600/20 border-green-600 text-green-600',
                rating === 'fundamental' && 'bg-burnt-umber/20 border-burnt-umber text-burnt-umber'
              )}>
                {rating} Quality
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-burnt-umber/60 mb-1">Average Score</div>
              <div className="text-5xl font-display font-bold text-gold">
                {avgScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mb-8">
        <label className="block text-xl font-display font-bold text-burnt-umber mb-3">
          Written Feedback *
        </label>
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts on this artwork. What stands out? What could be improved? Be specific and constructive..."
          rows={8}
          className="text-base"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-burnt-umber/60">
            Minimum 20 characters. Be thoughtful and constructive.
          </p>
          <p className={clsx(
            'text-xs font-display font-semibold',
            feedback.length >= 20 ? 'text-vote-approve' : 'text-burnt-umber/60'
          )}>
            {feedback.length} / 20
          </p>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mb-8 p-6 bg-council-blue/10 rounded-xl border-2 border-council-blue/30">
        <h4 className="font-display font-semibold text-burnt-umber mb-3">
          💡 Review Guidelines
        </h4>
        <ul className="space-y-2 text-sm text-burnt-umber/70">
          <li>• <strong>Be constructive:</strong> Focus on helping the artist improve</li>
          <li>• <strong>Be specific:</strong> Point out what works and what doesn't</li>
          <li>• <strong>Be respectful:</strong> Critique the work, not the person</li>
          <li>• <strong>Be balanced:</strong> Highlight strengths and areas for growth</li>
        </ul>
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
          disabled={isSubmitting || feedback.length < 20}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review (+5 REP)'}
        </button>
      </div>
    </motion.form>
  );
};
