import { redirect } from 'react-router-dom';

const Logout = () => {
  alert('start')
  localStorage.removeItem('userToken');
  alert('end')
  return redirect('/');
};
export default Logout;
