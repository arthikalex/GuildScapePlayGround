'use client'

import { useState } from 'react'
import { useGalleryData, useCurrentUser, useTreasuryData } from '@/hooks/useGuildData'
import { ArtworkCard, Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select, TextArea } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { ProgressBar } from '@/components/ui/ProgressWheel'
import clsx from 'clsx'

type ViewMode = 'gallery' | 'upload' | 'analytics'

export default function Workshop() {
  const { artworks, getArtworksByUser, toggleFavorite, isFavorite, reviewArtworks, galleryArtworks, getTopPerformers } = useGalleryData()
  const user = useCurrentUser()
  const { thisMonth, trafficSources } = useTreasuryData()
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const userArtworks = getArtworksByUser(user.id)
  const topPerformers = getTopPerformers().filter(a => a.artistId === user.id)

  const categories = ['All', 'Landscape', 'Portrait', 'Abstract', 'Seascape', 'Urban', 'Nature', 'Cultural']

  const filteredArtworks = selectedCategory === 'All'
    ? userArtworks
    : userArtworks.filter(a => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Header */}
      <section className="bg-gradient-to-r from-guild-wood/10 to-brand-purple/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-guild-wood-dark mb-2 flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">🎨</span>
                The Workshop
              </h1>
              <p className="text-lg text-gray-600">Your creative studio and gallery</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true">➕</span>
              Upload Artwork
            </Button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mt-6 border-b-2 border-guild-wood/20">
            {[
              { mode: 'gallery' as ViewMode, label: 'Gallery', icon: '🖼️' },
              { mode: 'upload' as ViewMode, label: 'In Review', icon: '🎨' },
              { mode: 'analytics' as ViewMode, label: 'Analytics', icon: '📊' },
            ].map(({ mode, label, icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={clsx(
                  'px-6 py-3 font-medium transition-all flex items-center gap-2',
                  viewMode === mode
                    ? 'text-brand-purple border-b-4 border-brand-purple'
                    : 'text-guild-wood hover:text-brand-purple hover:bg-parchment-dark'
                )}
                aria-current={viewMode === mode ? 'page' : undefined}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery View */}
        {viewMode === 'gallery' && (
          <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    selectedCategory === category
                      ? 'bg-brand-purple text-white'
                      : 'bg-parchment-dark text-guild-wood hover:bg-guild-wood/10'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Artwork Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  title={artwork.title}
                  artistName={artwork.artistName}
                  quality={artwork.quality}
                  imageUrl={artwork.imageUrl}
                  views={artwork.views}
                  favorites={artwork.favorites}
                  onFavorite={() => toggleFavorite(artwork.id)}
                  isFavorited={isFavorite(artwork.id)}
                  onClick={() => setSelectedArtwork(artwork.id)}
                />
              ))}
            </div>

            {filteredArtworks.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4" aria-hidden="true">🎨</div>
                <h3 className="text-xl font-semibold text-guild-wood-dark mb-2">
                  No artworks in this category
                </h3>
                <p className="text-gray-600 mb-6">Upload your first piece to get started!</p>
                <Button variant="primary" onClick={() => setIsUploadModalOpen(true)}>
                  Upload Artwork
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Upload/Review View */}
        {viewMode === 'upload' && (
          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-4">Artworks In Review</h2>
              <p className="text-gray-600 mb-4">
                New uploads undergo a 30-day peer review period. During this time, guild members provide
                feedback and quality assessments.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewArtworks.filter(a => a.artistId === user.id).map((artwork) => {
                const daysInReview = Math.floor(
                  (new Date().getTime() - new Date(artwork.uploadDate).getTime()) / (1000 * 60 * 60 * 24)
                )
                const daysRemaining = 30 - daysInReview

                return (
                  <Card key={artwork.id} className="overflow-hidden">
                    {/* Wet Paint Effect */}
                    <div className="relative">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full aspect-[4/3] object-cover grayscale-[30%] blur-[0.5px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-parchment/90 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="px-2 py-1 bg-medieval-blue text-white text-xs rounded font-medium">
                          🎨 Wet Paint
                        </span>
                        <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                          {daysRemaining} days
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{artwork.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{artwork.category}</p>

                      <ProgressBar
                        value={daysInReview}
                        max={30}
                        label="Review Progress"
                        color="#3B82F6"
                        className="mb-3"
                      />

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{artwork.reviewCount} reviews</span>
                        <button className="text-brand-purple hover:underline">
                          View Feedback →
                        </button>
                      </div>

                      {/* Feedback notes */}
                      {artwork.feedbackNotes.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-guild-wood/20">
                          <div className="space-y-2">
                            {artwork.feedbackNotes.slice(0, 2).map((note) => (
                              <div key={note.id} className="text-xs bg-parchment-dark p-2 rounded">
                                <div className="font-medium text-guild-wood">{note.reviewerName}</div>
                                <div className="text-gray-600 line-clamp-2">{note.content}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>

            {reviewArtworks.filter(a => a.artistId === user.id).length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4" aria-hidden="true">✨</div>
                <h3 className="text-xl font-semibold text-guild-wood-dark mb-2">
                  No artworks in review
                </h3>
                <p className="text-gray-600">All your artworks have completed the review process!</p>
              </Card>
            )}
          </div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-1">This Month Revenue</div>
                <div className="text-3xl font-bold text-brand-purple">${thisMonth.revenue}</div>
                <div className="text-xs text-gray-500 mt-1">{thisMonth.transactions} transactions</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Views</div>
                <div className="text-3xl font-bold text-medieval-blue">
                  {userArtworks.reduce((sum, a) => sum + a.views, 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">across all artworks</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-1">Total Favorites</div>
                <div className="text-3xl font-bold text-wax-red">
                  {userArtworks.reduce((sum, a) => sum + a.favorites, 0)}
                </div>
                <div className="text-xs text-gray-500 mt-1">collector favorites</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-1">Avg Conversion</div>
                <div className="text-3xl font-bold text-medieval-green">
                  {(userArtworks.reduce((sum, a) => sum + a.conversionRate, 0) / userArtworks.length).toFixed(2)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">vs 0.75% platform avg</div>
              </Card>
            </div>

            {/* Top Performers */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">🏆</span>
                Top Performing Artworks
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-guild-wood/20 text-left">
                      <th className="pb-3 font-semibold text-guild-wood">Artwork</th>
                      <th className="pb-3 font-semibold text-guild-wood">Views</th>
                      <th className="pb-3 font-semibold text-guild-wood">Favorites</th>
                      <th className="pb-3 font-semibold text-guild-wood">Sales</th>
                      <th className="pb-3 font-semibold text-guild-wood">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((artwork) => (
                      <tr key={artwork.id} className="border-b border-guild-wood/10 hover:bg-parchment-dark">
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
                        <td className="py-3">{artwork.views}</td>
                        <td className="py-3">{artwork.favorites}</td>
                        <td className="py-3">{artwork.sales}</td>
                        <td className="py-3">
                          <span className={clsx(
                            'px-2 py-1 rounded text-xs font-medium',
                            artwork.conversionRate > 1 ? 'bg-medieval-green/20 text-medieval-green' : 'bg-gray-100 text-gray-600'
                          )}>
                            {artwork.conversionRate.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Traffic Sources */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">📍</span>
                Traffic Sources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {trafficSources.map((source) => (
                    <div key={source.source} className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{source.source}</span>
                        <span className="font-semibold text-guild-wood">{source.percentage}%</span>
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
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Simple pie chart representation */}
                    {trafficSources.map((source, index) => {
                      const colors = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#DC143C']
                      return (
                        <div
                          key={source.source}
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ transform: `rotate(${index * 72}deg)` }}
                        >
                          <div
                            className="w-16 h-16 rounded-full"
                            style={{ backgroundColor: colors[index] }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Improvement Suggestions */}
            <Card className="p-6 bg-brand-purple/5">
              <h2 className="text-xl font-bold text-guild-wood-dark mb-4 flex items-center gap-2">
                <span aria-hidden="true">💡</span>
                Improvement Opportunities
              </h2>
              <ul className="space-y-2 text-sm italic text-gray-700">
                <li>• Add process photos to your listings to increase engagement</li>
                <li>• Consider creating more works in your highest-performing categories</li>
                <li>• Your conversion rate is above platform average - great work!</li>
                <li>• Engage more with collectors through the forum to build community</li>
              </ul>
            </Card>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload New Artwork"
        size="lg"
        footer={
          <>
            <Button variant="parchment" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert('Upload functionality (demo only)')
                setIsUploadModalOpen(false)
              }}
            >
              Upload & Begin Review
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            label="Artwork Title"
            id="title"
            placeholder="Enter a descriptive title"
            required
            illuminated
          />

          <Select
            label="Category"
            id="category"
            options={categories.slice(1).map(c => ({ value: c, label: c }))}
          />

          <TextArea
            label="Description"
            id="description"
            placeholder="Describe your artwork, technique, and inspiration..."
            rows={4}
          />

          <div className="border-2 border-dashed border-guild-wood/30 rounded-lg p-8 text-center hover:border-brand-purple hover:bg-brand-purple/5 transition-colors cursor-pointer">
            <div className="text-4xl mb-2" aria-hidden="true">
              🖼️
            </div>
            <p className="text-guild-wood font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          <div className="bg-medieval-blue/10 border border-medieval-blue/30 rounded-lg p-4 text-sm">
            <div className="font-semibold text-medieval-blue mb-2">📋 Review Process</div>
            <p className="text-gray-700">
              Your artwork will enter a 30-day peer review period where guild members provide feedback
              and quality assessments. This helps maintain guild standards and provides valuable insights
              for your artistic growth.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  )
}
