import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login, logout, startLoginEmailPassword } from "../../actions/auth";
import { types } from "../../types/types";
import { startLogout } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING',
        name: 'James'
    },
    notes: {
        notes: [{
            id: 'AO50HNZ3fivXfMdpRQo0',
            title: 'This is the new title',
            body: 'A resume of what happened today between ideas and more stuff',
            url: ''
        }],
        active: {
            id: 'AO50HNZ3fivXfMdpRQo0',
            title: 'This is the new title',
            body: 'A resume of what happened today between ideas and more stuff',
            url: ''
        }
    }
};
let store = mockStore( initState );

describe('Tests with auth actions', () => {
    beforeEach( () => {
        store = mockStore( initState );
    });

    test('Login & Logout should create the respective action', () => {
        const { uid, name: displayName } = initState.auth;
        const expectedLogin = {
            type: types.login,
            payload: {
                uid,
                displayName
            }
        };
        const expectedLogout = {
            type: types.logout,
        };

        const actionLogin = store.dispatch( login( uid, displayName ) );
        const actionLogout = store.dispatch( logout() );

        expect( actionLogin ).toEqual( expectedLogin );
        expect( actionLogout ).toEqual( expectedLogout );
    });
    test('startLogout should execute logout', async () => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.logout
        });
        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });
    test('Should run startLoginEmailPassword', async () => {
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456ab' ) );
        const actions = store.getActions();
        const expectedAction = {
            type: types.login,
            payload: {
                uid: 'XLqu2emjx6UBtdqQqdMrQFkt3YB2',
                displayName: null
            }
        };
        expect( actions[1] ).toEqual( expectedAction );
    });
    
});
