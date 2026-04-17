import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { ToastProvider } from './context/ToastContext';
import { GlobalToastContainer } from './components/common/GlobalToastContainer';

function App() {
  console.log("App: rendering...");
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      <GlobalToastContainer />
    </ToastProvider>
  );
}

export default App;