import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>  {/* Wrap the App component with Router */}
      <App />
    </Router>
  </StrictMode>,
);
