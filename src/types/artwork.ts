export type ArtworkMedium =
  | 'Ceramic'
  | 'Sculpture'
  | 'Painting'
  | 'Drawing'
  | 'Printmaking'
  | 'Textile'
  | 'Mixed Media'
  | 'Photography'
  | 'Installation';

export type QualityRating = 'fundamental' | 'proficiency' | 'excellence' | 'breakthrough';

export interface PeerReview {
  id: string;
  reviewerId: string;
  reviewer: string;
  reviewerAvatar: string;
  reviewerTier: string;
  rating: QualityRating;
  feedback: string;
  technicalScore: number;
  creativityScore: number;
  craftsmanshipScore: number;
  timestamp: Date;
}

export interface Artwork {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  title: string;
  medium: ArtworkMedium;
  dimensions: string;
  year: number;
  image: string;
  images?: string[]; // Multiple images for detailed views
  description?: string;
  quality?: QualityRating;
  views: number;
  appreciations: number;
  peerReviews: PeerReview[];
  tags?: string[];
  materials?: string[];
  techniques?: string[];
  uploadDate: Date;
  featured?: boolean;
  forSale?: boolean;
  price?: number;
}

export interface Portfolio {
  userId: string;
  artworks: Artwork[];
  featured: string[]; // Featured artwork IDs
  collections: {
    id: string;
    name: string;
    description: string;
    artworkIds: string[];
  }[];
}

export interface MaterialExpertise {
  medium: ArtworkMedium;
  level: number; // 1-100
  artworksCreated: number;
  breakthroughsAchieved: number;
}
