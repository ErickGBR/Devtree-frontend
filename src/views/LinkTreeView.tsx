import { useState } from 'react';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';

export default function LinkTreeView() {
    const [devTreelinks, setDevTreelinks] = useState(social);

    const handleUrlChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreelinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} :link )
        setDevTreelinks(updatedLinks);
    }
    return (
        <div className="space-y-5">
            {
                devTreelinks.map(item => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                    />
                ))
            }
        </div>
    )
}