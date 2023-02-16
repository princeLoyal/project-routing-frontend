import { redirect } from 'react-router-dom';

const Logout = () => {
  localStorage.removeItem('userToken');
  //return redirect('/');
};
export default Logout;
