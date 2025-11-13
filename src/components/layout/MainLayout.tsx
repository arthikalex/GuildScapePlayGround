import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigationStore } from '@store/navigationStore';
import { Sidebar } from '@components/navigation/Sidebar';
import { PageTransition } from '@components/navigation/PageTransition';
import clsx from 'clsx';

export const MainLayout: React.FC = () => {
  const { sidebarCollapsed } = useNavigationStore();

  return (
    <div className="flex min-h-screen bg-parchment">
      <Sidebar />

      <main
        className={clsx(
          'flex-1 transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};
