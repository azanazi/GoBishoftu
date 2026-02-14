
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Could not find root element to mount to.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Mounting error:", error);
    rootElement.innerHTML = `<div style="padding: 20px; text-align: center; color: #7e4438;">
      <h2>Something went wrong</h2>
      <p>${error instanceof Error ? error.message : 'Unknown loading error'}</p>
    </div>`;
  }
}
