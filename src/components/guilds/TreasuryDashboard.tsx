import React from 'react';
import { motion } from 'framer-motion';
import type { GuildTreasury } from '@/types/guild';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  PieChart,
  DollarSign,
} from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface TreasuryDashboardProps {
  treasury: GuildTreasury;
  className?: string;
}

export const TreasuryDashboard: React.FC<TreasuryDashboardProps> = ({
  treasury,
  className
}) => {
  const totalIncome = treasury.income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = treasury.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  const isPositive = netBalance >= 0;

  // Calculate top income and expense sources
  const topIncome = [...treasury.income].sort((a, b) => b.amount - a.amount)[0];
  const topExpense = [...treasury.expenses].sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-3">
          <Coins className="w-8 h-8 text-gold" />
          Guild Treasury
        </h3>
        <p className="text-burnt-umber/70 text-sm">
          Financial overview and recent transactions
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {/* Current Balance */}
        <motion.div
          className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl border-4 border-gold shadow-seal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-gold" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Current Balance
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-gold mb-1">
            {treasury.balance.toLocaleString()}
          </div>
          <div className="text-xs text-burnt-umber/60">GLD</div>
        </motion.div>

        {/* Total Income */}
        <motion.div
          className="p-6 bg-vote-approve/10 rounded-xl border-2 border-vote-approve/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-vote-approve" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Income
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-vote-approve mb-1">
            +{totalIncome.toLocaleString()}
          </div>
          <div className="text-xs text-burnt-umber/60">
            {treasury.income.length} source{treasury.income.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Total Expenses */}
        <motion.div
          className="p-6 bg-vote-reject/10 rounded-xl border-2 border-vote-reject/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-vote-reject" />
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Total Expenses
            </span>
          </div>
          <div className="text-2xl font-display font-bold text-vote-reject mb-1">
            -{totalExpenses.toLocaleString()}
          </div>
          <div className="text-xs text-burnt-umber/60">
            {treasury.expenses.length} categor{treasury.expenses.length !== 1 ? 'ies' : 'y'}
          </div>
        </motion.div>

        {/* Net Balance */}
        <motion.div
          className={clsx(
            'p-6 rounded-xl border-2',
            isPositive
              ? 'bg-vote-approve/10 border-vote-approve/30'
              : 'bg-vote-reject/10 border-vote-reject/30'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            {isPositive ? (
              <ArrowUpRight className="w-5 h-5 text-vote-approve" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-vote-reject" />
            )}
            <span className="text-sm font-display font-semibold text-burnt-umber">
              Net Balance
            </span>
          </div>
          <div className={clsx(
            'text-2xl font-display font-bold mb-1',
            isPositive ? 'text-vote-approve' : 'text-vote-reject'
          )}>
            {isPositive ? '+' : ''}{netBalance.toLocaleString()}
          </div>
          <div className="text-xs text-burnt-umber/60">This period</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Income Breakdown */}
        <motion.div
          className="bg-parchment-light p-6 rounded-xl border-2 border-burnt-umber/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-vote-approve" />
            <h4 className="text-lg font-display font-bold text-burnt-umber">
              Income Sources
            </h4>
          </div>

          <div className="space-y-3">
            {treasury.income.map((item, index) => {
              const percentage = (item.amount / totalIncome) * 100;
              return (
                <motion.div
                  key={item.source}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-display font-semibold text-burnt-umber">
                      {item.source}
                    </span>
                    <span className="text-sm font-display font-bold text-vote-approve">
                      +{item.amount.toLocaleString()} GLD
                    </span>
                  </div>
                  <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-vote-approve to-vote-approve/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                    />
                  </div>
                  <div className="text-xs text-burnt-umber/60 mt-1">
                    {percentage.toFixed(1)}% of total income
                  </div>
                </motion.div>
              );
            })}
          </div>

          {topIncome && (
            <div className="mt-4 p-3 bg-vote-approve/10 rounded-lg border border-vote-approve/30">
              <div className="text-xs text-burnt-umber/60 mb-1">Top Income Source</div>
              <div className="font-display font-bold text-vote-approve">
                {topIncome.source}: +{topIncome.amount.toLocaleString()} GLD
              </div>
            </div>
          )}
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          className="bg-parchment-light p-6 rounded-xl border-2 border-burnt-umber/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-vote-reject" />
            <h4 className="text-lg font-display font-bold text-burnt-umber">
              Expenses
            </h4>
          </div>

          <div className="space-y-3">
            {treasury.expenses.map((item, index) => {
              const percentage = (item.amount / totalExpenses) * 100;
              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-display font-semibold text-burnt-umber">
                      {item.category}
                    </span>
                    <span className="text-sm font-display font-bold text-vote-reject">
                      -{item.amount.toLocaleString()} GLD
                    </span>
                  </div>
                  <div className="h-2 bg-parchment-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-vote-reject to-vote-reject/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                    />
                  </div>
                  <div className="text-xs text-burnt-umber/60 mt-1">
                    {percentage.toFixed(1)}% of total expenses
                  </div>
                </motion.div>
              );
            })}
          </div>

          {topExpense && (
            <div className="mt-4 p-3 bg-vote-reject/10 rounded-lg border border-vote-reject/30">
              <div className="text-xs text-burnt-umber/60 mb-1">Largest Expense</div>
              <div className="font-display font-bold text-vote-reject">
                {topExpense.category}: -{topExpense.amount.toLocaleString()} GLD
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="bg-parchment-light p-6 rounded-xl border-2 border-burnt-umber/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-council-gold" />
          <h4 className="text-lg font-display font-bold text-burnt-umber">
            Recent Transactions
          </h4>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-medieval">
          {treasury.transactions.map((transaction, index) => {
            const isIncome = transaction.type === 'income';
            return (
              <motion.div
                key={transaction.id}
                className={clsx(
                  'p-4 rounded-lg border-2 flex items-start gap-4',
                  isIncome
                    ? 'bg-vote-approve/5 border-vote-approve/20'
                    : 'bg-vote-reject/5 border-vote-reject/20'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                <div className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  isIncome ? 'bg-vote-approve/20' : 'bg-vote-reject/20'
                )}>
                  {isIncome ? (
                    <ArrowUpRight className="w-5 h-5 text-vote-approve" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-vote-reject" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="font-display font-semibold text-burnt-umber">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-burnt-umber/60 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                    <div className={clsx(
                      'text-lg font-display font-bold whitespace-nowrap ml-4',
                      isIncome ? 'text-vote-approve' : 'text-vote-reject'
                    )}>
                      {isIncome ? '+' : '-'}{transaction.amount.toLocaleString()} GLD
                    </div>
                  </div>

                  {transaction.fromTo && (
                    <div className="text-xs text-burnt-umber/60">
                      {isIncome ? 'From' : 'To'}: {transaction.fromTo}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {treasury.transactions.length === 0 && (
          <div className="text-center py-8 text-burnt-umber/60">
            <DollarSign className="w-12 h-12 mx-auto mb-2 text-burnt-umber/40" />
            <p>No recent transactions</p>
          </div>
        )}
      </motion.div>

      {/* Financial Health Indicator */}
      <motion.div
        className={clsx(
          'mt-6 p-4 rounded-xl border-2 text-center',
          isPositive
            ? 'bg-vote-approve/10 border-vote-approve/30'
            : 'bg-vote-pending/10 border-vote-pending/30'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-sm font-display font-semibold text-burnt-umber">
          {isPositive ? (
            <>💰 Strong Financial Position - Guild treasury is growing</>
          ) : (
            <>⚠️ Expenses Exceeding Income - Consider fundraising initiatives</>
          )}
        </div>
      </motion.div>
    </div>
  );
};
