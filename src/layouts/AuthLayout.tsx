/*
    This layout is used to render the login and register pages.
    Outlets are used to render the children of the AuthLayouts component.
    The children of the AuthLayouts component are the LoginView and RegisterView components.
*/
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/logo";

export default function AuthLayouts() {
    return (
        <>
            <div className="bg-slate-800 min-h-screen">
                <div className="max-w-lg mx-auto pt-10 px-5">
                    <Logo />
                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Toaster position="top-right" />
        </>
    );
}