import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from '@components/layout/MainLayout';
import { Dashboard } from '@pages/GreatHall/Dashboard';
import { Proposals } from '@pages/CouncilChambers/Proposals';
import { Profile } from '@pages/ArtisanQuarters/Profile';
import { PlaceholderPage } from '@pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#F5ECD7',
            color: '#8B4513',
            border: '2px solid #8B4513',
            fontFamily: 'Crimson Text, serif',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#F5ECD7',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="/workshop"
            element={
              <PlaceholderPage
                title="Workshop"
                description="Create and review artworks"
                breadcrumbs={[{ label: 'Workshop', path: '/workshop' }]}
              />
            }
          />

          <Route
            path="/library"
            element={
              <PlaceholderPage
                title="Library"
                description="Learn and grow your skills"
                breadcrumbs={[{ label: 'Library', path: '/library' }]}
              />
            }
          />

          <Route
            path="/bazaar"
            element={
              <PlaceholderPage
                title="Bazaar"
                description="Marketplace for art"
                breadcrumbs={[{ label: 'Bazaar', path: '/bazaar' }]}
              />
            }
          />

          <Route path="/council" element={<Proposals />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/guilds"
            element={
              <PlaceholderPage
                title="Chapter Houses"
                description="Guild communities"
                breadcrumbs={[{ label: 'Chapter Houses', path: '/guilds' }]}
              />
            }
          />

          <Route
            path="/messages"
            element={
              <PlaceholderPage
                title="Herald's Chamber"
                description="Messages and notifications"
                breadcrumbs={[{ label: "Herald's Chamber", path: '/messages' }]}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
