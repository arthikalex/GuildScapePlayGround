import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface QuorumMeterProps {
  currentQuorum: number; // percentage
  requiredQuorum: number; // percentage
  totalVotes: number;
  className?: string;
}

export const QuorumMeter: React.FC<QuorumMeterProps> = ({
  currentQuorum,
  requiredQuorum,
  totalVotes,
  className,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showBellRing, setShowBellRing] = useState(false);
  const quorumMet = currentQuorum >= requiredQuorum;

  useEffect(() => {
    // Trigger animation after mount
    setShouldAnimate(true);

    // Check if quorum just crossed threshold
    if (quorumMet && currentQuorum < requiredQuorum + 5) {
      setShowBellRing(true);
      const timer = setTimeout(() => setShowBellRing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentQuorum, requiredQuorum, quorumMet]);

  const liquidHeight = Math.min(currentQuorum, 100);

  return (
    <div className={clsx('relative', className)}>
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-display font-semibold text-burnt-umber">
          Quorum Progress
        </h4>
        <div className="flex items-center gap-2">
          {quorumMet ? (
            <CheckCircle className="w-5 h-5 text-vote-approve" />
          ) : (
            <AlertCircle className="w-5 h-5 text-vote-pending" />
          )}
          <span
            className={clsx(
              'text-sm font-display font-semibold',
              quorumMet ? 'text-vote-approve' : 'text-vote-pending'
            )}
          >
            {quorumMet ? 'Quorum Met' : 'Quorum Needed'}
          </span>
        </div>
      </div>

      {/* Glass Vessel Container */}
      <div className="relative">
        {/* The Vessel */}
        <div className="relative h-64 bg-gradient-to-b from-parchment-light/50 to-parchment/80 rounded-2xl border-4 border-burnt-umber overflow-hidden shadow-elevated">
          {/* Quorum threshold line */}
          <motion.div
            className="absolute left-0 right-0 z-10 flex items-center"
            style={{ top: `${100 - requiredQuorum}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex-1 h-0.5 bg-burnt-umber border-t-2 border-dashed border-burnt-umber" />
            <div className="absolute -right-2 px-3 py-1 bg-gold rounded-lg border-2 border-burnt-umber text-xs font-display font-bold text-burnt-umber whitespace-nowrap">
              {requiredQuorum}% Required
            </div>
          </motion.div>

          {/* Liquid Fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-council-blue to-council-blue/70"
            initial={{ height: 0 }}
            animate={{
              height: shouldAnimate ? `${liquidHeight}%` : 0,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
            }}
          >
            {/* Liquid surface ripple effect */}
            <div className="absolute top-0 left-0 right-0 h-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-council-blue-light/50 to-transparent"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scaleY: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Shine effect */}
            <motion.div
              className="absolute top-1/4 left-4 w-8 h-16 bg-white/20 rounded-full blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Measurement marks */}
          <div className="absolute inset-0 pointer-events-none">
            {[25, 50, 75].map((mark) => (
              <div
                key={mark}
                className="absolute left-2 right-2 flex items-center opacity-30"
                style={{ top: `${100 - mark}%` }}
              >
                <div className="w-3 h-0.5 bg-burnt-umber" />
                <div className="flex-1 h-px bg-burnt-umber/30" />
                <span className="text-xs text-burnt-umber">{mark}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bell notification when threshold crossed */}
        {showBellRing && quorumMet && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-vote-approve rounded-lg shadow-seal"
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: [-15, 15, -15, 15, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Bell className="w-5 h-5 text-parchment" />
            </motion.div>
            <span className="text-sm font-display font-bold text-parchment">
              Quorum Reached!
            </span>
          </motion.div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
          <div className="text-2xl font-display font-bold text-council-blue">
            {currentQuorum.toFixed(1)}%
          </div>
          <div className="text-xs text-burnt-umber/70 mt-1">Current</div>
        </div>

        <div className="text-center p-3 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
          <div className="text-2xl font-display font-bold text-burnt-umber">
            {requiredQuorum}%
          </div>
          <div className="text-xs text-burnt-umber/70 mt-1">Required</div>
        </div>

        <div className="text-center p-3 bg-parchment-light rounded-lg border-2 border-burnt-umber/20">
          <div className="text-2xl font-display font-bold text-gold">
            {totalVotes.toLocaleString()}
          </div>
          <div className="text-xs text-burnt-umber/70 mt-1">Votes Cast</div>
        </div>
      </div>

      {/* Progress message */}
      {!quorumMet && (
        <motion.div
          className="mt-4 p-3 bg-vote-pending/10 rounded-lg border-2 border-vote-pending/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-burnt-umber">
            <span className="font-display font-semibold">
              {(requiredQuorum - currentQuorum).toFixed(1)}%
            </span>{' '}
            more participation needed to reach quorum
          </p>
        </motion.div>
      )}

      {quorumMet && (
        <motion.div
          className="mt-4 p-3 bg-vote-approve/10 rounded-lg border-2 border-vote-approve/30 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm text-vote-approve font-display font-semibold">
            ✓ Proposal meets quorum requirements
          </p>
        </motion.div>
      )}
    </div>
  );
};
