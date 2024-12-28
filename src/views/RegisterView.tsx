
import { Link } from "react-router-dom";

export default function RegisterView() {
    return (
        <div>
            <h1>RegisterView</h1>

            <nav>
                <Link to="/auth/login"> You have an account? Login</Link>
            </nav>
        </div>
    );
}
