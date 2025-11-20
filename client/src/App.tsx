import { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import Home from '@/pages/Home';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { useAnalytics } from '@/hooks/useAnalytics';

// Lazy-loaded components for better performance
const NotFound = lazy(() => import('@/pages/not-found'));

// Loading component for Suspense
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const { theme } = useTheme();
  useAnalytics(); // Initialize analytics tracking

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
