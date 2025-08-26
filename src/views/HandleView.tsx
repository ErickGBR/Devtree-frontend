

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";

export default function HandleView() {

    const params = useParams();
    const handle = params.handle!

    const { 
    data, error, isLoading
    } = useQuery({
        queryFn: ()=> getUserByHandle(handle),
        queryKey: ['user', handle],
        retry: 1
    })
    
    return (
        <div>
            {/* TODO: Implement HandleView */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {(error as Error).message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}