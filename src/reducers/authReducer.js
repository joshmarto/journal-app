import { types } from "../types/types";

/*
 * 
 * @param {*} state 
 * @param {*} action 
 * 
 * {
 *      uid: 8642,
 *      name: 'Josue'
 * }
 */

export const authReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };
        case types.logout:
            return { };
        default:
            return state;
    }
}