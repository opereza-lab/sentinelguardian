import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/components/LanguageContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import LanguageOnboarding from '@/components/LanguageOnboarding';
import DisclaimerScreen from '@/components/DisclaimerScreen';
import SOSProfileBanner from '@/components/SOSProfileBanner';
import { useState } from 'react';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;
const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }
  return (
    <>
      <SOSProfileBanner />
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function AppContent() {
  const [onboardingDone, setOnboardingDone] = useState(() => {
    try { return !!localStorage.getItem("sg_onboarding_done"); } catch { return false; }
  });
  const [disclaimerDone, setDisclaimerDone] = useState(() => {
    try { return !!localStorage.getItem("sg_disclaimer_accepted"); } catch { return false; }
  });

  // Paso 1: Onboarding de idioma
  if (!onboardingDone) {
    return <LanguageOnboarding onDone={() => setOnboardingDone(true)} />;
  }

  // Paso 2: Descargo de responsabilidad
  if (!disclaimerDone) {
    return <DisclaimerScreen onAccept={() => setDisclaimerDone(true)} />;
  }

  // Paso 3: App completa
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
