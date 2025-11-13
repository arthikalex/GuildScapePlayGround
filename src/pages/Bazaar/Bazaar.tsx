import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingCart as CartIcon, History, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import { MarketplaceGrid } from '@components/bazaar/MarketplaceGrid';
import { ArtworkDetailModal } from '@components/bazaar/ArtworkDetailModal';
import { ShoppingCart } from '@components/bazaar/ShoppingCart';
import { useBazaarStore } from '@/store/bazaarStore';
import type { MarketplaceListing } from '@/types/marketplace';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

type Tab = 'browse' | 'cart' | 'transactions';

// Mock listings data
const mockListings: MarketplaceListing[] = [
  {
    id: 'l1',
    artworkId: 'a1',
    artistId: 'user-2',
    artistName: 'Elena Brightwood',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    title: 'Mystic Forest at Dawn',
    description:
      'A serene digital painting capturing the magical atmosphere of an ancient forest bathed in early morning light. Created using advanced digital techniques.',
    medium: 'digital',
    imageUrl: 'https://picsum.photos/seed/art1/800/800',
    price: 250,
    originalPrice: 300,
    quality: 'excellence',
    tags: ['landscape', 'fantasy', 'nature', 'atmospheric'],
    listedDate: new Date('2025-11-10'),
    status: 'active',
    views: 342,
    likes: 87,
    dimensions: { width: 4000, height: 4000, unit: 'px' },
    fileFormat: 'PNG (High Res)',
    licenseType: 'commercial',
    featured: true,
  },
  {
    id: 'l2',
    artworkId: 'a2',
    artistId: 'user-3',
    artistName: 'Marcus Stone',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    title: 'Urban Dreams',
    description:
      'Abstract interpretation of city life through bold colors and geometric shapes. Mixed media on canvas.',
    medium: 'mixed-media',
    imageUrl: 'https://picsum.photos/seed/art2/800/800',
    price: 450,
    quality: 'breakthrough',
    tags: ['abstract', 'urban', 'contemporary', 'bold'],
    listedDate: new Date('2025-11-11'),
    status: 'active',
    views: 189,
    likes: 52,
    dimensions: { width: 90, height: 120, unit: 'cm' },
    licenseType: 'exclusive',
    isLimitedEdition: true,
    editionNumber: 1,
    totalEditions: 1,
  },
  {
    id: 'l3',
    artworkId: 'a3',
    artistId: 'user-4',
    artistName: 'Yuki Tanaka',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuki',
    title: 'Cherry Blossom Memories',
    description:
      'Traditional Japanese ink painting with a modern twist. Celebrates the fleeting beauty of spring.',
    medium: 'traditional',
    imageUrl: 'https://picsum.photos/seed/art3/800/800',
    price: 180,
    quality: 'proficiency',
    tags: ['traditional', 'japanese', 'floral', 'minimalist'],
    listedDate: new Date('2025-11-12'),
    status: 'active',
    views: 267,
    likes: 64,
    dimensions: { width: 60, height: 90, unit: 'cm' },
    licenseType: 'personal',
  },
  {
    id: 'l4',
    artworkId: 'a4',
    artistId: 'user-5',
    artistName: 'Alex Rivera',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    title: 'Digital Dreamscape',
    description:
      'Futuristic digital art exploring the intersection of technology and imagination. Created entirely in 3D.',
    medium: 'digital',
    imageUrl: 'https://picsum.photos/seed/art4/800/800',
    price: 350,
    quality: 'excellence',
    tags: ['3d', 'futuristic', 'scifi', 'digital'],
    listedDate: new Date('2025-11-12'),
    status: 'active',
    views: 412,
    likes: 103,
    dimensions: { width: 3840, height: 2160, unit: 'px' },
    fileFormat: '4K PNG',
    licenseType: 'commercial',
    featured: true,
  },
  {
    id: 'l5',
    artworkId: 'a5',
    artistId: 'user-6',
    artistName: 'Sofia Chen',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    title: 'Ocean Depths',
    description: 'Underwater photography capturing the mysterious beauty of deep sea life.',
    medium: 'Photography',
    imageUrl: 'https://picsum.photos/seed/art5/800/800',
    price: 120,
    quality: 'proficiency',
    tags: ['photography', 'nature', 'ocean', 'underwater'],
    listedDate: new Date('2025-11-13'),
    status: 'active',
    views: 156,
    likes: 41,
    dimensions: { width: 6000, height: 4000, unit: 'px' },
    fileFormat: 'RAW + JPG',
    licenseType: 'commercial',
  },
  {
    id: 'l6',
    artworkId: 'a6',
    artistId: 'user-7',
    artistName: 'Diego Martinez',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    title: 'Ethereal Sculpture',
    description: 'Conceptual sculpture exploring form and negative space. 3D rendered for digital collection.',
    medium: 'Sculpture',
    imageUrl: 'https://picsum.photos/seed/art6/800/800',
    price: 580,
    quality: 'breakthrough',
    tags: ['sculpture', '3d', 'conceptual', 'modern'],
    listedDate: new Date('2025-11-13'),
    status: 'active',
    views: 223,
    likes: 71,
    licenseType: 'exclusive',
    isLimitedEdition: true,
    editionNumber: 2,
    totalEditions: 5,
  },
];

