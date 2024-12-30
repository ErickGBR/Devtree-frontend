
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import type  { Registerform } from "../types";
import axios from "axios";
export default function RegisterView() {

    const initialValiues: Registerform = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    };
    const { register, watch, handleSubmit, formState: { errors } } = useForm(
        { defaultValues: initialValiues }
    );
    const password = watch('password');

    const handleRegister = async (formData: Registerform) => {
        console.log("desde handle register ", formData);

        try {
            const response = await axios.post('http://localhost:4000/auth/register', formData)
            console.log("response", response);
            
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-white font-bold">RegisterView</h1>


            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name',
                            {
                                required: "Name is mandatory"
                            }
                        )
                        }
                    />
                    {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email of register"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email',
                            {
                                required: "email is mandatory ",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            }
                        )}
                    />
                    {errors.email && <ErrorMessage> {errors.email.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="User name: not spaces, no special characters"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle',
                            { required: "handle is mandatory " }
                        )}
                    />
                    {errors.handle && <ErrorMessage> {errors.handle.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password of register"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password',
                            {
                                required: "password is mandatory ",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            }
                        )}
                    />
                    {errors.password && <ErrorMessage> {errors.password.message} </ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation',
                            { required: "password_confirmation is mandatory",
                                validate: value => value === password || "The passwords do not match"
                             }
                        )}
                    />
                    {errors.password_confirmation && <ErrorMessage> {errors.password_confirmation.message} </ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Create account'
                />
            </form>


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
