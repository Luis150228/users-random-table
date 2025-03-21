import { useEffect, useState } from "react";
import { usersData } from "../assets/store/users";
import { Result } from "../usersType.d";

export const useUsersData = () => {
    const [dataUsers, setDataUsers] = useState<Result[]>([]);// el donde y el como se va a guardar la data

    const renewUsers = (data: Result[]) => {
        setDataUsers(data);
    }
        useEffect(() => {// el cuando se va a ejecutar
            const fetchData = async () => {
                try {
                    const data = await usersData();
                    setDataUsers(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []);// el como se va a ejecutar en este caso solo una vez[]
        // console.log(dataUsers);
    return { dataUsers, renewUsers };
};