  /**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const fs = require('fs');
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return Promise.resolve('https://hola-mundo.com');
    }),
}));

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

describe("Tests with notes's actions", () => {

    beforeEach( () => {
        store = mockStore( initState );
    });

    test('Should start a new note', async () => {
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        const inPayload = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        };

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: inPayload
        });
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: inPayload
        });

        const docId = actions[0].payload.id;
        await deleteDoc( doc( db, `/TESTING/journal/notes/${docId}` ) );
    });
    test('startLoadingNotes should load notes', async () => {
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();
        expect( actions ).toEqual([{
            type: types.notesLoad,
            payload: expect.any(Array)
        }]);
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };
        expect( actions[0].payload[0] ).toMatchObject( expected );
    });
    test('startSaveNote should update the note', async () => {
        const note = {
            id: 'AO50HNZ3fivXfMdpRQo0',
            title: 'This is the new title'
        };
        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.notesUpdated,
            payload: {
                id: note.id,
                note
            }
        });
        const docRef = await getDoc(doc( db, `/TESTING/journal/notes/${note.id}`));
        expect( docRef.data().title ).toBe( note.title );
    });
    test("startUploading should update url of entry", async () => {
        fs.writeFileSync('foto.jpg', '');
        const file = fs.readFileSync('foto.jpg');
        fileUpload.mockReturnValue('https://hola-mundo.com')();
        await store.dispatch( startUploading(file) );
 
        const docRef = await getDoc( doc( db, `/TESTING/journal/notes/AO50HNZ3fivXfMdpRQo0` ) );
        expect( docRef.data().url ).toBe( 'https://hola-mundo.com' );

    });
    
});
