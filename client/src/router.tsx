import { Outlet, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./pages/layouts/RootLayout";
import Home from "./pages/Home";
import New from "./pages/channel/new";


export const router = createBrowserRouter([
    {   

        element: <ContextWrapper />,
        children: [
            {   
                element: <RootLayout />,
                children: [
                // { path: "/", element: <Home /> },
                { path: "/", element: <Home /> },
                { path: "/channel", children: [
                   { path: 'new', element: <New />}
                ]}
                ]
            },
            {   
            path: "/",
            element: <AuthLayout />,
            children: [
            // { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> }
            ]
        },
        ]
        
        
    }
])


function ContextWrapper() {
    return( 
        <AuthProvider>
        <Outlet />
    </AuthProvider>)
}