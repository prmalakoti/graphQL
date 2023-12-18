import Home from './components/Home';
import Login from './components/login';
import NotFound from './components/notFound';
import OtherUserProfile from './components/OtherUserProfile';
import Profile from './components/profile';
import Quote from './components/Quote';
import Signup from './components/signup';

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "/create", element: <Quote /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile/:userid", element: <OtherUserProfile /> },
    { path: "*", element: <NotFound /> }
]