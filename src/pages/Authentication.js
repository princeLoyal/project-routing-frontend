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

  if(mode !== 'login' && mode !== 'signUp'){
    throw json({message: 'Unsupported mode'}, { status: 422});
  };
 if(mode === 'signUp'){
    let response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/users.json');
    const users = await response.json();
    for(const key in users){
      alert(key)
      if(users[key].email === email){
        alert('User already exist');
        return redirect('/auth?mode=login');
      }
    };
    const authData = {
     email: email,
     password: password,
    };

    response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/users.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });
 }
if(mode === 'login'){
const response = await fetch('https://react-routing-eb51c-default-rtdb.firebaseio.com/users.json');
const res = await response.json();
for(const key in res){
alert(res[key].email)
}
alert('end')
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
