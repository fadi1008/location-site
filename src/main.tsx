import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Gardez seulement ceci pour empêcher le sleep
setInterval(() => {
  fetch('/').catch(() => {}); // On fetch la racine au lieu de /health
}, 5 * 60 * 1000);

createRoot(document.getElementById('root')!).render(<App />)
