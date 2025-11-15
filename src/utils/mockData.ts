import type { User } from '@/types/user';
import type { Proposal } from '@/types/proposal';
import type { Artwork } from '@/types/artwork';
import type { Guild } from '@/types/guild';
import type { Quest } from '@/types/gamification';

// Mock User Data
export const mockUser: User = {
  id: 'user-001',
  name: 'Arthik Alexander',
  tier: 'Artisan',
  title: 'Master Ceramicist',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
  joinDate: new Date('2023-01-15'),
  reputation: {
    total: 845,
    dimensions: {
      artworkQuality: 320,
      communityEngagement: 180,
      peerReview: 210,
      exhibitionParticipation: 90,
      mentorshipActivities: 75,
      platformDevelopment: 25,
    },
  },
  badges: [
    {
      id: 'badge-001',
      name: 'Pioneer Badge',
      description: 'Founding member of GuildScape',
      type: 'foundational',
      rarity: 'rare',
      earnedDate: new Date('2023-01-15'),
      permanent: true,
      image: '/badges/pioneer.svg',
    },
    {
      id: 'badge-002',
      name: 'Exhibition Excellence',
      description: 'Participated in National Exhibition',
      type: 'excellence',
      rarity: 'epic',
      earnedDate: new Date('2024-06-20'),
      permanent: true,
      image: '/badges/exhibition.svg',
    },
    {
      id: 'badge-003',
      name: 'Community Champion',
      description: 'Helped 50+ community members',
      type: 'community',
      rarity: 'rare',
      earnedDate: new Date('2024-08-12'),
      permanent: true,
      image: '/badges/community.svg',
    },
    {
      id: 'badge-004',
      name: 'Master Reviewer',
      description: 'Provided 100+ peer reviews',
      type: 'community',
      rarity: 'uncommon',
      earnedDate: new Date('2024-09-01'),
      permanent: true,
      image: '/badges/reviewer.svg',
    },
  ],
  gldBalance: 15847,
  devotionChain: {
    currentStreak: 47,
    longestStreak: 52,
    lastCheckIn: new Date(),
    shields: 1,
    nextMilestone: 50,
    milestones: [
      { days: 7, achieved: true, reward: 'Chain Shield' },
      { days: 30, achieved: true, reward: '500 GLD' },
      { days: 50, achieved: false, reward: 'Devotion Badge' },
      { days: 100, achieved: false, reward: 'Legendary Frame' },
      { days: 365, achieved: false, reward: 'Master Dedication Badge' },
    ],
  },
  guilds: ['guild-001', 'guild-002'],
  votingPower: 850,
  bio: 'Ceramic artist specializing in functional stoneware. Passionate about sustainable practices and community education.',
  location: 'Portland, Oregon',
  website: 'https://arthikalexander.com',
  socialLinks: {
    instagram: '@arthikalexander',
    portfolio: 'arthikalexander.com',
  },
};

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: 'prop-042',
    number: 42,
    title: 'Exhibition Standards Reform',
    summary:
      'Establish new quality criteria for juried exhibitions, including peer review requirements and curation processes to ensure fair opportunities for all tiers.',
    fullContent: `## Proposal: Exhibition Standards Reform

### Executive Summary
This proposal seeks to establish comprehensive quality criteria for all GuildScape-sponsored juried exhibitions, ensuring fair opportunities across all artist tiers while maintaining artistic excellence.

### Current Situation
- Inconsistent jurying processes across exhibitions
- Lack of transparency in selection criteria
- Limited feedback for rejected submissions
- Tier-based advantages that may disadvantage emerging artists

### Proposed Changes

#### 1. Standardized Jurying Process
- All submissions reviewed by minimum 3 jurors
- Anonymous review for first round (artist identity hidden)
- Mandatory written feedback for all submissions
- Public disclosure of jurying criteria before submission deadline

#### 2. Tier-Balanced Selection
- Reserve 20% of slots for Novice/Maker artists
- Reserve 30% for Artisan tier
- Reserve 50% for Master/Elder (by merit only)
- Quality thresholds must be met regardless of tier

#### 3. Peer Review Integration
- Minimum 2 peer reviews required before exhibition submission
- Quality rating of "Proficiency" or higher required
- Recent work prioritized (created within 12 months)

### Implementation Timeline
- Phase 1 (Months 1-2): Develop jurying guidelines and training
- Phase 2 (Month 3): Pilot with Spring Exhibition
- Phase 3 (Month 4-6): Refine based on feedback
- Phase 4 (Month 7+): Full implementation for all exhibitions

### Budget
- Juror training and guidelines: 2,500 GLD
- Technology updates for anonymous review: 5,000 GLD
- First-year administration: 7,500 GLD
- **Total: 15,000 GLD**

### Success Metrics
- Increased tier diversity in exhibitions
- Higher satisfaction scores from participants
- Improved quality of submissions
- Greater community engagement with exhibition process`,
    type: 'major',
    status: 'active',
    voting: {
      approve: 76,
      reject: 18,
      abstain: 6,
      totalVotes: 1247,
      weightedPower: 2156890,
      quorumRequired: 20,
      quorumCurrent: 23,
    },
    deadline: new Date('2025-11-18'),
    sponsor: {
      userId: 'user-042',
      name: 'Marcus Elder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      tier: 'Elder',
    },
    discussion: [
      {
        id: 'comment-001',
        author: 'Elena Artisan',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        authorTier: 'Artisan',
        content:
          'Strong support for this proposal. Clear standards will improve overall quality and make the process more transparent for everyone.',
        timestamp: new Date('2025-11-10T10:30:00'),
      },
      {
        id: 'comment-002',
        author: 'James Master',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        authorTier: 'Master',
        content:
          'I appreciate the tier-balanced approach, but concerned about the 20% reserved for Novice/Maker. Should quality be the only determining factor?',
        timestamp: new Date('2025-11-11T14:15:00'),
      },
      {
        id: 'comment-003',
        author: 'Sarah Maker',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        authorTier: 'Maker',
        content:
          'As a Maker, I find this really encouraging. Having guaranteed slots helps us gain experience while still maintaining quality standards.',
        timestamp: new Date('2025-11-12T09:45:00'),
      },
    ],
    tags: ['exhibitions', 'quality-standards', 'governance'],
    impactAreas: ['Community', 'Quality', 'Fairness'],
    createdAt: new Date('2025-11-05'),
  },
  {
    id: 'prop-043',
    number: 43,
    title: 'Treasury Allocation for Member Education',
    summary:
      'Allocate 50,000 GLD from guild treasury to fund master classes, workshops, and mentorship programs for members.',
    fullContent: `## Proposal: Treasury Allocation for Member Education

### Overview
Allocate 50,000 GLD over the next year to significantly expand educational opportunities for all GuildScape members.

### Proposed Programs

#### Master Classes (25,000 GLD)
- 10 intensive workshops led by Master/Elder artists
- Topics: Advanced techniques, business skills, exhibition preparation
- Free for Novice/Maker, subsidized for others

#### Mentorship Matching (15,000 GLD)
- Formalized mentorship program with stipends
- 1000 GLD per mentor per mentee (3-month commitment)
- Focus on underrepresented mediums

#### Online Learning Library (10,000 GLD)
- Video tutorials and written guides
- Licensing educational content
- Platform development

### Expected Outcomes
- 500+ members participate in master classes
- 15 new mentorship pairs established
- 100+ educational resources added
- Improved skill levels across all tiers`,
    type: 'standard',
    status: 'active',
    voting: {
      approve: 82,
      reject: 12,
      abstain: 6,
      totalVotes: 891,
      weightedPower: 1543200,
      quorumRequired: 15,
      quorumCurrent: 18,
    },
    deadline: new Date('2025-11-20'),
    sponsor: {
      userId: 'user-078',
      name: 'Dr. Amelia Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
      tier: 'Master',
    },
    discussion: [],
    tags: ['education', 'treasury', 'mentorship'],
    impactAreas: ['Education', 'Community', 'Treasury'],
    createdAt: new Date('2025-11-08'),
  },
  {
    id: 'prop-041',
    number: 41,
    title: 'Update Platform Terms of Service',
    summary: 'Minor updates to Terms of Service for legal compliance and clarity on intellectual property rights.',
    fullContent: `## Proposal: Update Platform Terms of Service

### Changes Summary
Update ToS to clarify:
- Artist intellectual property rights
- Platform usage rules
- Privacy policy alignment with new regulations
- Dispute resolution process

### Key Updates
1. Artists retain 100% ownership of uploaded artwork
2. Platform license limited to display and promotion
3. Enhanced privacy controls
4. Clear content moderation guidelines

This is a routine legal update with no substantive policy changes.`,
    type: 'minor',
    status: 'active',
    voting: {
      approve: 65,
      reject: 8,
      abstain: 27,
      totalVotes: 654,
      weightedPower: 987500,
      quorumRequired: 10,
      quorumCurrent: 12,
    },
    deadline: new Date('2025-11-16'),
    sponsor: {
      userId: 'user-005',
      name: 'Legal Committee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Legal',
      tier: 'Elder',
    },
    discussion: [],
    tags: ['legal', 'terms-of-service'],
    impactAreas: ['Legal', 'Privacy'],
    createdAt: new Date('2025-11-02'),
  },
];

