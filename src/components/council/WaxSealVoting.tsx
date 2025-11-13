import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import type { VoteChoice } from '@/types/proposal';
import clsx from 'clsx';

interface WaxSealVotingProps {
  onVote: (choice: VoteChoice) => Promise<void>;
  userVote?: VoteChoice;
  disabled?: boolean;
  proposalId: string;
}

type SealColor = 'approve' | 'reject' | 'abstain';

interface SealButtonProps {
  choice: VoteChoice;
  color: SealColor;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  isVoting: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const sealColors = {
  approve: {
    bg: 'bg-vote-approve',
    border: 'border-vote-approve',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    text: 'text-vote-approve',
  },
  reject: {
    bg: 'bg-vote-reject',
    border: 'border-vote-reject',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    text: 'text-vote-reject',
  },
  abstain: {
    bg: 'bg-vote-abstain',
    border: 'border-vote-abstain',
    glow: 'shadow-[0_0_20px_rgba(107,114,128,0.4)]',
    text: 'text-vote-abstain',
  },
};

const SealButton: React.FC<SealButtonProps> = ({
  color,
  icon,
  label,
  isSelected,
  isVoting,
  onClick,
  disabled,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const colors = sealColors[color];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        className={clsx(
          'relative w-24 h-24 rounded-full border-4 transition-all duration-300',
          'flex items-center justify-center',
          colors.border,
          isSelected ? `${colors.bg} ${colors.glow}` : 'bg-parchment hover:bg-parchment-dark',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && !isSelected && 'hover:scale-105 hover:-translate-y-1'
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        disabled={disabled || isVoting}
        animate={{
          scale: isSelected ? 1.05 : 1,
        }}
        whileTap={!disabled && !isVoting ? { scale: 0.95 } : {}}
      >
        {/* Wax seal texture overlay */}
        <div
          className={clsx(
            'absolute inset-0 rounded-full opacity-20',
            isSelected && 'bg-gradient-radial from-transparent via-black/10 to-black/30'
          )}
        />

        {/* Icon */}
        <motion.div
          className={clsx(
            'relative z-10',
            isSelected ? 'text-parchment' : colors.text,
            'transition-colors duration-300'
          )}
          animate={{
            scale: isHovering && !disabled ? 1.1 : 1,
          }}
        >
          {icon}
        </motion.div>

        {/* Glow effect on hover */}
        <AnimatePresence>
          {isHovering && !disabled && !isSelected && (
            <motion.div
              className={clsx('absolute inset-0 rounded-full', colors.bg, 'opacity-20')}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              exit={{ scale: 1.2, opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Label */}
      <span
        className={clsx(
          'font-display font-semibold text-sm',
          isSelected ? colors.text : 'text-burnt-umber/70'
        )}
      >
        {label}
      </span>
    </div>
  );
};

export const WaxSealVoting: React.FC<WaxSealVotingProps> = ({
  onVote,
  userVote,
  disabled,
}) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votingChoice, setVotingChoice] = useState<VoteChoice | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleVote = async (choice: VoteChoice) => {
    if (disabled || isVoting) return;

    setIsVoting(true);
    setVotingChoice(choice);

    try {
      // Simulate the seal press animation duration
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Execute the vote
      await onVote(choice);

      // Show confirmation animation
      setShowConfirmation(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Voting error:', error);
    } finally {
      setIsVoting(false);
      setVotingChoice(null);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="relative">
      {/* Voting Buttons */}
      <div className="flex justify-center gap-12 mb-6">
        <SealButton
          choice="approve"
          color="approve"
          icon={<Check className="w-12 h-12 stroke-[3]" />}
          label="Approve"
          isSelected={userVote === 'approve'}
          isVoting={isVoting}
          onClick={() => handleVote('approve')}
          disabled={disabled || !!userVote}
        />
        <SealButton
          choice="reject"
          color="reject"
          icon={<X className="w-12 h-12 stroke-[3]" />}
          label="Reject"
          isSelected={userVote === 'reject'}
          isVoting={isVoting}
          onClick={() => handleVote('reject')}
          disabled={disabled || !!userVote}
        />
        <SealButton
          choice="abstain"
          color="abstain"
          icon={<Minus className="w-12 h-12 stroke-[3]" />}
          label="Abstain"
          isSelected={userVote === 'abstain'}
          isVoting={isVoting}
          onClick={() => handleVote('abstain')}
          disabled={disabled || !!userVote}
        />
      </div>

      {/* Seal Press Animation Overlay */}
      <AnimatePresence>
        {isVoting && votingChoice && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-chamber-dark/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              {/* Descending Seal */}
              <motion.div
                className={clsx(
                  'w-32 h-32 rounded-full border-8 mb-6 mx-auto',
                  'flex items-center justify-center',
                  sealColors[votingChoice as SealColor].bg,
                  sealColors[votingChoice as SealColor].border
                )}
                initial={{ y: -100, scale: 1.2, opacity: 0.5, rotate: 0 }}
                animate={{
                  y: [null, 0, 0, 0],
                  scale: [null, 1, 0.9, 1],
                  opacity: [null, 1, 1, 1],
                  rotate: [null, 0, -5, 0],
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.5, 0.75, 1],
                  ease: 'easeOut',
                }}
              >
                {votingChoice === 'approve' && <Check className="w-16 h-16 text-parchment stroke-[3]" />}
                {votingChoice === 'reject' && <X className="w-16 h-16 text-parchment stroke-[3]" />}
                {votingChoice === 'abstain' && <Minus className="w-16 h-16 text-parchment stroke-[3]" />}
              </motion.div>

              <motion.p
                className="text-2xl font-display font-bold text-gold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Pressing Seal...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Animation */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-chamber-dark/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-gold border-8 border-gold-dark mb-6 mx-auto flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.4)',
                    '0 0 40px rgba(212, 175, 55, 0.8)',
                    '0 0 20px rgba(212, 175, 55, 0.4)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 1,
                }}
              >
                <Check className="w-16 h-16 text-burnt-umber stroke-[3]" />
              </motion.div>

              <motion.p
                className="text-3xl font-display font-bold text-gold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Vote Recorded!
              </motion.p>

              <motion.p
                className="text-lg text-parchment"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your voice has been heard by the Council
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voting Status */}
      {userVote && !isVoting && (
        <motion.div
          className="text-center p-4 bg-gold/10 rounded-lg border-2 border-gold/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-display text-burnt-umber">
            <span className="font-semibold">Your vote:</span>{' '}
            <span className={clsx('font-bold', sealColors[userVote as SealColor].text)}>
              {userVote.charAt(0).toUpperCase() + userVote.slice(1)}
            </span>
          </p>
          <p className="text-xs text-burnt-umber/70 mt-1">
            Sealed and recorded on the blockchain
          </p>
        </motion.div>
      )}
    </div>
  );
};
