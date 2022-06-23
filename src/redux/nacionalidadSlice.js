import { createSlice } from "@reduxjs/toolkit";
import nacionalidadServices from "../services/api/nacionalidades/nacionalidadServices";


export const getNations = () => (dispatch)=>{

    nacionalidadServices.getNacionalidades().then((data)=>{
        console.log("DATA", data)
        dispatch(setNations(data))
    }
    )

    
}




export const nacionalidadSlice = createSlice({
    name: "nacionalidad",
    initialState: {
        nations: []
    },
    reducers: {
        setNations: (state, action) => {
            state.nations = action.payload;
        }
    }
}
);

export const { setNations } = nacionalidadSlice.actions;
export default nacionalidadSlice.reducer;

