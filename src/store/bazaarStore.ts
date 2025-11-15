import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MarketplaceListing, CartItem, Transaction, Offer } from '@/types/marketplace';

interface BazaarState {
  // Listings
  listings: MarketplaceListing[];

  // Cart
  cart: CartItem[];

  // Transactions
  transactions: Transaction[];

  // Offers
  offers: Offer[];

  // Actions
  addListing: (listing: Omit<MarketplaceListing, 'id' | 'listedDate' | 'views' | 'likes' | 'status'>) => void;
  updateListing: (id: string, updates: Partial<MarketplaceListing>) => void;
  removeListing: (id: string) => void;

  addToCart: (listing: MarketplaceListing) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;

  purchaseItems: (userId: string, items: MarketplaceListing[]) => void;

  makeOffer: (listingId: string, buyerId: string, buyerName: string, amount: number, message?: string) => void;
  respondToOffer: (offerId: string, accept: boolean) => void;

  getSellerListings: (artistId: string) => MarketplaceListing[];
  getBuyerTransactions: (buyerId: string) => Transaction[];
  getSellerTransactions: (sellerId: string) => Transaction[];
  getCartTotal: () => number;
}

export const useBazaarStore = create<BazaarState>()(
  persist(
    (set, get) => ({
      listings: [],
      cart: [],
      transactions: [],
      offers: [],

      addListing: (listing) => {
        const newListing: MarketplaceListing = {
          ...listing,
          id: `listing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          listedDate: new Date(),
          status: 'active',
          views: 0,
          likes: 0,
        };
        set((state) => ({ listings: [...state.listings, newListing] }));
      },

      updateListing: (id, updates) => {
        set((state) => ({
          listings: state.listings.map((listing) =>
            listing.id === id ? { ...listing, ...updates } : listing
          ),
        }));
      },

      removeListing: (id) => {
        get().updateListing(id, { status: 'removed' });
      },

      addToCart: (listing) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.listing.id === listing.id);

        if (existingItem) {
          // Already in cart, don't add again
          return;
        }

        const cartItem: CartItem = {
          listing,
          addedAt: new Date(),
        };

        set((state) => ({ cart: [...state.cart, cartItem] }));
      },

      removeFromCart: (listingId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.listing.id !== listingId),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      purchaseItems: (userId, items) => {
        const newTransactions: Transaction[] = items.map((item) => ({
          id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          listingId: item.id,
          buyerId: userId,
          sellerId: item.artistId,
          amount: item.price,
          status: 'completed',
          createdAt: new Date(),
          completedAt: new Date(),
          artwork: {
            title: item.title,
            imageUrl: item.imageUrl,
            artistName: item.artistName,
          },
        }));

        // Mark listings as sold
        items.forEach((item) => {
          get().updateListing(item.id, { status: 'sold' });
        });

        set((state) => ({
          transactions: [...state.transactions, ...newTransactions],
        }));

        // Clear cart
        get().clearCart();
      },

      makeOffer: (listingId, buyerId, buyerName, amount, message) => {
        const newOffer: Offer = {
          id: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          listingId,
          buyerId,
          buyerName,
          amount,
          message,
          status: 'pending',
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        };

        set((state) => ({ offers: [...state.offers, newOffer] }));
      },

      respondToOffer: (offerId, accept) => {
        const offer = get().offers.find((o) => o.id === offerId);
        if (!offer) return;

        if (accept) {
          // Update listing with new price and mark as reserved
          get().updateListing(offer.listingId, {
            price: offer.amount,
            status: 'reserved',
          });
        }

        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === offerId
              ? { ...o, status: accept ? 'accepted' : 'rejected' }
              : o
          ),
        }));
      },

      getSellerListings: (artistId) => {
        return get().listings.filter((listing) => listing.artistId === artistId);
      },

      getBuyerTransactions: (buyerId) => {
        return get().transactions.filter((tx) => tx.buyerId === buyerId);
      },

      getSellerTransactions: (sellerId) => {
        return get().transactions.filter((tx) => tx.sellerId === sellerId);
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.listing.price, 0);
      },
    }),
    {
      name: 'bazaar-storage-v2',
    }
  )
);
