import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

type User = {
    username: string,
    email: string,
    photoUrl: string
}

export const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        updateUser(user);
    })
    .catch(err => {
        alert(err.message);
    });
}

/** 
 * @function updateUser
 * This function creates a firestore document for the user
 * @param user - The firebase user who signed in
*/
const updateUser = (user: any) => {
    if(user.displayName && user.email) {
        const userRef = doc(firestore, `users/${user.uid}`);
        const firstLetter: string = user.displayName.charAt(0);
        
        const userData: User = {
            username: user.displayName,
            email: user.email,
            photoUrl: user.photoURL ? user.photoURL : `https://dummyimage.com/200x200/000000/ffffff&text=${firstLetter}`,
        }
        
        setDoc(userRef, userData, {merge: true})
    }
}

export const logOut = async() => {
    await signOut(auth)
    .then(() => {
        window.location.href = "/";
    })
    .catch(err => {
        alert(err.message);
    })
}
