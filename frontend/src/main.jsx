import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from './redux/store.js'

// ✅ Backend URL (local)
export const serverUrl = "https://realtime-chatapp-backend-ibvj.onrender.com"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
