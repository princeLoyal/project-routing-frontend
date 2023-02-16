const Logout = () => {
  return localStorage.clearItem('userToken');
};
export default Logout;
