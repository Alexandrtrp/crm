import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