// Mock Artworks
export const mockArtworks: Artwork[] = [
  {
    id: 'artwork-001',
    artistId: 'user-001',
    artistName: 'Arthik Alexander',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
    title: 'Ocean Vessel Series #3',
    medium: 'Ceramic',
    dimensions: '18" × 12" × 8"',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
    description:
      'Hand-thrown stoneware vessel with ocean-inspired glazing. This piece explores the relationship between form and fluidity, with cascading blue glazes that evoke coastal waters.',
    quality: 'excellence',
    views: 1203,
    appreciations: 89,
    peerReviews: [
      {
        id: 'review-001',
        reviewerId: 'user-042',
        reviewer: 'Marcus Elder',
        reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        reviewerTier: 'Elder',
        rating: 'excellence',
        feedback:
          'Exceptional glazing technique with masterful color transitions. The form is both functional and artistic. Minor suggestion: consider experimenting with rim thickness variations.',
        technicalScore: 95,
        creativityScore: 88,
        craftsmanshipScore: 92,
        timestamp: new Date('2024-10-15'),
      },
      {
        id: 'review-002',
        reviewerId: 'user-078',
        reviewer: 'Dr. Amelia Chen',
        reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia',
        reviewerTier: 'Master',
        rating: 'excellence',
        feedback:
          'Beautiful piece that shows technical mastery. The glaze application demonstrates deep understanding of ceramic chemistry. Would love to see this series continue.',
        technicalScore: 90,
        creativityScore: 92,
        craftsmanshipScore: 94,
        timestamp: new Date('2024-10-16'),
      },
    ],
    tags: ['stoneware', 'functional', 'ocean-inspired'],
    materials: ['stoneware clay', 'glaze', 'oxide wash'],
    techniques: ['wheel-throwing', 'layered glazing', 'reduction firing'],
    uploadDate: new Date('2024-10-12'),
    featured: true,
    forSale: true,
    price: 850,
  },
  {
    id: 'artwork-002',
    artistId: 'user-001',
    artistName: 'Arthik Alexander',
    artistAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
    title: 'Meditation Bowl',
    medium: 'Ceramic',
    dimensions: '6" × 6" × 3"',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
    description: 'Minimalist meditation bowl with matte white glaze and subtle texture.',
    quality: 'proficiency',
    views: 456,
    appreciations: 34,
    peerReviews: [
      {
        id: 'review-003',
        reviewerId: 'user-123',
        reviewer: 'Chen Wei',
        reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen',
        reviewerTier: 'Artisan',
        rating: 'proficiency',
        feedback: 'Clean execution with good attention to detail. Consider exploring more complex surface treatments.',
        technicalScore: 82,
        creativityScore: 75,
        craftsmanshipScore: 85,
        timestamp: new Date('2024-09-20'),
      },
    ],
    tags: ['functional', 'minimalist', 'meditation'],
    uploadDate: new Date('2024-09-18'),
    forSale: true,
    price: 120,
  },
];

