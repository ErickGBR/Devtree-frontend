/*
important note:
    - This file is just a placeholder for the login view
    - implement the login view as you see fit with Link from the react-router-dom to interact in the same page
*/

import { Link } from "react-router-dom";

export default function LoginView() {
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Login</h1>
            <nav className="mt-10">
                <Link 
                className="text-center text-white text-lg block" 
                to="/auth/register">Register</Link>
            </nav>
        </>
    );
}
