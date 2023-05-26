
import { AUTH } from "./action.type";

export const updateLoginInfo=(loginInfo)=>{
    return{
        type:AUTH.UPDATE_LOGIN_INFO,
        payload:loginInfo
    }
}
export const updateEmail=(email)=>{
    return{
        type:AUTH.UPDATE_EMAIL,
        payload:email
    }
}
export const updatePassword=(password)=>{
    return{
        type:AUTH.UPDATE_PASSWORD,
        payload:password
    }
}
export const updateRollType=(rollType)=>{
    return{
        type:AUTH.UPDATE_ROLL_TYPE,
        payload:rollType
    }
}