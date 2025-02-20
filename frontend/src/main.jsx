import { createRoot } from 'react-dom/client'
import './builds/build.css'
import App from './pages/App.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
)
