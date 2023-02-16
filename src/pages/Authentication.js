import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const url = 'https://react-routing-eb51c-default-rtdb.firebaseio.com/users/' +email+ '.json';

  if(mode !== 'login' && mode !== 'signUp'){
    throw json({message: 'Unsupported mode'}, { status: 422});
  };
alert(mode)
 if(mode === 'signUp'){
alert('response')
    const response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/users.json');
    const users = response.json();
alert('signup')
    for(const key in users){
      alert(key)
      if(users[key].email === email){
alert(users[key].email)
        alert('User already exist');
        return redirect('/auth');
      }
    };
alert('reached')
    const authData = {
     email: email,
     password: password,
    };

    response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });
 }
return null;
  //if(response.status === 422 || response.status === 401){
   // return response;
 // };

 // if(!response.ok){
   // throw json({message: 'Could not autenticate user'}, { status: 500});
 // };

 // return redirect('/');

};
