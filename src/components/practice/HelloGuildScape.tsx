import React from 'react';

interface HelloGuildScapeProps {
  /**
   * Optional subtitle to display below the main welcome message
   */
  subtitle?: string;
}

/**
 * HelloGuildScape Component
 * A simple React component that welcomes users to GuildScape
 * with medieval-themed styling using Tailwind CSS
 */
const HelloGuildScape: React.FC<HelloGuildScapeProps> = ({
  subtitle = 'Your medieval adventure awaits',
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center px-8 py-16 max-w-2xl">
        {/* Medieval ornamental border */}
        <div className="border-4 border-amber-600 p-12 bg-slate-800 rounded-lg shadow-2xl">
          {/* Main heading */}
          <h1 className="text-5xl font-bold text-amber-400 mb-6 drop-shadow-lg">
            Welcome to GuildScape
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-12 bg-amber-600"></div>
            <div className="h-1 w-12 bg-red-900"></div>
            <div className="h-1 w-12 bg-amber-600"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-amber-100 font-medium mb-8">
            {subtitle}
          </p>

          {/* Call to action */}
          <button className="px-8 py-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-amber-100 font-bold rounded-md transition-colors duration-200 shadow-lg border border-amber-600">
            Begin Your Journey
          </button>
        </div>

        {/* Footer text */}
        <p className="text-slate-400 text-sm mt-8 italic">
          Step into a world of magic, adventure, and legendary quests
        </p>
      </div>
    </div>
  );
};

export default HelloGuildScape;
