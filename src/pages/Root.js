import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
 return (
    <>
<Outlet />
    </>
);
}
export default RootLayout;
