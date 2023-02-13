import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
alert('yyg')
  const response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/events.json');
  alert('gggg')
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
alert('ggg')
    const resData = await response.json();
    return resData;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
