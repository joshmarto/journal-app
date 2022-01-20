import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui';
import { cleanNotes } from '../actions/notes';
import Swal from 'sweetalert2';

export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {
        const auth = getAuth();
        dispatch( startLoading() );
        return signInWithEmailAndPassword( auth, email, password )
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            })
            .catch( e => {
                // console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            });
        /*  dispatch( startLoading() );
            setTimeout(() => {
                dispatch( login(123, 'Pedro') );
                dispatch( finishLoading() );
            }, 3500); */
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        const auth = getAuth();
        dispatch( startLoading() );
        createUserWithEmailAndPassword( auth, email, password )
            .then( async ({user}) => {
                await updateProfile( user, { displayName: name });
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );
            })
            .catch( e => {
                // console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider ).then( ({ user }) => {
            dispatch(
                login( user.uid, user.displayName )
            );
        });
    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
});

export const startLogout = () => {
    return ( async (dispatch) => {
        const auth = getAuth();
        signOut(auth);
        dispatch( logout() );
        dispatch( cleanNotes() );
    });
}

export const logout = () => ({
    type: types.logout
})
