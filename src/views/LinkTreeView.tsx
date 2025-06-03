import { useState } from 'react';
import { social } from '../data/social';
export default function LinkTreeView() {

    const [devTreelinks, setDevTreelinks] = useState(social);
    
    return (
        <div>
            <h1>LinkTreeView</h1>
        </div>
    )
}