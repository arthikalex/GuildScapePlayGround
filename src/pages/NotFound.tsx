import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Map } from 'lucide-react';
import { Button } from '@components/common/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-display font-bold text-gold mb-4">404</div>
            <div className="text-6xl mb-4">🗺️</div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-display font-bold text-burnt-umber mb-4">
            Lost in the Realm
          </h1>
          <p className="text-xl text-burnt-umber/70 mb-8 font-body max-w-md mx-auto">
            The page you seek does not exist in our archives. Perhaps it was moved to another
            chamber, or never existed at all.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              icon={<Home className="w-5 h-5" />}
            >
              Return to Great Hall
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              icon={<Map className="w-5 h-5" />}
            >
              Go Back
            </Button>
          </div>

          {/* Suggestions */}
          <div className="bg-parchment-light rounded-xl border-2 border-burnt-umber/20 p-6 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-council-blue" />
              <h3 className="font-display font-semibold text-burnt-umber">
                Perhaps you were looking for:
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/workshop')}
                className="text-left p-3 rounded-lg hover:bg-burnt-umber/5 transition-colors"
              >
                <div className="font-display font-semibold text-burnt-umber">The Workshop</div>
                <div className="text-sm text-burnt-umber/60">Upload and review artworks</div>
              </button>
              <button
                onClick={() => navigate('/library')}
                className="text-left p-3 rounded-lg hover:bg-burnt-umber/5 transition-colors"
              >
                <div className="font-display font-semibold text-burnt-umber">The Library</div>
                <div className="text-sm text-burnt-umber/60">Quests and progression</div>
              </button>
              <button
                onClick={() => navigate('/bazaar')}
                className="text-left p-3 rounded-lg hover:bg-burnt-umber/5 transition-colors"
              >
                <div className="font-display font-semibold text-burnt-umber">The Bazaar</div>
                <div className="text-sm text-burnt-umber/60">Browse and collect art</div>
              </button>
              <button
                onClick={() => navigate('/guilds')}
                className="text-left p-3 rounded-lg hover:bg-burnt-umber/5 transition-colors"
              >
                <div className="font-display font-semibold text-burnt-umber">Chapter Houses</div>
                <div className="text-sm text-burnt-umber/60">Join a guild community</div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
