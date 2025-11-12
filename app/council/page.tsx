'use client'

import { useState } from 'react'
import { useProposalData, useCurrentUser } from '@/hooks/useGuildData'
import { Card, ProposalCard } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { ProgressBar } from '@/components/ui/ProgressWheel'
import clsx from 'clsx'
import type { ProposalCategory } from '@/data/mockData'

export default function CouncilChamber() {
  const { proposals, voteOnProposal, hasVoted } = useProposalData()
  const user = useCurrentUser()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [voteDirection, setVoteDirection] = useState<'approve' | 'reject' | null>(null)
  const [showVoteConfirm, setShowVoteConfirm] = useState(false)

  const categories: (string | ProposalCategory)[] = ['All', 'Governance', 'Treasury', 'Exhibition', 'Membership', 'Standards', 'Community']

  const filteredProposals = selectedCategory === 'All'
    ? proposals
    : proposals.filter(p => p.category === selectedCategory)

  const selectedProposalData = proposals.find(p => p.id === selectedProposal)

  const handleVote = (proposalId: string, vote: 'approve' | 'reject') => {
    setSelectedProposal(proposalId)
    setVoteDirection(vote)
    setShowVoteConfirm(true)
  }

  const confirmVote = () => {
    if (selectedProposal && voteDirection) {
      voteOnProposal(selectedProposal, voteDirection)
      setShowVoteConfirm(false)
      setSelectedProposal(null)
      setVoteDirection(null)
    }
  }

  // Calculate voting power
  const tierMultiplier = { Patron: 1, Apprentice: 1.2, Maker: 1.5, Artisan: 2, Elder: 3 }
  const votingPower = Math.round(user.reputation * tierMultiplier[user.tier])

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment to-parchment-dark">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-purple/10 to-medieval-blue/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-guild-wood-dark mb-2 flex items-center gap-3">
            <span className="text-5xl" aria-hidden="true">⚖️</span>
            The Council Chamber
          </h1>
          <p className="text-lg text-gray-600 mb-6">Where guild members shape our collective future</p>

          {/* Voting Power Card */}
          <Card className="p-6 bg-gradient-to-br from-parchment to-parchment-dark">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-guild-wood-dark mb-2">Your Voting Power</h2>
                <p className="text-sm text-gray-600">
                  Base Reputation ({user.reputation}) × {user.tier} Multiplier ({tierMultiplier[user.tier]}x)
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple">{votingPower}</div>
                <div className="text-sm text-gray-600">voting power</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Proposals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => {
            const voted = hasVoted(proposal.id)
            return (
              <div key={proposal.id} className="relative">
                <ProposalCard
                  title={proposal.title}
                  category={proposal.category}
                  votePercentage={proposal.votePercentage}
                  totalVotes={proposal.totalVotes}
                  votingEnds={proposal.votingEnds}
                  status={proposal.status}
                  onClick={() => setSelectedProposal(proposal.id)}
                />

                {/* Voting Buttons (only for active voting) */}
                {proposal.status === 'voting' && !voted && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleVote(proposal.id, 'approve')}
                      className="flex-1 bg-medieval-green hover:bg-medieval-green/90"
                      aria-label={`Vote to approve: ${proposal.title}`}
                    >
                      ✓ Approve
                    </Button>
                    <Button
                      variant="parchment"
                      size="sm"
                      onClick={() => handleVote(proposal.id, 'reject')}
                      className="flex-1 border-wax-red text-wax-red hover:bg-wax-red/10"
                      aria-label={`Vote to reject: ${proposal.title}`}
                    >
                      ✗ Reject
                    </Button>
                  </div>
                )}

                {voted && proposal.status === 'voting' && (
                  <div className="mt-3 text-center text-sm text-gray-600 bg-parchment-dark py-2 rounded">
                    ✓ You voted on this proposal
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredProposals.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">📜</div>
            <h3 className="text-xl font-semibold text-guild-wood-dark mb-2">
              No proposals in this category
            </h3>
            <p className="text-gray-600">Check back later for new proposals to vote on.</p>
          </Card>
        )}
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposalData && (
        <Modal
          isOpen={!!selectedProposal && !showVoteConfirm}
          onClose={() => setSelectedProposal(null)}
          title={selectedProposalData.title}
          size="lg"
          footer={
            selectedProposalData.status === 'voting' && !hasVoted(selectedProposal!) ? (
              <>
                <Button
                  variant="parchment"
                  onClick={() => handleVote(selectedProposal!, 'reject')}
                  className="border-wax-red text-wax-red"
                >
                  ✗ Reject
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleVote(selectedProposal!, 'approve')}
                  className="bg-medieval-green hover:bg-medieval-green/90"
                >
                  ✓ Approve
                </Button>
              </>
            ) : undefined
          }
        >
          <div className="space-y-6">
            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="px-2 py-1 bg-guild-wood/10 rounded">{selectedProposalData.category}</span>
              </div>
              <div>
                <span className="font-medium">Proposed by:</span> {selectedProposalData.proposedBy}
              </div>
              <div>
                <span className="font-medium">Date:</span>{' '}
                {new Date(selectedProposalData.proposedDate).toLocaleDateString()}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-lg text-guild-wood-dark mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{selectedProposalData.description}</p>
            </div>

            {/* Voting Status */}
            <div>
              <h3 className="font-bold text-lg text-guild-wood-dark mb-3">Voting Status</h3>
              <ProgressBar
                value={selectedProposalData.votePercentage}
                max={100}
                label="Approval Rating"
                color={selectedProposalData.votePercentage >= 50 ? '#10B981' : '#DC143C'}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{selectedProposalData.totalVotes} total votes</span>
                {selectedProposalData.status === 'voting' && (
                  <span>
                    Ends: {new Date(selectedProposalData.votingEnds).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {hasVoted(selectedProposal!) && (
              <div className="bg-medieval-blue/10 border border-medieval-blue/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2" aria-hidden="true">✓</div>
                <p className="text-sm text-gray-700">You have already voted on this proposal</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Vote Confirmation Modal */}
      <ConfirmModal
        isOpen={showVoteConfirm}
        onClose={() => {
          setShowVoteConfirm(false)
          setSelectedProposal(null)
          setVoteDirection(null)
        }}
        onConfirm={confirmVote}
        title="Confirm Your Vote"
        message={`Are you sure you want to ${voteDirection} this proposal? Your vote carries ${votingPower} voting power based on your reputation and tier.`}
        confirmText={voteDirection === 'approve' ? 'Approve' : 'Reject'}
        variant="info"
      />
    </div>
  )
}
