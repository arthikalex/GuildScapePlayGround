import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Artwork, PeerReview, QualityRating } from '@/types/artwork';
import { mockArtworks } from '@utils/mockData';

interface ArtworkSubmission {
  title: string;
  description: string;
  image: string;
  medium: string;
  dimensions: string;
  year: number;
  tags: string[];
  forSale?: boolean;
  price?: number;
}

interface ArtworkStore {
  artworks: Artwork[];
  mySubmissions: Artwork[];
  reviewQueue: Artwork[];

  // Actions
  setArtworks: (artworks: Artwork[]) => void;
  submitArtwork: (submission: ArtworkSubmission, artistId: string, artistName: string) => Artwork;
  submitReview: (
    artworkId: string,
    review: Omit<PeerReview, 'id'>
  ) => void;
  getArtworkById: (id: string) => Artwork | undefined;
  getArtworksByArtist: (artistId: string) => Artwork[];
  getReviewQueue: (excludeArtistId: string) => Artwork[];
}

export const useArtworkStore = create<ArtworkStore>()(
  persist(
    (set, get) => ({
      artworks: mockArtworks,
      mySubmissions: [],
      reviewQueue: [],

      setArtworks: (artworks) => set({ artworks }),

      submitArtwork: (submission, artistId, artistName) => {
        const newArtwork: Artwork = {
          id: `artwork-${Date.now()}`,
          artistId,
          artistName,
          artistAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${artistName}`,
          title: submission.title,
          description: submission.description,
          image: submission.image,
          medium: submission.medium as import('@/types/artwork').ArtworkMedium,
          dimensions: submission.dimensions,
          year: submission.year,
          uploadDate: new Date(),
          tags: submission.tags,
          views: 0,
          appreciations: 0,
          peerReviews: [],
          forSale: submission.forSale || false,
          price: submission.price,
        };

        set((state) => ({
          artworks: [newArtwork, ...state.artworks],
          mySubmissions: [newArtwork, ...state.mySubmissions],
        }));

        return newArtwork;
      },

      submitReview: (artworkId, reviewData) => {
        const newReview: PeerReview = {
          ...reviewData,
          id: `review-${Date.now()}`,
        };

        set((state) => ({
          artworks: state.artworks.map((artwork) => {
            if (artwork.id === artworkId) {
              const updatedReviews = [...artwork.peerReviews, newReview];

              // Calculate quality based on reviews
              const quality = calculateQuality(updatedReviews);

              return {
                ...artwork,
                peerReviews: updatedReviews,
                quality,
              };
            }
            return artwork;
          }),
        }));
      },

      getArtworkById: (id) => {
        return get().artworks.find((a) => a.id === id);
      },

      getArtworksByArtist: (artistId) => {
        return get().artworks.filter((a) => a.artistId === artistId);
      },

      getReviewQueue: (excludeArtistId) => {
        // Get artworks that need reviews (less than 3 reviews) and not created by the user
        return get().artworks.filter(
          (a) => a.artistId !== excludeArtistId && a.peerReviews.length < 3
        );
      },
    }),
    {
      name: 'artwork-storage',
      partialize: (state) => ({
        artworks: state.artworks,
        mySubmissions: state.mySubmissions,
      }),
    }
  )
);

// Helper function to calculate quality based on peer reviews
function calculateQuality(reviews: PeerReview[]): QualityRating | undefined {
  if (reviews.length === 0) return undefined;

  const avgScore =
    reviews.reduce((sum, r) => {
      const reviewAvg = (r.technicalScore + r.creativityScore + r.craftsmanshipScore) / 3;
      return sum + reviewAvg;
    }, 0) / reviews.length;

  if (avgScore >= 85) return 'breakthrough';
  if (avgScore >= 70) return 'excellence';
  if (avgScore >= 50) return 'proficiency';
  return 'fundamental';
}
