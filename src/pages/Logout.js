import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('userToken');
 // localStorage.removeItem('expiration');
  return redirect('/');
}
