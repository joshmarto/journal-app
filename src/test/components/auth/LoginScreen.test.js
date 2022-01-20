import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureStore from "redux-mock-store";
import { configure, mount } from 'enzyme';
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        loading: false
    },
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

describe('Tests in <LoginScreen />', () => {
    test('Should display properly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen />
                </MemoryRouter>
            </Provider>
        );

        //expect( wrapper ).toMatchSnapshot();
    });
    
});
