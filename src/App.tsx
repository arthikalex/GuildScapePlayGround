import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from '@components/layout/MainLayout';
import { EnhancedDashboard } from '@pages/GreatHall/EnhancedDashboard';
import { Proposals } from '@pages/CouncilChambers/Proposals';
import { Profile } from '@pages/ArtisanQuarters/Profile';
import { Guilds } from '@pages/ChapterHouses/Guilds';
import { GuildHall } from '@pages/ChapterHouses/GuildHall';
import { Workshop } from '@pages/Workshop/Workshop';
import { HeraldsChamber } from '@pages/HeraldsChamber/HeraldsChamber';
import { Library } from '@pages/Library/Library';
import { Bazaar } from '@pages/Bazaar/Bazaar';
import { NotFound } from '@pages/NotFound';
import { ErrorBoundary } from '@components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
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
          <Route index element={<EnhancedDashboard />} />

          <Route path="/workshop" element={<Workshop />} />

          <Route path="/library" element={<Library />} />

          <Route path="/bazaar" element={<Bazaar />} />

          <Route path="/council" element={<Proposals />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/guilds" element={<Guilds />} />
          <Route path="/guilds/:guildId" element={<GuildHall />} />

          <Route path="/messages" element={<HeraldsChamber />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
