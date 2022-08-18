// llamada get a userStates

import http from "../../apiAxios";

 const API_URL = "extras/";


 const getUserStatesService = async () => {
        const response = await http
            .get(API_URL + "usersState")
            .then((res) => {
                return res.data;
            }
            )
            .catch((err) => {
                console.log(err);
                return err
    
            }
            );
            return response
    }
    const userStatesService = {
        getUserStatesService
    }
    export default userStatesService;


