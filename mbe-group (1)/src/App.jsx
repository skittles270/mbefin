import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/i18n.jsx';
import LanguageAndCookieSelector from '@/components/LanguageAndCookieSelector';
import React, { useState, useEffect } from 'react';

// Page imports
import Home from '@/pages/Home';
import About from '@/pages/About';
import Brands from '@/pages/Brands';
import Advantages from '@/pages/Advantages';
import Contact from '@/pages/Contact';
import Imprint from '@/pages/Imprint';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import SiteLayout from '@/components/layout/SiteLayout';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
          <h1>Something went wrong</h1>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [showSelector, setShowSelector] = useState(true);

  useEffect(() => {
    const languageSelected = localStorage.getItem('languageSelected');
    if (languageSelected) {
      setShowSelector(false);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          {showSelector && <LanguageAndCookieSelector onComplete={() => setShowSelector(false)} />}
          <Router>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Navigate to="/Home" replace />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Brands" element={<Brands />} />
                <Route path="/Advantages" element={<Advantages />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Imprint" element={<Imprint />} />
                <Route path="/Terms" element={<Terms />} />
                <Route path="/Privacy" element={<Privacy />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
          <SonnerToaster position="top-center" />
        </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App