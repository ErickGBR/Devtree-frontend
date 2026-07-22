
import { AUTH_TOKEN_KEY } from '../../utils';


function AdminNavigation() {

    const logout = async () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        window.location.reload();
    };


    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Logout
        </button>
    );
}

export default AdminNavigation;