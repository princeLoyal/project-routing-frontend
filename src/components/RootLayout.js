import { Outlet } from "react-router-dom";
import Navigation from "./MainNavigation";

const RootLayout = () => {
    return (
        <>
           <Navigation />
           <Outlet />
        </>
    );
};

export default RootLayout;