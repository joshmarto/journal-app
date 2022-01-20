import { authReducer } from "../../reducers/authReducer";

describe('Tests with authReducer', () => {
    const userTest = {
        uid: 8642,
        displayName: 'Josue'
    };
    const initialState = {
        user: null,
    };

    test('Should return a new state', () => {
        const action = {
            type: "[Auth] Login",
            payload: userTest
        };
        const newState = authReducer( initialState, action );

        expect( newState ).toEqual({
            uid: 8642,
            name: 'Josue'
        })
    });
    test('Should return an empty state', () => {
        const action = {
            type: "[Auth] Logout",
        };
        const newState = authReducer( initialState, action );

        expect( newState ).toEqual({ });
    });
    test('Should return the default state', () => {
        const action = {
            type: "[Unknown] Type",
            payload: 'Nothing',
        };
        const newState = authReducer( initialState, action);

        expect( newState ).toEqual( initialState );
    })
    
});