// Mock Guilds
export const mockGuilds: Guild[] = [
  {
    id: 'guild-001',
    name: "The Ceramic Masters' Guild",
    tagline: 'Form, Fire, and Fellowship',
    crest: '/crests/ceramics.svg',
    banner: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200',
    description:
      'A community of ceramic artists dedicated to advancing the art of clay. We share resources, knowledge, and studio space while promoting excellence in functional and sculptural ceramics.',
    tags: ['Ceramics', 'Sculpture', 'Functional Art'],
    foundedDate: new Date('2023-01-20'),
    members: [
      {
        userId: 'user-001',
        name: 'Arthik Alexander',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
        role: 'founder',
        joinedAt: new Date('2023-01-20'),
        contributionCount: 45,
        reputation: 845,
        activityScore: 92,
        isOnline: true,
        specialties: ['Ceramics', 'Sculpture'],
      },
      {
        userId: 'user-042',
        name: 'Marcus Elder',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        role: 'elder',
        joinedAt: new Date('2023-02-15'),
        contributionCount: 38,
        reputation: 720,
        activityScore: 85,
        isOnline: false,
        specialties: ['Glazes', 'Teaching'],
      },
      {
        userId: 'user-103',
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        role: 'artisan',
        joinedAt: new Date('2023-06-10'),
        contributionCount: 22,
        reputation: 450,
        activityScore: 68,
        isOnline: true,
        specialties: ['Functional Art', 'Wheel Throwing'],
      },
      {
        userId: 'user-204',
        name: 'James Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        role: 'apprentice',
        joinedAt: new Date('2024-10-05'),
        contributionCount: 8,
        reputation: 145,
        activityScore: 45,
        isOnline: false,
        specialties: ['Hand Building'],
      },
    ],
    projects: [
      {
        id: 'proj-001',
        title: 'Community Kiln Renovation',
        description: 'Upgrade our shared gas kiln with modern controls and better insulation for more efficient firings.',
        status: 'active',
        progress: 65,
        startDate: new Date('2025-10-01'),
        deadline: new Date('2025-12-15'),
        contributors: [
          {
            userId: 'user-001',
            name: 'Arthik Alexander',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
            role: 'Lead',
          },
          {
            userId: 'user-042',
            name: 'Marcus Elder',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
            role: 'Contributor',
          },
        ],
        deliverables: [
          { id: 'del-001', title: 'Purchase new control system', completed: true },
          { id: 'del-002', title: 'Install insulation upgrade', completed: true },
          { id: 'del-003', title: 'Test firing cycles', completed: false },
          { id: 'del-004', title: 'Document new procedures', completed: false },
        ],
        rewards: {
          reputation: 100,
          gld: 2000,
        },
      },
      {
        id: 'proj-002',
        title: 'Spring Exhibition Preparation',
        description: 'Organize and curate our annual spring exhibition showcasing member work.',
        status: 'planning',
        progress: 20,
        startDate: new Date('2025-11-15'),
        deadline: new Date('2026-03-01'),
        contributors: [
          {
            userId: 'user-103',
            name: 'Sarah Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            role: 'Curator',
          },
        ],
        deliverables: [
          { id: 'del-005', title: 'Select exhibition theme', completed: true },
          { id: 'del-006', title: 'Create submission guidelines', completed: false },
          { id: 'del-007', title: 'Secure venue', completed: false },
        ],
        rewards: {
          reputation: 75,
        },
      },
    ],
    noticeBoard: [
      {
        id: 'post-001',
        authorId: 'user-001',
        authorName: 'Arthik Alexander',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthik',
        type: 'event',
        title: 'Winter Firing Session - December 5th',
        content:
          'Join us for our quarterly communal firing! Bring your bisqueware. Kiln will be loaded on December 5th, firing on December 6-7. Sign up in comments.',
        timestamp: new Date('2025-11-12'),
        pinned: true,
        tags: ['firing', 'community', 'workshop'],
        reactions: [
          { emoji: '🔥', count: 12, users: ['user-001', 'user-042'] },
          { emoji: '🎨', count: 8, users: ['user-103'] },
        ],
      },
      {
        id: 'post-002',
        authorId: 'user-042',
        authorName: 'Marcus Elder',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        type: 'announcement',
        title: 'New Glaze Recipes Available',
        content:
          'I\'ve uploaded three new cone 10 reduction glaze recipes to the guild library. Tested and refined over the past six months. Check them out!',
        timestamp: new Date('2025-11-11'),
        pinned: false,
        tags: ['glazes', 'resources'],
      },
      {
        id: 'post-003',
        authorId: 'user-103',
        authorName: 'Sarah Chen',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        type: 'opportunity',
        title: 'Studio Assistant Position Available',
        content:
          'Looking for an apprentice to help with wheel throwing workshops. Great learning opportunity! 10 hours/week, paid in GLD.',
        timestamp: new Date('2025-11-09'),
        pinned: false,
        tags: ['opportunity', 'apprenticeship'],
      },
    ],
    treasury: {
      balance: 42500,
      income: [
        { source: 'Member Dues', amount: 15000 },
        { source: 'Workshop Fees', amount: 12000 },
        { source: 'Exhibition Sales', amount: 8500 },
        { source: 'Donations', amount: 5000 },
      ],
      expenses: [
        { category: 'Studio Rent', amount: 18000 },
        { category: 'Materials', amount: 8500 },
        { category: 'Equipment', amount: 6200 },
        { category: 'Events', amount: 3800 },
      ],
      transactions: [
        {
          id: 'tx-001',
          type: 'income',
          amount: 5000,
          description: 'Exhibition sales commission',
          date: new Date('2025-11-10'),
          fromTo: 'Gallery Partnership',
        },
        {
          id: 'tx-002',
          type: 'expense',
          amount: 2500,
          description: 'Clay and materials purchase',
          date: new Date('2025-11-08'),
          fromTo: 'Ceramic Supply Co.',
        },
        {
          id: 'tx-003',
          type: 'income',
          amount: 3200,
          description: 'Member dues - November',
          date: new Date('2025-11-01'),
        },
        {
          id: 'tx-004',
          type: 'expense',
          amount: 4500,
          description: 'Studio rent - November',
          date: new Date('2025-11-01'),
          fromTo: 'Arts Building LLC',
        },
      ],
    },
    requirements: {
      minTier: 'Maker',
      minReputation: 100,
    },
  },
  {
    id: 'guild-002',
    name: 'Sustainable Artists Collective',
    tagline: 'Art with Conscience',
    crest: '/crests/sustainable.svg',
    banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
    description:
      'Artists committed to sustainable practices, ethical sourcing, and environmental consciousness in art-making. We believe art can be both beautiful and responsible.',
    tags: ['Sustainability', 'Mixed Media', 'Community', 'Environmental'],
    foundedDate: new Date('2023-03-15'),
    members: [
      {
        userId: 'user-305',
        name: 'Maya Patel',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        role: 'founder',
        joinedAt: new Date('2023-03-15'),
        contributionCount: 52,
        reputation: 680,
        activityScore: 88,
        isOnline: true,
        specialties: ['Recycled Materials', 'Mixed Media'],
      },
      {
        userId: 'user-406',
        name: 'Alex Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'artisan',
        joinedAt: new Date('2023-07-20'),
        contributionCount: 28,
        reputation: 420,
        activityScore: 72,
        isOnline: false,
        specialties: ['Natural Dyes', 'Textile Art'],
      },
    ],
    projects: [
      {
        id: 'proj-003',
        title: 'Zero-Waste Workshop Series',
        description: 'Monthly workshops teaching sustainable art techniques using reclaimed and natural materials.',
        status: 'active',
        progress: 80,
        startDate: new Date('2025-09-01'),
        deadline: new Date('2026-02-28'),
        contributors: [
          {
            userId: 'user-305',
            name: 'Maya Patel',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
            role: 'Organizer',
          },
        ],
        deliverables: [
          { id: 'del-008', title: 'Host 6 workshops', completed: false },
          { id: 'del-009', title: 'Create resource library', completed: true },
          { id: 'del-010', title: 'Document techniques', completed: true },
        ],
        rewards: {
          reputation: 150,
          gld: 1500,
        },
      },
    ],
    noticeBoard: [
      {
        id: 'post-004',
        authorId: 'user-305',
        authorName: 'Maya Patel',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        type: 'discussion',
        title: 'Ethical Sourcing Discussion',
        content:
          'Let\'s talk about our experiences sourcing sustainable materials. What suppliers do you trust? What challenges have you faced?',
        timestamp: new Date('2025-11-10'),
        pinned: true,
        tags: ['discussion', 'sustainability', 'materials'],
      },
    ],
    treasury: {
      balance: 28400,
      income: [
        { source: 'Workshop Fees', amount: 8500 },
        { source: 'Grants', amount: 12000 },
        { source: 'Member Dues', amount: 6400 },
      ],
      expenses: [
        { category: 'Materials', amount: 5200 },
        { category: 'Events', amount: 4100 },
        { category: 'Outreach', amount: 2800 },
      ],
      transactions: [
        {
          id: 'tx-005',
          type: 'income',
          amount: 12000,
          description: 'Environmental Arts Grant',
          date: new Date('2025-10-15'),
          fromTo: 'Green Arts Foundation',
        },
        {
          id: 'tx-006',
          type: 'expense',
          amount: 1500,
          description: 'Workshop materials',
          date: new Date('2025-11-05'),
        },
      ],
    },
  },
];

