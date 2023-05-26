import { AUTH } from "../action/action.type"

let data=localStorage.getItem('USER_INFO')
if(data){
    data=JSON.parse(data)
    console.log("Data in auth reducer is ::: ",data)
}

const initialState = {
    token:"",
    loginData: data,
    emailData: "",
    passwordData: "",
    // rollTypeData: data,
}
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case AUTH.UPDATE_LOGIN_INFO:
            return {...state, loginData: payload}

        case AUTH.UPDATE_EMAIL:
            return { ...state, emailData: payload }

        case AUTH.UPDATE_PASSWORD:
            return { ...state, passwordData: payload }

        case AUTH.UPDATE_ROLL_TYPE:
            return { ...state, rollTypeData: payload }

        default:
            return state
    }
}

export default authReducer