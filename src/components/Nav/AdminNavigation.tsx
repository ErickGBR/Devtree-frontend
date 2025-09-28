
import { useQueryClient } from "@tanstack/react-query";


function AdminNavigation() {

    const queryClient = useQueryClient();


    const logout = async () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.invalidateQueries({ queryKey: ['user'] });
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