import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import RoutesPage from './pages/index.js'


import 'swiper/css';
import 'swiper/css/virtual';
import "swiper/css/navigation";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>

  <BrowserRouter>
      <ToastContainer />
        <UserProvider>
          <ImageProvider>
          <App />
          </ImageProvider>
        </UserProvider>
  </BrowserRouter>
);

