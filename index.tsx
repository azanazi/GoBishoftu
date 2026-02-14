
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mount = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error("Critical Error: Could not find element with id 'root'.");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Mounting Error:", error);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; text-align: center; padding: 20px;">
        <div>
          <h1 style="color: #b6674c;">GoBishoftu is taking a nap...</h1>
          <p style="color: #666;">We ran into a loading error. Please try refreshing.</p>
          <pre style="font-size: 10px; background: #eee; padding: 10px; border-radius: 8px; margin-top: 20px; text-align: left;">${error instanceof Error ? error.message : 'Unknown Error'}</pre>
        </div>
      </div>
    `;
  }
};

// Ensure DOM is fully parsed before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
