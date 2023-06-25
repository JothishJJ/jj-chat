import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
        
        if(user.displayName && user.email && user.photoURL) {
          const userRef = doc(firestore, `users/${user.uid}`);
          const userData: User = {
              username: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
          }
        
          setDoc(userRef, userData, { merge: true });
        }
    })
    .catch(err => {
        alert(err.message);
    });
}
