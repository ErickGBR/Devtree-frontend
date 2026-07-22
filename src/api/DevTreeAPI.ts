import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, SearchType } from "../types";

function handleApiError(error: unknown): never {
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response?.data?.error || 'Request failed');
    }
    if (isAxiosError(error) && error.request) {
        throw new Error('Network error: Unable to reach the server');
    }
    throw new Error('An unexpected error occurred');
}

export async function getUser() {
    try {
        const { data } = await api<User>(`/user`)
        return data;
    } catch (error) {
        handleApiError(error);
    }
}


export async function updateProfile(profileData: User) {
    try {
        const { data } = await api.patch<string>(`/user`, profileData);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}


export async function uploadImage(file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await api.post<{ image: string }>(`/user/image`, formData)
        return data
    } catch (error) {
        handleApiError(error);
    }
}


export async function getUserByHandle(handle: string) {
    try {
        const sanitizedHandle = encodeURIComponent(handle);
        const { data } = await api.get(`/${sanitizedHandle}`);
        return data;
    } catch (error) {
        handleApiError(error);
    }
}


export async function searchUserByHandle(handle: string) {
    try {
        const { data } = await api.post<SearchType>(`/search`, { handle });
        return data.message
    } catch (error) {
        handleApiError(error);
    }
}