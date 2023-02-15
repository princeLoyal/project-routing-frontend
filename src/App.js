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
import EditEventPage from './pages/EditEvent';
import AuthenticationPage, {action as authAction} from './pages/Authentication';

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
      {
       path: ':eventId',
       id: 'event-detail',
       loader: eventDetailLoader,
       children: [
        {
         index: true,
         element: <EventDetailPage />,
         action: deleteEventAction,
        },
        {
         path: 'edit',
         element: <EditEventPage />,
         action: manipulateEventAction,
        },
       ],
      },
      {
       path: 'new',
       element: <NewEventPage />,
       action: manipulateEventAction,
      },
     ],
    },
  //  {
   //  path: 'auth', 
    // element: <AuthenticationPage />,
   //  action: authAction, 
   // },
  ],
 },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
