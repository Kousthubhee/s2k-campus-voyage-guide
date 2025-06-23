
console.log("[main.tsx] TOP OF FILE – Script is loading");

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("[main.tsx] Before getElementById");
const rootElem = document.getElementById("root");
if (!rootElem) {
  console.error("[main.tsx] ERROR: No #root element in DOM");
} else {
  console.log("[main.tsx] #root element exists, about to call createRoot and render App");
}
createRoot(rootElem!).render(<App />);
console.log("[main.tsx] createRoot and render call finished");
