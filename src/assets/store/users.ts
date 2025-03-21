import { Result } from "../../usersType.d";

const URL_USERS = 'https://randomuser.me/api/?results=100';

export const usersData = async (): Promise<Result[]> => {
    try {
        const call = await fetch(URL_USERS);
        const dataFull = await call.json();
        const data: Result[] = dataFull.results;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};