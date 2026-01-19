import { Link } from "react-router-dom";

function HomeNavigation() {
    return (
        <>
            <Link
                className="text-white p-2 uppercase font-black text-xs cursor-pointer"
                to="/auth/login">
                Login
            </Link>
            <Link
                className="bg-lime-500 text-slate-900 p-2 uppercase font-black text-xs cursor-pointer rounded-lg"
                to="/auth/register">
                Register
            </Link>
        </>
    );
}

export default HomeNavigation;
