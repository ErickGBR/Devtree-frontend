import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchUserByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";


/**
 * SearchForm Component
 * A form component that allows users to search for a DevTree profile by handle.
 * Utilizes react-hook-form for form management and validation.
 * Uses react-query's useMutation to handle the search operation.
 * @returns {JSX.Element} The rendered SearchForm component.    
 * 
 * @example
 * <SearchForm />
 * 
 * @component
 * 
 * @see {@link https://react-hook-form.com/|react-hook-form}
 * @see {@link https://tanstack.com/query/latest/docs/react/overview|react-query}
 * 
 * @author Erick Burgos 
 * @version 1.0.0
 * 
 * @license MIT
 * 
 */
function SearchForm() {

    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({defaultValues: { handle: '' } });


    const mutation = useMutation({
        mutationFn: searchUserByHandle
    })
    
    const handle = watch('handle');
    const handleSearch = () => {
        const handleSlug = slugify(handle);
        mutation.mutate(handleSlug);
    }
    return (
        <>

            <form
                onSubmit={handleSubmit(handleSearch)}
                className="space-y-5">
                <div className="relative flex items-center  bg-white  px-2">
                    <label
                        htmlFor="handle"
                    >devtree.com/</label>
                        <input
                        type="text"
                        id="handle"
                        className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                        placeholder="elonmusk, zuck, jeffbezos"
                        {...register("handle", {
                            required: "Un Nombre de Usuario es obligatorio",
                        })}
                    />

                </div>
                {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
                )}

                <div className="mt-10">
                    {mutation.isPending && (
                        <p className="text-center">Searching...</p>
                    )}
                    {mutation.error && (
                        <p className="text-center text-red-500">{(mutation.error as Error).message}</p>
                    )}
                    {mutation.isSuccess && (
                     
                        <p className="text-center text-cyan-500">
                            {mutation.data} go to 
                             <Link to={`/auth/register`} 
                             state={{handle: slugify(handle)}}> register</Link>
                            </p>
                        
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Get my DevTree'
                />
            </form>
        </>
    );
}

export default SearchForm;