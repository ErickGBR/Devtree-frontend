
import { Link } from "react-router-dom";

export default function RegisterView() {
    return (
        <div>
            <h1 className="text-4xl text-white font-bold">RegisterView</h1>
            <nav className="mt-10">
                <Link 
                className="text-center text-white text-lg block" 
                to="/auth/login">
                     You have an account? Login
                     </Link>
            </nav>
        </div>
    );
}
