import React from 'react';
import { motion } from 'framer-motion';
import { Castle, Hammer, BookOpen, Store, Scale, User, Users, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigationStore, ROOMS, type RoomType } from '@store/navigationStore';
import { Tooltip } from '@components/common/Tooltip';
import clsx from 'clsx';

const roomIcons = {
  'great-hall': Castle,
  'workshop': Hammer,
  'library': BookOpen,
  'bazaar': Store,
  'council-chambers': Scale,
  'artisan-quarters': User,
  'chapter-houses': Users,
  'herald-chamber': Bell,
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useNavigationStore();

  const handleNavigate = (room: RoomType) => {
    navigate(ROOMS[room].path);
  };

  return (
    <motion.aside
      className={clsx(
        'fixed left-0 top-0 h-screen bg-gradient-to-b from-chamber-stone to-chamber-dark',
        'border-r-4 border-gold/30 shadow-chamber transition-all duration-300 z-30',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* Header */}
      <div className="p-6 border-b-2 border-gold/30">
        {!sidebarCollapsed && (
          <h1 className="text-2xl font-decorative font-bold text-gold text-center">
            GuildScape
          </h1>
        )}
        {sidebarCollapsed && (
          <div className="text-3xl font-decorative font-bold text-gold text-center">G</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-medieval">
        {(Object.entries(ROOMS) as [RoomType, typeof ROOMS[RoomType]][]).map(([key, room]) => {
          const Icon = roomIcons[key];
          const isActive = location.pathname === room.path;

          const navItem = (
            <motion.button
              key={key}
              onClick={() => handleNavigate(key)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                'hover:bg-gold/20 group',
                isActive
                  ? 'bg-gold text-burnt-umber shadow-seal'
                  : 'text-parchment hover:text-gold'
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              {!sidebarCollapsed && (
                <div className="text-left flex-1">
                  <div className="font-display font-semibold text-sm">{room.name}</div>
                  <div className="text-xs opacity-75">{room.description}</div>
                </div>
              )}
            </motion.button>
          );

          return sidebarCollapsed ? (
            <Tooltip key={key} content={room.name} position="right">
              {navItem}
            </Tooltip>
          ) : (
            navItem
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t-2 border-gold/30">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-parchment hover:text-gold transition-colors rounded-lg hover:bg-gold/20"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!sidebarCollapsed && <span className="font-display text-sm">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};
