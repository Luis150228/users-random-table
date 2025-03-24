import { useEffect, useRef, useState } from "react";
import { usersData } from "../assets/store/users";
import { Result } from "../usersType.d";

export const useUsersData = () => {
    const [dataUsers, setDataUsers] = useState<Result[]>([]);// el donde y el como se va a guardar la data
    const [loading, setLoading] = useState<boolean>(false);// el donde y el como se va a guardar la data de carga
    const [error, setError] = useState<boolean>(false);// el donde y el como se va a guardar la data de error
    const [page, setPage] = useState<number>(1);// el donde y el como se va a guardar la data de la pagina

    const originalUsers = useRef<Result[]>([]);//Declaramos la variable que tendra el estado inicial de Origen sin mutaciones
    const addPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const renewUsers = (data: Result[]) => {
        setDataUsers(data);
    }

    useEffect(() => {// el cuando se va a ejecutar
        setLoading(true);
        const fetchData = async () => {
            try {
                const data = await usersData(page);
                setDataUsers(prevData => 
                    prevData.concat(data)
                );// se guarda la data en el estado
                originalUsers.current = data;// se guarda la data original en este caso los usuarios de inicio sin mutaciones
            } catch (err) {
                setError(true);
                throw new Error(`Error fetching data ${err}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);// el como se va a ejecutar en este caso solo una vez[]
        // console.log(dataUsers);
    return { dataUsers, renewUsers, originalUsers, loading, addPage, error };
};