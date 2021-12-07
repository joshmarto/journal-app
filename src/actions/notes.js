import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import fileUpload from '../helpers/fileUpload';
import loadNotes from '../helpers/loadNotes';
import Swal from 'sweetalert2';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const doc = await addDoc( collection(db, `${uid}/journal/notes`), newNote );
        // console.log( doc );
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote) );
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
      const {uid} = getState().auth;
   
      if(!note.url){
        delete note.url;
      }
   
      const noteToFirestore = {...note};
      delete noteToFirestore.id;
      const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
      await updateDoc(noteRef,noteToFirestore);

      dispatch( refreshNote( note.id, note ) );
      Swal.fire('Saved', note.title, 'success');
    }
  };

  export const refreshNote = ( id, note ) => ({
      type: types.notesUpdated,
      payload: { id, note }
  });

export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const { active: note } = getState().notes;
        const fileUrl = await fileUpload( file );
        
        note.url = fileUrl;
        
        dispatch( startSaveNote( note ) );
        dispatch( refreshNote( note.id, note ) );
    }
};

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        const noteRef = doc(db, `${uid}/journal/notes/${id}`);
        await deleteDoc( noteRef );

        Swal.fire({
            title: 'Deleting',
            text: 'Deleting note...',
            icon: 'error'
        });
        dispatch( deleteNote( id ) );
    }
};

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const cleanNotes = () => ({
    type: types.notesLogoutCleaning
});
