import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Login.css';
import googleIcon from '../../images/google.png';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // const onSubmit = data => console.log(data);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });
    const googleSignIn = () => {
        var gProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(gProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        else if (event.target.name === 'password') {
            const isPassValid = event.target.value.length > 6;
            const isPassHasNum = /\d{1}/.test(event.target.value);
            isFieldValid = isPassHasNum && isPassValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { displayName, email } = res.user;
                    const signInUser = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        photo: '',
                        success: true,
                    }
                    setUser(signInUser);
                    setLoggedInUser(signInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    const newUserInfo = {}
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    alert(errorMessage);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                });
        }
        else{
            alert("Wrong password or email");
        }
        event.preventDefault();
    }
    return (
        <div className ='container login-page'>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required />
                    <br />
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
                    <br />
                    <button className='loginBtn' type="submit">Login</button>
                </form>
                <p>New user ? <span><Link to='/createAccount'>Create Account</Link></span> </p>
            </div>
            <p>or</p>
            <button className='googleBtn' onClick={googleSignIn}><span><img className='google-icon' src={googleIcon}></img></span>Continue with Google</button>
        </div>
    );
};

export default Login;