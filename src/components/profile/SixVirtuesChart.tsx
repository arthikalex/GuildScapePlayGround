import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { ReputationDimensions } from '@/types/user';
import { Sparkles } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SixVirtuesChartProps {
  dimensions: ReputationDimensions;
  className?: string;
}

const dimensionLabels = {
  artworkQuality: 'Artwork Quality',
  communityEngagement: 'Community',
  peerReview: 'Peer Review',
  exhibitionParticipation: 'Exhibitions',
  mentorshipActivities: 'Mentorship',
  platformDevelopment: 'Platform Dev',
};

const dimensionDescriptions = {
  artworkQuality: 'Quality and excellence in your artistic work',
  communityEngagement: 'Active participation and helping others',
  peerReview: 'Thoughtful feedback and peer reviews',
  exhibitionParticipation: 'Participation in juried exhibitions',
  mentorshipActivities: 'Mentoring and being mentored',
  platformDevelopment: 'Contributing to platform improvements',
};

export const SixVirtuesChart: React.FC<SixVirtuesChartProps> = ({ dimensions, className }) => {
  const chartRef = useRef<ChartJS<'radar'>>(null);

  // Calculate if any virtue is particularly strong or weak
  const values = Object.values(dimensions);
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const isBalanced = maxValue - minValue < 100; // Less than 100 point spread

  const chartData = {
    labels: Object.keys(dimensions).map((key) => dimensionLabels[key as keyof ReputationDimensions]),
    datasets: [
      {
        label: 'Your Virtues',
        data: Object.values(dimensions),
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#8B4513',
        pointHoverBackgroundColor: '#FFD700',
        pointHoverBorderColor: '#8B4513',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: Math.max(400, Math.ceil(maxValue / 100) * 100),
        ticks: {
          stepSize: 100,
          backdropColor: 'transparent',
          color: '#8B4513',
          font: {
            family: 'Crimson Text, serif',
            size: 12,
          },
        },
        grid: {
          color: 'rgba(139, 69, 19, 0.2)',
          circular: true,
        },
        pointLabels: {
          color: '#8B4513',
          font: {
            family: 'Cinzel, serif',
            size: 13,
            weight: 600,
          },
          padding: 10,
        },
        angleLines: {
          color: 'rgba(139, 69, 19, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#F5ECD7',
        titleColor: '#8B4513',
        bodyColor: '#8B4513',
        borderColor: '#8B4513',
        borderWidth: 2,
        padding: 12,
        bodyFont: {
          family: 'Crimson Text, serif',
          size: 14,
        },
        titleFont: {
          family: 'Cinzel, serif',
          size: 14,
          weight: 'bold' as const,
        },
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.r} REP`;
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-gold" />
          The Six Virtues
        </h2>
        <p className="text-burnt-umber/70">
          Your reputation across the six dimensions of excellence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart */}
        <motion.div
          className="bg-gradient-to-br from-parchment-light to-parchment p-8 rounded-2xl border-4 border-burnt-umber shadow-elevated"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-square">
            <Radar ref={chartRef} data={chartData} options={chartOptions} />
          </div>

          {/* Balance Indicator */}
          <div className="mt-6 text-center">
            {isBalanced ? (
              <motion.div
                className="inline-block px-4 py-2 bg-vote-approve/20 rounded-lg border-2 border-vote-approve"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-sm font-display font-semibold text-vote-approve">
                  ⚖️ Well-Balanced Virtues
                </span>
              </motion.div>
            ) : (
              <motion.div
                className="inline-block px-4 py-2 bg-vote-pending/20 rounded-lg border-2 border-vote-pending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-sm font-display font-semibold text-vote-pending">
                  💡 Room for Balance
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Virtue Breakdown */}
        <div className="space-y-4">
          {Object.entries(dimensions).map(([key, value], index) => {
            const dimensionKey = key as keyof ReputationDimensions;
            const percentage = (value / maxValue) * 100;
            const isStrongest = value === maxValue;
            const isWeakest = value === minValue;

            return (
              <motion.div
                key={key}
                className="bg-parchment-light p-4 rounded-xl border-2 border-burnt-umber/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-display font-semibold text-burnt-umber flex items-center gap-2">
                      {dimensionLabels[dimensionKey]}
                      {isStrongest && <span className="text-gold text-xs">⭐ Strongest</span>}
                      {isWeakest && !isStrongest && (
                        <span className="text-burnt-umber/50 text-xs">💡 Focus Area</span>
                      )}
                    </h4>
                    <p className="text-xs text-burnt-umber/60 mt-1">
                      {dimensionDescriptions[dimensionKey]}
                    </p>
                  </div>
                  <span className="text-2xl font-display font-bold text-gold whitespace-nowrap ml-4">
                    {value}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold to-gold-light"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Average REP */}
          <motion.div
            className="p-4 bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl border-2 border-gold/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-burnt-umber">Average per Virtue</span>
              <span className="text-2xl font-display font-bold text-gold">
                {Math.round(average)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tips */}
      <motion.div
        className="mt-8 p-6 bg-council-blue/10 rounded-xl border-2 border-council-blue/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <h4 className="font-display font-semibold text-burnt-umber mb-3">
          💡 Growing Your Virtues
        </h4>
        <ul className="space-y-2 text-sm text-burnt-umber/70">
          <li>• <strong>Artwork Quality:</strong> Upload high-quality work and receive excellent peer reviews</li>
          <li>• <strong>Community:</strong> Help others, answer questions, and participate in discussions</li>
          <li>• <strong>Peer Review:</strong> Provide thoughtful, constructive feedback on others' work</li>
          <li>• <strong>Exhibitions:</strong> Participate in juried exhibitions and showcases</li>
          <li>• <strong>Mentorship:</strong> Mentor newer artists or learn from experienced masters</li>
          <li>• <strong>Platform Dev:</strong> Contribute ideas, report bugs, or participate in governance</li>
        </ul>
      </motion.div>
    </div>
  );
};
