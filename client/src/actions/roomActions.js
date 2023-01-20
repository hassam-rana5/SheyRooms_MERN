// Importing
import axios from 'axios';

// All actions regarding to rooms
export const getAllRooms=()=>async dispatch=>{
    dispatch({type:'GET_ROOMS_REQUEST'})

    try {
        const response = await axios.get('/api/rooms/getallrooms')
        console.log(response)
        dispatch({type:'GET_ROOMS_SUCCESS',payload:response.data})
    } catch (error) {
        dispatch({type:'GET_ROOMS_FAILED',payload:error})
    }
}