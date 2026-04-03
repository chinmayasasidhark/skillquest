import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfr2E0CeGBbBVZF8SmWClrihvED-Ndmbg",
    authDomain: "skillquest-7906d.firebaseapp.com",
    projectId: "skillquest-7906d",
    appId: "1:685354848708:web:1ba3825bb04cbcd9a31491",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
