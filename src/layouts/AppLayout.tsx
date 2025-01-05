import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const { data, isLoading, error, isError } = useQuery({
        queryFn: getUser,
        /**
         * This option is used to cache the query identified by the key
         */
        queryKey: ['user'],
        /**
         * yoy can use this option to refetch the query a number of times
         */
        retry: 1,
        /**
         * This option is used to prevent the query from refetching when the window tab change not recharge
         */
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <Navigate to="/auth/login" />

    if(data) return <DevTree data={ data }/>
}