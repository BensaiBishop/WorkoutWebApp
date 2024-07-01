import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import WorkoutsPage from './pages/workoutsPage.jsx'
import GroupsPage from './pages/groupsPage.jsx'
import EventsPage from './pages/eventsPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import FriendsPage from './pages/friendsPage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import WorkoutsCreation from './pages/workoutsCreation.jsx'
import SigninPage from './pages/signInPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <WorkoutsPage /> },
            { path: '/friendsPage', element: <FriendsPage /> },
            { path: '/groupsPage', element: <GroupsPage /> },
            { path: '/eventsPage', element: <EventsPage /> },
            { path: '/profilePage', element: <ProfilePage /> },
            { path: '/settingsPage', element: <SettingsPage /> },
            { path: '/workoutCreation', element: <WorkoutsCreation />},
            { path: '/signInPage', element: <SigninPage />},

        ],
    },  
]);

export default router;