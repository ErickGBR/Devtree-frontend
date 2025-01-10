import { isAxiosError} from "axios";
import api from "../config/axios";
import { ProfileForm, User } from "../types";

export async function getUser() {
    try {
        const { data } = await api<User>(`/user`)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}


export async function updateProfile(updateProfile: ProfileForm) {
    try {
        const { data } = await api.patch<String>(`/user`, updateProfile)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}