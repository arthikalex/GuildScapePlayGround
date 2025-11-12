'use client'

import { useTreasuryData, useGalleryData } from '@/hooks/useGuildData'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressWheel'
import clsx from 'clsx'

export default function Treasury() {
  const { revenueData, trafficSources, getTotalRevenue, getAverageMonthlyRevenue, getRevenueGrowth, thisMonth } = useTreasuryData()
  const { getTopPerformers } = useGalleryData()

  const totalRevenue = getTotalRevenue()
  const avgMonthly = getAverageMonthlyRevenue()
  const growth = getRevenueGrowth()
  const topPerformers = getTopPerformers()

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Header */}
      <section className="bg-gradient-to-r from-medieval-gold/10 to-medieval-green/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-guild-wood-dark mb-2 flex items-center gap-3">
            <span className="text-5xl" aria-hidden="true">💰</span>
            The Treasury
          </h1>
          <p className="text-lg text-gray-600">Your economic performance and guild commerce</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-medieval-gold/10 to-medieval-gold/5">
            <div className="text-sm text-gray-600 mb-1">This Month</div>
            <div className="text-3xl font-bold text-medieval-gold mb-2">${thisMonth.revenue}</div>
            <div className="text-xs text-gray-500">{thisMonth.transactions} transactions</div>
            <div className="text-xs text-medieval-green font-medium mt-2">
              +{growth}% vs last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-brand-purple mb-2">${totalRevenue}</div>
            <div className="text-xs text-gray-500">all time</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-1">Monthly Average</div>
            <div className="text-3xl font-bold text-medieval-blue mb-2">${avgMonthly}</div>
            <div className="text-xs text-gray-500">last 6 months</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-1">Avg Per Sale</div>
            <div className="text-3xl font-bold text-medieval-green mb-2">${thisMonth.averagePerSale}</div>
            <div className="text-xs text-gray-500">this month</div>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-guild-wood-dark mb-6 flex items-center gap-2">
            <span aria-hidden="true">📈</span>
            Revenue Trends (6 Months)
          </h2>
          <div className="space-y-4">
            {revenueData.months.map((month) => (
              <div key={month.month}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-guild-wood">{month.month}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      ${month.totalRevenue} ({month.transactions} sales)
                    </span>
                    <span className="text-brand-purple font-medium">
                      {month.gldPercentage}% GLD
                    </span>
                  </div>
                </div>
                <div className="relative h-8 bg-parchment-dark rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-purple to-medieval-blue rounded-lg"
                    style={{ width: `${(month.totalRevenue / 10000) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-3 text-xs font-medium text-guild-wood">
                    {month.artworksSold} artworks
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* GLD vs Fiat Split */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
            <span aria-hidden="true">💎</span>
            Payment Methods
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">This Month Split</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-brand-purple" aria-hidden="true">◆</span>
                      GLD Tokens
                    </span>
                    <span className="font-semibold">{thisMonth.gldPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={thisMonth.gldPercentage}
                    max={100}
                    showPercentage={false}
                    color="#8B5CF6"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span className="text-medieval-green" aria-hidden="true">💵</span>
                      Fiat Currency
                    </span>
                    <span className="font-semibold">{100 - thisMonth.gldPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={100 - thisMonth.gldPercentage}
                    max={100}
                    showPercentage={false}
                    color="#10B981"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4" aria-hidden="true">💎</div>
                <div className="text-2xl font-bold text-brand-purple mb-1">
                  ${Math.round(thisMonth.revenue * (thisMonth.gldPercentage / 100))}
                </div>
                <div className="text-sm text-gray-600">in GLD tokens this month</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
            <span aria-hidden="true">📍</span>
            Traffic Sources
          </h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-guild-wood">{source.source}</span>
                  <div className="flex gap-4 text-gray-600">
                    <span>{source.views} views</span>
                    <span className="font-semibold text-brand-purple">{source.percentage}%</span>
                  </div>
                </div>
                <ProgressBar
                  value={source.percentage}
                  max={100}
                  showPercentage={false}
                  color="#8B5CF6"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Artworks */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
            <span aria-hidden="true">🏆</span>
            Top Performing Artworks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-guild-wood/20 text-left">
                  <th className="pb-3 font-semibold text-guild-wood">Rank</th>
                  <th className="pb-3 font-semibold text-guild-wood">Artwork</th>
                  <th className="pb-3 font-semibold text-guild-wood">Views</th>
                  <th className="pb-3 font-semibold text-guild-wood">Favorites</th>
                  <th className="pb-3 font-semibold text-guild-wood">Sales</th>
                  <th className="pb-3 font-semibold text-guild-wood">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((artwork, index) => (
                  <tr key={artwork.id} className="border-b border-guild-wood/10 hover:bg-parchment-dark">
                    <td className="py-3">
                      <div
                        className={clsx(
                          'w-8 h-8 rounded-full flex items-center justify-center font-bold text-white',
                          index === 0 && 'bg-medieval-gold',
                          index === 1 && 'bg-gray-400',
                          index === 2 && 'bg-amber-700',
                          index > 2 && 'bg-gray-300 text-gray-600'
                        )}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={artwork.imageUrl}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{artwork.title}</div>
                          <div className="text-xs text-gray-500">{artwork.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{artwork.views.toLocaleString()}</td>
                    <td className="py-3">{artwork.favorites}</td>
                    <td className="py-3">{artwork.sales}</td>
                    <td className="py-3">
                      <span
                        className={clsx(
                          'px-2 py-1 rounded text-xs font-medium',
                          artwork.conversionRate > 1
                            ? 'bg-medieval-green/20 text-medieval-green'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {artwork.conversionRate.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Insights & Opportunities */}
        <Card className="p-6 bg-gradient-to-br from-brand-purple/5 to-medieval-blue/5">
          <h2 className="text-xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
            <span aria-hidden="true">💡</span>
            Performance Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-parchment p-4 rounded-lg border border-medieval-green/30">
              <div className="font-semibold text-medieval-green mb-2 flex items-center gap-2">
                <span aria-hidden="true">✓</span>
                Strong Performance
              </div>
              <ul className="space-y-1 text-gray-700">
                <li>• Conversion rate {thisMonth.averagePerSale > 140 ? 'above' : 'at'} platform average</li>
                <li>• GLD payment adoption trending upward</li>
                <li>• Traffic from Discovery channel performing well</li>
              </ul>
            </div>
            <div className="bg-parchment p-4 rounded-lg border border-medieval-blue/30">
              <div className="font-semibold text-medieval-blue mb-2 flex items-center gap-2">
                <span aria-hidden="true">→</span>
                Growth Opportunities
              </div>
              <ul className="space-y-1 text-gray-700">
                <li>• Consider creating more works similar to top performers</li>
                <li>• Increase profile visibility through forum engagement</li>
                <li>• Add process documentation to boost discovery traffic</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