// Mock Quests
export const mockQuests: Quest[] = [
  {
    id: 'quest-001',
    title: 'Path to Artisan',
    rarity: 'epic',
    description: 'Advance from Maker to Artisan tier by demonstrating excellence across all Six Virtues.',
    longDescription:
      'This epic quest guides you through the requirements to achieve Artisan status, the first major milestone in your GuildScape journey. Complete all steps to unlock exclusive benefits and recognition.',
    steps: [
      {
        id: 'step-1',
        title: 'Earn 801 total REP',
        description: 'Achieve a total reputation score of 801 points across all dimensions.',
        completed: false,
        progress: 845,
        total: 801,
      },
      {
        id: 'step-2',
        title: 'Achieve 60 REP in Artwork Quality',
        description: 'Demonstrate consistent quality in your artwork submissions.',
        completed: true,
      },
      {
        id: 'step-3',
        title: 'Achieve 60 REP in Community Engagement',
        description: 'Be an active and helpful community member.',
        completed: false,
        progress: 48,
        total: 60,
      },
      {
        id: 'step-4',
        title: 'Achieve 60 REP in all Six Virtues',
        description: 'Show well-rounded excellence across all reputation dimensions.',
        completed: false,
        progress: 5,
        total: 6,
      },
    ],
    progress: 73,
    rewards: [
      {
        type: 'badge',
        name: 'Artisan Achievement Badge',
        image: '/badges/artisan.svg',
        description: 'Proof of your advancement to Artisan tier',
      },
      { type: 'gld', amount: 5000, name: '5,000 GLD' },
      { type: 'avatar-item', name: "Master's Robe", description: 'Exclusive avatar clothing' },
    ],
    status: 'active',
    category: 'achievement',
  },
  {
    id: 'quest-002',
    title: 'Exhibition Debut',
    rarity: 'rare',
    description: 'Participate in your first GuildScape exhibition.',
    steps: [
      {
        id: 'step-1',
        title: 'Get 2 peer reviews on an artwork',
        completed: true,
      },
      {
        id: 'step-2',
        title: 'Submit artwork to an exhibition',
        completed: false,
      },
      {
        id: 'step-3',
        title: 'Have artwork accepted',
        completed: false,
      },
    ],
    progress: 33,
    rewards: [
      { type: 'badge', name: 'Exhibition Debut Badge', image: '/badges/exhibition-debut.svg' },
      { type: 'reputation', amount: 50, name: '50 REP' },
    ],
    status: 'active',
    category: 'achievement',
  },
  {
    id: 'quest-003',
    title: 'Community Helper',
    rarity: 'uncommon',
    description: 'Help fellow artists by providing peer reviews and feedback.',
    steps: [
      {
        id: 'step-1',
        title: 'Complete 10 peer reviews',
        completed: false,
        progress: 7,
        total: 10,
      },
      {
        id: 'step-2',
        title: 'Receive 5 helpful votes on your reviews',
        completed: false,
        progress: 3,
        total: 5,
      },
    ],
    progress: 65,
    rewards: [
      { type: 'badge', name: 'Community Helper Badge', image: '/badges/helper.svg' },
      { type: 'gld', amount: 1000 },
    ],
    status: 'active',
    category: 'social',
  },
];

// Mock Daily Scrolls
export const generateDailyScrolls = () => [
  {
    id: 'scroll-001',
    title: 'Review a Peer',
    description: 'Provide thoughtful feedback on a fellow artist\'s work',
    type: 'review' as const,
    reward: { rep: 10, gld: 100 },
    completed: false,
  },
  {
    id: 'scroll-002',
    title: 'Cast Your Vote',
    description: 'Participate in guild governance by voting on an active proposal',
    type: 'vote' as const,
    reward: { rep: 5, gld: 50 },
    completed: false,
  },
  {
    id: 'scroll-003',
    title: 'Share Your Progress',
    description: 'Upload a work-in-progress or completed piece',
    type: 'artwork' as const,
    reward: { rep: 15, gld: 200 },
    completed: false,
  },
  {
    id: 'scroll-004',
    title: 'Learn Something New',
    description: 'Watch a master class or read a tutorial in the Library',
    type: 'learning' as const,
    reward: { rep: 5 },
    completed: false,
  },
];
