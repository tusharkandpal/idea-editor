import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router.tsx';
import { CodeProvider } from './context/code-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CodeProvider>
      <RouterProvider router={router} />
    </CodeProvider>
  </StrictMode>,
)
