import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  const { events } = useRouteLoaderData('event-detail');

  return (
    <>
     // <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      //  <Await resolve={event}>
       //   {(loadedEvent) => <EventItem event={loadedEvent} />}
      //  </Await>
     // </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;



async function loadEvents() {
  const response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/events.json');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    //event: await loadEvent(id),
    events: loadEvents(),
  });
}
