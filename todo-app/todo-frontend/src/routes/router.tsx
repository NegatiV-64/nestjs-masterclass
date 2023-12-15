import {createBrowserRouter} from 'react-router-dom';
import { AuthLayout, RootLayout } from '~/layouts';
import { LoginPage } from '~/routes/login';
import { HomePage, homePageLoader } from '~/routes/home';
import { RegisterPage } from './register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <RootLayout />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />,
                        loader: homePageLoader,
                    },
                ]
            }
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
])