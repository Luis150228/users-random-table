import { Result } from "../../usersType.d";

const URL_USERS = 'https://randomuser.me/api/?results=5&seed=dataUsers';

export const usersData = async (page:number): Promise<Result[]> => {
    try {
        const call = await fetch(`${URL_USERS}&page=${page}`);
        if (!call.ok) {
            throw new Error("Validar el URL de la API");
        }
        const dataFull = await call.json();
        const data: Result[] = dataFull.results;
        return data;
    } catch (err) {
        throw new Error(`falla en API ${err}`); // Lanza el error para manejarlo en el componente que llama a esta función
    }
};