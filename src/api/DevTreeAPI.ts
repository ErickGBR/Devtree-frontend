import { isAxiosError} from "axios";
import api from "../config/axios";

export async function getUser() {
    try {
        const { data } = await api(`/user`)
        localStorage.setItem('AUTH_TOKEN', data.token);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response?.data.message);
        }
    }
}