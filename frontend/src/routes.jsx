import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import WorkoutsPage from './pages/workoutsPage.jsx'
import GroupsPage from './pages/groupsPage.jsx'
import EventsPage from './pages/eventsPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import FriendsPage from './pages/friendsPage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import WorkoutsCreation from './pages/workoutsCreation.jsx'
import SigninPage from './pages/signinPage.jsx'
import RegisterPage from './pages/registerPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <WorkoutsPage /> },
            { path: '/friends', element: <FriendsPage /> },
            { path: '/groups', element: <GroupsPage /> },
            { path: '/events', element: <EventsPage /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/settings', element: <SettingsPage /> },
            { path: '/creation', element: <WorkoutsCreation />},
            { path: '/signin', element: <SigninPage />},
            { path: '/register', element: < RegisterPage/>}

        ],
    },  
]);

export default router;