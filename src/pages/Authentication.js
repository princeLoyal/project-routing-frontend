import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <div>jdhdj</div>;
}

export default AuthenticationPage;

export const action = async({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  if(mode !== 'login' && mode !== 'signUp'){
    throw json({message: 'Unsupported mode'}, { status: 422});
  };

  const response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/user.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if(response.status === 422 || response.status === 401){
    return response;
  };

  if(!response.ok){
    throw json({message: 'Could not autenticate user'}, { status: 500});
  };

  return redirect('/');

};
