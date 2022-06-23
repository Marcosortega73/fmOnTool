import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {isLoggedIn} from '../../../redux/authSlice';
import userAdminService from '../../../services/api/entity/userAdminService';


const Dashboard = () => {
  const [userData, setUserData] = useState({
  });
  const { isLoggedIn } = useSelector((state) => state.auth);

  //NO PUDE HACERLO DESDE REDUX
  const user  = JSON.parse(localStorage.getItem('user'));


useEffect(() => {
  if (user) {
    userAdminService(user).then((response) => {
      setUserData(response);
    });

    }
}, [isLoggedIn]); // eslint-disable-line

  console.log(userData)
  return (
    <>
    <div>{user? <>{userData.email}</>:"HOLA"}</div>
    </>
  )
}

export default Dashboard
