import { Outlet } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";

const EventsRoot = () => {
    return (
        <>
          <EventsNavigation />
          <Outlet />
        </>
    );
};
export default EventsRoot;
