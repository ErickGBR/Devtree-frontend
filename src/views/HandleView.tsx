import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";

import HandleData from "../components/HandleData";

export default function HandleView() {

    const params = useParams();
    const handle = params.handle!

    const {
        data, error, isLoading
    } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['user', handle],
        retry: 1
    })

    return (
        <div>
            {/* TODO: Implement HandleView */}
            {isLoading && <p>Loading...</p>}
            {error && <Navigate to="/404" replace={true} />}
            {data && <HandleData data={data} />}
        </div>
    );
}