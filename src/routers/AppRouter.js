import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { login } from '../actions/auth'
import { LoadingScreen } from '../components/auth/LoadingScreen'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged( auth, (user) => {
            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);
                dispatch(startLoadingNotes( user.uid ));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if ( checking ){
        return <LoadingScreen />
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={ AuthRouter } isLoggedIn={ isLoggedIn } />
                    <PrivateRoute exact path="/" component={ JournalScreen } isLoggedIn={ isLoggedIn } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
