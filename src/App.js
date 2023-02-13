import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';

const router = createBrowserRouter([
 {
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
   { index: true, element: <HomePage /> },
   { 
     path: 'events',
     element: <EventsRootLayout />,
     children: [
      { 
       index: true, 
       element: <EventsPage/>,
       loader: eventsLoader, 
      },
      { path: ':eventId', element: <EventDetailPage />},
     ],
    },
  ],
 },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
