import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GuildProject } from '@/types/guild';
import {
  Target,
  Calendar,
  Users,
  CheckCircle2,
  Circle,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

interface GuildProjectsProps {
  projects: GuildProject[];
  onProjectClick?: (project: GuildProject) => void;
  className?: string;
}

const statusStyles = {
  planning: {
    bg: 'bg-vote-pending/10',
    border: 'border-vote-pending',
    text: 'text-vote-pending',
    icon: '📋',
    label: 'Planning',
  },
  active: {
    bg: 'bg-council-blue/10',
    border: 'border-council-blue',
    text: 'text-council-blue',
    icon: '⚡',
    label: 'Active',
  },
  review: {
    bg: 'bg-council-purple/10',
    border: 'border-council-purple',
    text: 'text-council-purple',
    icon: '👁️',
    label: 'In Review',
  },
  completed: {
    bg: 'bg-vote-approve/10',
    border: 'border-vote-approve',
    text: 'text-vote-approve',
    icon: '✅',
    label: 'Completed',
  },
};

export const GuildProjects: React.FC<GuildProjectsProps> = ({
  projects,
  onProjectClick,
  className
}) => {
  const [filter, setFilter] = useState<'all' | GuildProject['status']>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'deadline'>('recent');

  // Filter and sort projects
  let filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  filteredProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'progress') return b.progress - a.progress;
    if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); // recent
  });

  const activeCount = projects.filter((p) => p.status === 'active').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const avgProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-burnt-umber mb-2">Guild Projects</h3>
          <p className="text-burnt-umber/70 text-sm">
            Collaborative endeavors of the guild
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-council-blue/10 rounded-lg border-2 border-council-blue/30">
            <div className="text-xs text-burnt-umber/60">Active</div>
            <div className="text-xl font-display font-bold text-council-blue">{activeCount}</div>
          </div>
          <div className="px-4 py-2 bg-vote-approve/10 rounded-lg border-2 border-vote-approve/30">
            <div className="text-xs text-burnt-umber/60">Completed</div>
            <div className="text-xl font-display font-bold text-vote-approve">{completedCount}</div>
          </div>
          <div className="px-4 py-2 bg-gold/10 rounded-lg border-2 border-gold/30">
            <div className="text-xs text-burnt-umber/60">Avg Progress</div>
            <div className="text-xl font-display font-bold text-gold">{Math.round(avgProgress)}%</div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between mb-6">
        {/* Status Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'px-3 py-2 rounded-lg text-sm font-display font-semibold transition-all',
              filter === 'all'
                ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
            )}
          >
            All
          </button>
          {Object.entries(statusStyles).map(([status, style]) => (
            <button
              key={status}
              onClick={() => setFilter(status as GuildProject['status'])}
              className={clsx(
                'px-3 py-2 rounded-lg text-sm font-display font-semibold transition-all',
                filter === status
                  ? 'bg-gold text-burnt-umber border-2 border-burnt-umber'
                  : 'bg-parchment-light text-burnt-umber/70 border-2 border-burnt-umber/20 hover:border-burnt-umber/40'
              )}
            >
              {style.icon}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 bg-parchment-light border-2 border-burnt-umber/20 rounded-lg text-sm font-display text-burnt-umber focus:outline-none focus:border-burnt-umber"
        >
          <option value="recent">Most Recent</option>
          <option value="progress">By Progress</option>
          <option value="deadline">By Deadline</option>
        </select>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + sortBy}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => onProjectClick?.(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-parchment-light rounded-xl border-2 border-burnt-umber/20">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-burnt-umber/70">No projects to display</p>
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: GuildProject;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const style = statusStyles[project.status];
  const completedDeliverables = project.deliverables.filter((d) => d.completed).length;
  const totalDeliverables = project.deliverables.length;
  const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={clsx(
        'relative p-6 rounded-xl border-2 cursor-pointer',
        'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1',
        'bg-parchment-light',
        style.border
      )}
    >
      {/* Status Badge */}
      <div className="absolute -top-3 -right-3">
        <div className={clsx(
          'px-3 py-1 rounded-lg border-2 font-display font-bold text-xs uppercase flex items-center gap-1',
          style.bg,
          style.border,
          style.text
        )}>
          <span>{style.icon}</span>
          <span>{style.label}</span>
        </div>
      </div>

      {/* Overdue Warning */}
      {isOverdue && (
        <div className="absolute -top-3 -left-3">
          <motion.div
            className="w-8 h-8 bg-vote-reject rounded-full border-2 border-burnt-umber flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4 text-parchment" />
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h4 className="text-xl font-display font-bold text-burnt-umber mb-2 flex items-center gap-2">
          <Target className="w-5 h-5 text-gold" />
          {project.title}
        </h4>
        <p className="text-burnt-umber/70 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display font-semibold text-burnt-umber flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Progress
          </span>
          <span className="text-sm font-display font-bold text-gold">
            {project.progress}%
          </span>
        </div>
        <div className="h-3 bg-parchment-dark rounded-full overflow-hidden border-2 border-burnt-umber/20">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-light"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
          />
        </div>
      </div>

      {/* Contributors */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-burnt-umber/60" />
        <div className="flex -space-x-2">
          {project.contributors.slice(0, 5).map((contributor) => (
            <img
              key={contributor.userId}
              src={contributor.avatar}
              alt={contributor.name}
              className="w-8 h-8 rounded-full border-2 border-parchment"
              title={contributor.name}
            />
          ))}
          {project.contributors.length > 5 && (
            <div className="w-8 h-8 rounded-full border-2 border-parchment bg-burnt-umber/20 flex items-center justify-center">
              <span className="text-xs font-display font-bold text-burnt-umber">
                +{project.contributors.length - 5}
              </span>
            </div>
          )}
        </div>
        <span className="text-xs text-burnt-umber/60 ml-2">
          {project.contributors.length} contributor{project.contributors.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Deliverables */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display font-semibold text-burnt-umber flex items-center gap-1">
            <Award className="w-3 h-3" />
            Deliverables
          </span>
          <span className="text-xs text-burnt-umber/60">
            {completedDeliverables}/{totalDeliverables} complete
          </span>
        </div>
        <div className="space-y-1">
          {project.deliverables.slice(0, 3).map((deliverable) => (
            <div
              key={deliverable.id}
              className="flex items-center gap-2 text-xs text-burnt-umber/70"
            >
              {deliverable.completed ? (
                <CheckCircle2 className="w-4 h-4 text-vote-approve flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-burnt-umber/30 flex-shrink-0" />
              )}
              <span className={clsx(
                'line-clamp-1',
                deliverable.completed && 'line-through text-burnt-umber/40'
              )}>
                {deliverable.title}
              </span>
            </div>
          ))}
          {project.deliverables.length > 3 && (
            <div className="text-xs text-burnt-umber/50 pl-6">
              +{project.deliverables.length - 3} more...
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-burnt-umber/10">
        <div className="flex items-center gap-1 text-xs text-burnt-umber/60">
          <Calendar className="w-3 h-3" />
          <span>Due {formatDistanceToNow(new Date(project.deadline), { addSuffix: true })}</span>
        </div>
        {project.rewards.reputation > 0 && (
          <div className="flex items-center gap-1 text-xs text-gold font-display font-bold">
            <Award className="w-3 h-3" />
            <span>+{project.rewards.reputation} REP</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
