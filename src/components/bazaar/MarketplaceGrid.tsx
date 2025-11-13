import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { MarketplaceListing, MarketplaceFilters } from '@/types/marketplace';
import type { QualityRating } from '@/types/artwork';
import { ArtworkCard } from './ArtworkCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';

interface MarketplaceGridProps {
  listings: MarketplaceListing[];
  onSelectListing: (listing: MarketplaceListing) => void;
  onAddToCart: (listing: MarketplaceListing) => void;
  cartListingIds: string[];
  className?: string;
}

const mediumOptions: Array<'digital' | 'traditional' | 'Photography' | 'Sculpture' | 'Mixed Media' | 'mixed-media'> = [
  'digital',
  'traditional',
  'Photography',
  'Sculpture',
  'Mixed Media',
  'mixed-media',
];

const qualityOptions: QualityRating[] = [
  'fundamental',
  'proficiency',
  'excellence',
  'breakthrough',
];

const licenseOptions = [
  { value: 'personal', label: 'Personal Use' },
  { value: 'commercial', label: 'Commercial Use' },
  { value: 'exclusive', label: 'Exclusive Rights' },
];

const sortOptions = [
  { value: 'recent', label: 'Recently Listed' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'quality', label: 'Highest Quality' },
];

export const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  listings,
  onSelectListing,
  onAddToCart,
  cartListingIds,
  className,
}) => {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'recent',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  let filteredListings = listings.filter((listing) => listing.status === 'active');

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredListings = filteredListings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.artistName.toLowerCase().includes(query) ||
        listing.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (filters.medium) {
    filteredListings = filteredListings.filter((listing) => listing.medium === filters.medium);
  }

  if (filters.quality) {
    filteredListings = filteredListings.filter((listing) => listing.quality === filters.quality);
  }

  if (filters.licenseType) {
    filteredListings = filteredListings.filter(
      (listing) => listing.licenseType === filters.licenseType
    );
  }

  if (filters.minPrice !== undefined) {
    filteredListings = filteredListings.filter((listing) => listing.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filteredListings = filteredListings.filter((listing) => listing.price <= filters.maxPrice!);
  }

  // Apply sorting
  filteredListings = [...filteredListings].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.views + b.likes - (a.views + a.likes);
      case 'quality':
        const qualityOrder = { breakthrough: 4, excellence: 3, proficiency: 2, fundamental: 1 };
        return (
          (qualityOrder[b.quality || 'fundamental'] || 0) -
          (qualityOrder[a.quality || 'fundamental'] || 0)
        );
      case 'recent':
      default:
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
    }
  });

  const activeFilterCount = [
    filters.medium,
    filters.quality,
    filters.licenseType,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ sortBy: filters.sortBy });
  };

  return (
    <div className={className}>
      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-burnt-umber/40" />
          <Input
            type="text"
            placeholder="Search artworks, artists, or tags..."
            value={filters.searchQuery || ''}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="pl-12 pr-4 py-3 text-lg"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter Toggle */}
          <Button
            variant={showFilters ? 'primary' : 'secondary'}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-burnt-umber text-parchment text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy || 'recent'}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as MarketplaceFilters['sortBy'],
              })
            }
            className="px-4 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <Button variant="tertiary" onClick={clearFilters} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}

          {/* Results Count */}
          <div className="ml-auto text-sm font-display text-burnt-umber/70">
            {filteredListings.length} {filteredListings.length === 1 ? 'artwork' : 'artworks'}
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Medium Filter */}
              <div>
                <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
                  Medium
                </label>
                <select
                  value={filters.medium || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      medium: (e.target.value as any) || undefined,
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue"
                >
                  <option value="">All Mediums</option>
                  {mediumOptions.map((medium) => (
                    <option key={medium} value={medium}>
                      {medium.charAt(0).toUpperCase() + medium.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality Filter */}
              <div>
                <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
                  Quality
                </label>
                <select
                  value={filters.quality || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      quality: e.target.value ? (e.target.value as QualityRating) : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue"
                >
                  <option value="">All Qualities</option>
                  {qualityOptions.map((quality) => (
                    <option key={quality} value={quality}>
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* License Type */}
              <div>
                <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
                  License Type
                </label>
                <select
                  value={filters.licenseType || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      licenseType: e.target.value
                        ? (e.target.value as 'personal' | 'commercial' | 'exclusive')
                        : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-burnt-umber/20 rounded-lg font-display bg-parchment text-burnt-umber focus:outline-none focus:border-council-blue"
                >
                  <option value="">All Licenses</option>
                  {licenseOptions.map((license) => (
                    <option key={license.value} value={license.value}>
                      {license.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-display font-semibold text-burnt-umber mb-2">
                  Price Range (GLD)
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="flex-1"
                  />
                  <span className="text-burnt-umber/40">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Artwork Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">
            No artworks found
          </h3>
          <p className="text-burnt-umber/70 mb-6">
            Try adjusting your filters or search terms
          </p>
          {activeFilterCount > 0 && (
            <Button onClick={clearFilters} variant="primary">
              Clear All Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ArtworkCard
                listing={listing}
                onSelect={onSelectListing}
                onAddToCart={onAddToCart}
                inCart={cartListingIds.includes(listing.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
