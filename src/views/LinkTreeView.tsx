import { useState } from 'react';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';

export default function LinkTreeView() {
    const [devTreelinks, setDevTreelinks] = useState(social);
    return (
        <div className="space-y-5">
            {
                devTreelinks.map(item => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                    />
                ))
            }
        </div>
    )
}