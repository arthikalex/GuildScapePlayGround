import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@components/layout/PageContainer';
import { NoticeBoard } from '@components/guilds/NoticeBoard';
import { GuildProjects } from '@components/guilds/GuildProjects';
import { TreasuryDashboard } from '@components/guilds/TreasuryDashboard';
import { MemberDirectory } from '@components/guilds/MemberDirectory';
import { useNavigationStore } from '@store/navigationStore';
import { mockGuilds } from '@utils/mockData';
import {
  MessageSquare,
  Target,
  Coins,
  Users,
  ChevronLeft,
  Shield,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const GuildHall: React.FC = () => {
  const { guildId } = useParams<{ guildId: string }>();
  const navigate = useNavigate();
  const { setBreadcrumbs } = useNavigationStore();
  const [activeTab, setActiveTab] = useState('notice');

  // Find guild by ID
  const guild = mockGuilds.find((g) => g.id === guildId);

  useEffect(() => {
    if (guild) {
      setBreadcrumbs([
        { label: 'Chapter Houses', path: '/guilds' },
        { label: guild.name, path: `/guilds/${guild.id}` },
      ]);
    }
  }, [guild, setBreadcrumbs]);

  if (!guild) {
    return (
      <PageContainer title="Guild Not Found">
        <div className="text-center py-20">
          <p className="text-burnt-umber/70 mb-4">This guild could not be found.</p>
          <button
            onClick={() => navigate('/guilds')}
            className="btn-primary"
          >
            Return to Chapter Houses
          </button>
        </div>
      </PageContainer>
    );
  }

  const tabs = [
    {
      id: 'notice',
      label: 'Notice Board',
      icon: MessageSquare,
      count: guild.noticeBoard?.length || 0,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: Target,
      count: guild.projects?.filter((p) => p.status === 'active').length || 0,
    },
    {
      id: 'treasury',
      label: 'Treasury',
      icon: Coins,
      count: null,
    },
    {
      id: 'members',
      label: 'Members',
      icon: Users,
      count: guild.members.length,
    },
  ];

  return (
    <PageContainer showBreadcrumbs={false}>
      {/* Guild Header Banner */}
      <motion.div
        className="relative mb-8 rounded-2xl overflow-hidden border-4 border-burnt-umber shadow-elevated"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner Image */}
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${guild.banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-burnt-umber/90 via-burnt-umber/50 to-transparent" />

          {/* Back Button */}
          <button
            onClick={() => navigate('/guilds')}
            className="absolute top-4 left-4 px-4 py-2 bg-parchment/90 hover:bg-parchment rounded-lg border-2 border-burnt-umber flex items-center gap-2 font-display font-semibold text-burnt-umber transition-all hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Guilds
          </button>
        </div>

        {/* Guild Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6">
          {/* Guild Crest */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-24 h-24 rounded-full border-4 border-gold bg-parchment p-2 shadow-seal">
              <img
                src={guild.crest}
                alt={guild.name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Guild Details */}
          <div className="flex-1 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold text-parchment mb-2 drop-shadow-lg">
                  {guild.name}
                </h1>
                <p className="text-parchment/90 font-body text-lg italic drop-shadow">
                  "{guild.tagline}"
                </p>
              </div>

              {/* Guild Requirements Badge */}
              {guild.requirements && (
                <div className="px-4 py-2 bg-vote-pending/90 rounded-lg border-2 border-burnt-umber">
                  <div className="text-xs text-burnt-umber/80 font-display font-semibold uppercase">
                    Requirements
                  </div>
                  <div className="text-sm text-burnt-umber font-body">
                    {guild.requirements.minReputation && `${guild.requirements.minReputation}+ REP`}
                  </div>
                </div>
              )}

              {!guild.requirements && (
                <div className="px-4 py-2 bg-vote-approve/90 rounded-lg border-2 border-burnt-umber flex items-center gap-2">
                  <Shield className="w-5 h-5 text-burnt-umber" />
                  <span className="text-sm font-display font-bold text-burnt-umber uppercase">
                    Open to All
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Guild Meta Info */}
      <motion.div
        className="grid md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-council-blue" />
            <span className="text-xs text-burnt-umber/60 font-display font-semibold">Members</span>
          </div>
          <div className="text-2xl font-display font-bold text-council-blue">
            {guild.members.length}
          </div>
        </div>

        <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-council-purple" />
            <span className="text-xs text-burnt-umber/60 font-display font-semibold">Active Projects</span>
          </div>
          <div className="text-2xl font-display font-bold text-council-purple">
            {guild.projects?.filter((p) => p.status === 'active').length || 0}
          </div>
        </div>

        <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-gold" />
            <span className="text-xs text-burnt-umber/60 font-display font-semibold">Treasury</span>
          </div>
          <div className="text-2xl font-display font-bold text-gold">
            {guild.treasury.balance.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-burnt-umber/60" />
            <span className="text-xs text-burnt-umber/60 font-display font-semibold">Founded</span>
          </div>
          <div className="text-lg font-display font-bold text-burnt-umber">
            {format(new Date(guild.foundedDate), 'MMM yyyy')}
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="mb-8 p-6 bg-parchment-light rounded-xl border-2 border-burnt-umber/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-burnt-umber/80 font-body leading-relaxed">
          {guild.description}
        </p>

        {guild.tags && guild.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {guild.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-burnt-umber/10 rounded-full text-sm text-burnt-umber/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex gap-2 border-b-2 border-burnt-umber/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'relative px-6 py-3 font-display font-semibold transition-all flex items-center gap-2',
                  activeTab === tab.id
                    ? 'text-burnt-umber'
                    : 'text-burnt-umber/60 hover:text-burnt-umber'
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tab.count !== null && (
                  <span className="px-2 py-0.5 bg-gold/20 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                    layoutId="activeTab"
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'notice' && (
          <NoticeBoard
            posts={guild.noticeBoard || []}
            onPostClick={(post) => console.log('Post clicked:', post)}
          />
        )}

        {activeTab === 'projects' && (
          <GuildProjects
            projects={guild.projects || []}
            onProjectClick={(project) => console.log('Project clicked:', project)}
          />
        )}

        {activeTab === 'treasury' && (
          <TreasuryDashboard treasury={guild.treasury} />
        )}

        {activeTab === 'members' && (
          <MemberDirectory
            members={guild.members}
            onMemberClick={(member) => console.log('Member clicked:', member)}
          />
        )}
      </div>
    </PageContainer>
  );
};
