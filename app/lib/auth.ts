import { 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup, 
    updateProfile,
    signOut
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

import { redirect } from "next/navigation";

type User = {
    username: string,
    email: string,
    photoUrl: string
}

export const signUpWithEmailAndPassword = async(email: string, password: string, username: string) => {
    await createUserWithEmailAndPassword(auth, email, password) 
    .then(async result => {
        await updateProfile(result.user, {displayName: username})
        updateUser(result.user);
    })
    .catch(err => {
        alert(err.message);
    })
}

export const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    .then((result) => {
        updateUser(result.user);
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

export const LogOut = async() => {
    await signOut(auth)
    .then(() => {
        redirect("/");
    })
    .catch(err => {
        alert(err.message);
    })
}
