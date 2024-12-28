/*
important note:
    - This file is just a placeholder for the login view
    - implement the login view as you see fit with Link from the react-router-dom to interact in the same page
*/

import { Link } from "react-router-dom";

export default function LoginView() {
    return (
        <div>
            <h1>LoginView</h1>

            <nav>
                <Link to="/auth/register">Register</Link>
            </nav>
        </div>
    );
}
