import { isAxiosError} from "axios";
import api from "../config/axios";

export async function getUser() {
    try {
        const getToken = localStorage.getItem('AUTH_TOKEN');
        const { data } = await api(`/user`,{
            headers: {
                Authorization: `Bearer ${getToken}`
            }
        })
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}