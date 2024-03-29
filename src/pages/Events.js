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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
