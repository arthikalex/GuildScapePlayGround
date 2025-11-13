import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from '@/types/marketplace';
import { Button } from '@components/common/Button';
import { ShoppingCart as CartIcon, Trash2, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface ShoppingCartProps {
  cart: CartItem[];
  onRemoveItem: (listingId: string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
  className?: string;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onRemoveItem,
  onCheckout,
  onClearCart,
  className,
}) => {
  const total = cart.reduce((sum, item) => sum + item.listing.price, 0);

  return (
    <div className={clsx('bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-burnt-umber flex items-center gap-3">
          <CartIcon className="w-6 h-6 text-gold" />
          Shopping Cart
        </h2>
        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-sm text-burnt-umber/60 hover:text-vote-reject font-display transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-display font-bold text-burnt-umber mb-2">
            Your cart is empty
          </h3>
          <p className="text-burnt-umber/70">
            Add some artworks to get started!
          </p>
        </div>
      ) : (
        <>
          {/* Items List */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 p-4 bg-parchment rounded-xl border-2 border-burnt-umber/10 hover:border-burnt-umber/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-burnt-umber/20">
                    <img
                      src={item.listing.imageUrl}
                      alt={item.listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-burnt-umber mb-1 truncate">
                      {item.listing.title}
                    </h4>
                    <p className="text-sm text-burnt-umber/70 mb-2">
                      by {item.listing.artistName}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-display font-bold text-gold">
                        {item.listing.price} GLD
                      </span>
                      <span className="text-xs text-burnt-umber/50">
                        Added {format(new Date(item.addedAt), 'MMM d')}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.listing.id)}
                    className="p-2 hover:bg-vote-reject/10 rounded-lg transition-colors group"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5 text-burnt-umber/40 group-hover:text-vote-reject transition-colors" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="border-t-2 border-burnt-umber/20 pt-4 space-y-3">
            {/* Item Count */}
            <div className="flex items-center justify-between text-burnt-umber/70">
              <span className="font-display">Items</span>
              <span className="font-display">{cart.length}</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-display font-bold text-burnt-umber">Total</span>
              <span className="text-3xl font-display font-bold text-gold">{total} GLD</span>
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              onClick={onCheckout}
              className="w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </Button>

            {/* Info */}
            <p className="text-xs text-center text-burnt-umber/60 font-display">
              Secure payment processing • Instant digital delivery
            </p>
          </div>
        </>
      )}
    </div>
  );
};
