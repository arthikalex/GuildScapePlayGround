import type { ArtworkMedium, QualityRating } from './artwork';

export type ListingStatus = 'active' | 'sold' | 'reserved' | 'removed';

export type TransactionStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface MarketplaceListing {
  id: string;
  artworkId: string;
  artistId: string;
  artistName: string;
  artistAvatar?: string;
  title: string;
  description: string;
  medium: ArtworkMedium | 'digital' | 'traditional' | 'mixed-media';
  imageUrl: string;
  price: number;
  originalPrice?: number; // For showing discounts
  quality?: QualityRating;
  tags: string[];
  listedDate: Date;
  status: ListingStatus;
  views: number;
  likes: number;
  dimensions?: {
    width: number;
    height: number;
    unit: 'px' | 'cm' | 'in';
  };
  fileFormat?: string;
  isLimitedEdition?: boolean;
  editionNumber?: number;
  totalEditions?: number;
  licenseType: 'personal' | 'commercial' | 'exclusive';
  featured?: boolean;
}

export interface Transaction {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: Date;
  completedAt?: Date;
  artwork: {
    title: string;
    imageUrl: string;
    artistName: string;
  };
}

export interface CartItem {
  listing: MarketplaceListing;
  addedAt: Date;
}

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export interface MarketplaceFilters {
  medium?: ArtworkMedium | 'digital' | 'traditional';
  minPrice?: number;
  maxPrice?: number;
  quality?: QualityRating;
  licenseType?: 'personal' | 'commercial' | 'exclusive';
  searchQuery?: string;
  sortBy?: 'recent' | 'price-low' | 'price-high' | 'popular' | 'quality';
}