export const Bazaar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('browse');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  const { cart, addToCart, removeFromCart, clearCart, purchaseItems, makeOffer, listings: storeListings } = useBazaarStore();

  // Combine mock listings with store listings (in production, would only use store)
  const allListings = [...mockListings, ...storeListings];

  const cartListingIds = cart.map((item) => item.listing.id);

  const handleAddToCart = (listing: MarketplaceListing) => {
    addToCart(listing);
    toast.success(`${listing.title} added to cart!`);
  };

  const handleRemoveFromCart = (listingId: string) => {
    removeFromCart(listingId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    const items = cart.map((item) => item.listing);
    purchaseItems('current-user', items);
    toast.success('Purchase completed! Check your transactions.');
    setActiveTab('transactions');
  };

  const handleMakeOffer = (listing: MarketplaceListing, amount: number, message: string) => {
    makeOffer(listing.id, 'current-user', 'Current User', amount, message);
    toast.success('Offer sent to the artist!');
    setSelectedListing(null);
  };

  const transactions = useBazaarStore((state) =>
    state.getBuyerTransactions('current-user')
  );

  const tabs = [
    { id: 'browse' as Tab, label: 'Browse', icon: Store, count: allListings.filter(l => l.status === 'active').length },
    { id: 'cart' as Tab, label: 'Cart', icon: CartIcon, count: cart.length },
    { id: 'transactions' as Tab, label: 'My Purchases', icon: History, count: transactions.length },
  ];

  return (
    <div className="min-h-screen bg-parchment py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-display font-bold text-burnt-umber mb-3 flex items-center justify-center gap-4">
            <Store className="w-12 h-12 text-gold" />
            The Bazaar
          </h1>
          <p className="text-xl text-burnt-umber/70 max-w-2xl mx-auto">
            Discover and collect exceptional artworks from talented artisans across the realm
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'relative px-6 py-3 rounded-lg font-display font-semibold transition-all flex items-center gap-2',
                    activeTab === tab.id
                      ? 'bg-gold text-burnt-umber border-2 border-burnt-umber shadow-seal'
                      : 'text-burnt-umber/70 hover:text-burnt-umber hover:bg-burnt-umber/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={clsx(
                        'ml-2 px-2 py-0.5 rounded-full text-xs font-bold',
                        activeTab === tab.id
                          ? 'bg-burnt-umber text-gold'
                          : 'bg-council-blue text-parchment'
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'browse' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MarketplaceGrid
                  listings={allListings}
                  onSelectListing={setSelectedListing}
                  onAddToCart={handleAddToCart}
                  cartListingIds={cartListingIds}
                />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <ShoppingCart
                    cart={cart}
                    onRemoveItem={handleRemoveFromCart}
                    onCheckout={handleCheckout}
                    onClearCart={clearCart}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="max-w-2xl mx-auto">
              <ShoppingCart
                cart={cart}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckout}
                onClearCart={clearCart}
              />
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-6">
                <h2 className="text-2xl font-display font-bold text-burnt-umber mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-gold" />
                  Purchase History
                </h2>

                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📜</div>
                    <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
                      No purchases yet
                    </h3>
                    <p className="text-burnt-umber/70 mb-6">
                      Your transaction history will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 p-4 bg-parchment rounded-xl border-2 border-burnt-umber/10"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-burnt-umber/20">
                          <img
                            src={transaction.artwork.imageUrl}
                            alt={transaction.artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h4 className="font-display font-semibold text-burnt-umber mb-1">
                            {transaction.artwork.title}
                          </h4>
                          <p className="text-sm text-burnt-umber/70 mb-2">
                            by {transaction.artwork.artistName}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-display font-bold text-gold">
                              {transaction.amount} GLD
                            </span>
                            <span className="text-xs text-burnt-umber/50">
                              {format(new Date(transaction.createdAt), 'MMM d, yyyy')}
                            </span>
                            <span
                              className={clsx(
                                'px-2 py-1 rounded text-xs font-display font-semibold',
                                transaction.status === 'completed' && 'bg-vote-approve/20 text-vote-approve',
                                transaction.status === 'pending' && 'bg-gold/20 text-gold',
                                transaction.status === 'cancelled' && 'bg-vote-reject/20 text-vote-reject'
                              )}
                            >
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Artwork Detail Modal */}
      <ArtworkDetailModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        onAddToCart={handleAddToCart}
        onMakeOffer={handleMakeOffer}
        inCart={selectedListing ? cartListingIds.includes(selectedListing.id) : false}
      />
    </div>
  );
};
