import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

async function githubRequest(token, method, path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}

async function upsertFile(token, owner, repo, filePath, content) {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  // Check if file exists to get sha
  const checkRes = await githubRequest(token, 'GET', `/repos/${owner}/${repo}/contents/${filePath}`);
  let sha;
  if (checkRes.ok) {
    const existing = await checkRes.json();
    sha = existing.sha;
  }
  const body = { message: `Add ${filePath}`, content: encoded };
  if (sha) body.sha = sha;
  const res = await githubRequest(token, 'PUT', `/repos/${owner}/${repo}/contents/${filePath}`, body);
  return res.ok;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    // Get authenticated user
    const meRes = await githubRequest(accessToken, 'GET', '/user');
    const me = await meRes.json();
    const owner = me.login;
    const repoName = 'mbe-group-app';

    // Create repo (ignore error if already exists)
    await githubRequest(accessToken, 'POST', '/user/repos', {
      name: repoName,
      description: 'MBE Group website app',
      private: false,
      auto_init: false,
    });

    // All files to upload
    const files = {
      'App.jsx': `import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/i18n.jsx';
import LanguageAndCookieSelector from '@/components/LanguageAndCookieSelector';
import React, { useState, useEffect } from 'react';

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
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return <div style={{padding:40}}><h1>Error</h1><pre style={{color:'red'}}>{String(this.state.error)}</pre></div>;
    return this.props.children;
  }
}

function App() {
  const [showSelector, setShowSelector] = useState(true);
  useEffect(() => { if (localStorage.getItem('languageSelected')) setShowSelector(false); }, []);
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
  );
}
export default App;`,
      'README.md': `# MBE Group App\n\nMBE Group website built with React, Tailwind CSS, and Base44.\n\n## Tech Stack\n- React 18\n- Tailwind CSS\n- shadcn/ui\n- Framer Motion\n- React Router DOM\n- Base44 Backend\n`,
      'functions/sendContactEmail.js': `import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, message } = await req.json();
    await base44.asServiceRole.entities.ContactSubmission.create({ name, email, company, message });
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const emailBody = \`Name: \${name}\\nEmail: \${email}\\nCompany: \${company || 'N/A'}\\n\\nMessage:\\n\${message}\`;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${apiKey}\` },
      body: JSON.stringify({ from: 'MBE Group <onboarding@resend.dev>', to: 'info@mobihero.de', subject: \`New Contact Form Submission from \${name}\`, text: emailBody }),
    });
    if (!response.ok) { const error = await response.json(); throw new Error(error.message); }
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});`,
      'functions/onContactSubmission.js': `Deno.serve(async (req) => {
  try {
    const { data } = await req.json();
    const { name, email, company, message } = data;
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const emailBody = \`Name: \${name}\\nEmail: \${email}\\nCompany: \${company || 'N/A'}\\n\\nMessage:\\n\${message}\`;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${apiKey}\` },
      body: JSON.stringify({ from: 'MBE Group <onboarding@resend.dev>', to: 'info@mobihero.de', subject: \`New Contact Form Submission from \${name}\`, text: emailBody }),
    });
    if (!response.ok) { const error = await response.json(); throw new Error(error.message); }
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});`,
      'functions/uploadToGithub.js': '// See backend function for GitHub upload logic',
    };

    const results = [];
    for (const [filePath, content] of Object.entries(files)) {
      const ok = await upsertFile(accessToken, owner, repoName, filePath, content);
      results.push({ file: filePath, ok });
    }

    return Response.json({
      success: true,
      repo: `https://github.com/${owner}/${repoName}`,
      results,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});