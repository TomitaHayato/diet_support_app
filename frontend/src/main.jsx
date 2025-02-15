import { createRoot } from 'react-dom/client'
import './builds/build.css'
import App from './pages/App.jsx';
import { ThemeContextProvider } from './Contexts/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </>,
)
