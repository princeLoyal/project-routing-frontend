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
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  let url = 'https://react-routing-eb51c-default-rtdb.firebaseio.com/events.json';
  const resp = await fetch(url);
  const respData = await resp.json();
  for(const key in respData){
    if(respData[key].id === id){
     url = 'https://react-routing-eb51c-default-rtdb.firebaseio.com/events/' +key+ '.json';
    }
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
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
    const loadedEvents = [];
    const data = await response.json();
    for(const key in data){
      const event = {
       title: data[key].title,
       image: data[key].image, 
       id: data[key].id, 
       description: data[key].description, 
       date: data[key].date, 
      };
     loadedEvents.unshift(event);
    }
    return loadedEvents;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  let url = 'https://react-routing-eb51c-default-rtdb.firebaseio.com/events.json';
    const res = await fetch(url);
    const resData = await res.json();
    for(const key in resData){
      if(resData[key].id === eventId){
        url = 'https://react-routing-eb51c-default-rtdb.firebaseio.com/events/'+key+ '.json';
      }
    };

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(null),
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
