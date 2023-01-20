export const getAllRoomReducers = (state={},action)=>{
    switch (action.type) {
        case 'GET_ROOMS_REQUEST':
            return {
                ...state
            }
        
        case 'GET_ROOMS_SUCCESS':
            return {
                rooms:action.payload
            }
        
        case 'GET_ROOMS_FAILED':
            return {
                error:action.payload
            }
        
        default:
            return state
    }
}