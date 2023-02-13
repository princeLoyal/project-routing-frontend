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
import NewEventPage from './pages/NewEvent';
import { action as manipulateEventAction } from './components/EventForm';

const router = createBrowserRouter([
 {
  path: '/',
  element: <RootLayout />,
//  errorElement: <ErrorPage />,
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
      
      {
       path: 'new',
       element: <NewEventPage />,
      },
     ],
    },
  ],
 },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
