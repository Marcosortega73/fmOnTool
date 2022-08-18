import React from 'react'
import {useSelector} from "react-redux";
const Profile = () => {
    const { isLoggedIn,permission } = useSelector((state) => state.auth);
    return (
      <> 
      {isLoggedIn ? (
        <h1>{permission.email} : {permission.rol}</h1>
        
      
      ) : (
        <h1>Home</h1>
     ) }
      
      
      
      
      
      </>
    )
}

export default Profile