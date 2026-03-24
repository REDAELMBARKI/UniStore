import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter } from "react-router-dom";
import EmailVerificationPage from "./Pages/Auth/EmailVerification";
import ForgotPasswordPage from "./Pages/Auth/ForgotPassword";
import ResetPasswordPage from "./Pages/Auth/ResetPassword";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const router = createBrowserRouter
const App =([

  {
    path: "/email/verify/:id/:hash",
    element: <EmailVerificationPage />,
  },
  {
    path: "/email/verify",
    element: <EmailVerificationPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);


export default App;


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(  <Provider store={store} >
            <App {...props} />
        </Provider>);
    },
    progress: {
        color: '#4B5563',

},
});

