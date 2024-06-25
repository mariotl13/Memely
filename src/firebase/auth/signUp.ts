import firebase_app from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);
console.log(auth);

export default async function signUp(email: string, password: string) {
    let result = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}