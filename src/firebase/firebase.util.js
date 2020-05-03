import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxaf9eRCnCVbSnOg_oWHQxosJ6d-OoCKA",
    authDomain: "crwn-marketing.firebaseapp.com",
    databaseURL: "https://crwn-marketing.firebaseio.com",
    projectId: "crwn-marketing",
    storageBucket: "crwn-marketing.appspot.com",
    messagingSenderId: "95856836261",
    appId: "1:95856836261:web:43fc91732744d5d724974c"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userRef;

}
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
