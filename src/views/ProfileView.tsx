import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessage"
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description,
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })


    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.setQueryData(['user'], (prevData: User) => {
                if (prevData) {
                    return {
                        ...prevData,
                        image: data.image
                    }
                }
                return prevData;
            }
            );
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadImageMutation.mutate(e.target.files[0]);

        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user: User = queryClient.getQueryData(['user'])!;
        user.description = formData.description;
        user.handle = formData.handle;
        updateProfileMutation.mutate(user);
    }

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {
                    ...register('handle', {
                        required: 'The handle is required'
                    })
                    }

                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                > Description :</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {
                    ...register('description', {
                        required: 'The description is required'
                    })
                    }
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Save Changes'
            />
        </form>
    )
}
