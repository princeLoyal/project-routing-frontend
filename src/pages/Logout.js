const Logout = () => {
  return localStorage.removeItem('userToken');
};
export default Logout;
