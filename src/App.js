import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';

const router = createBrowserRouter([
 {
  path: '/',
  element: <RootLayout />,
  children: [
   { index: true, element: <HomePage /> },
   { 
     path: 'events',
     element: <EventsPage />,
    },
  ],
 },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

