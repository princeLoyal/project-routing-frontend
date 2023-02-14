import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage(){
const data = useRouteLoaderData('event-detail');
return(
<EventForm />
);
}
export default EditEventPage;
