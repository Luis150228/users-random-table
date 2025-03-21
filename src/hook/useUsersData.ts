import { useEffect, useState } from "react";
import { usersData } from "../assets/store/users";
import { Result } from "../usersType.d";

export const useUsersData = () => {
    const [dataUsers, setDataUsers] = useState<Result[]>([]);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await usersData();
                    setDataUsers(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []);
        // console.log(dataUsers);
    return { dataUsers, setDataUsers };
};