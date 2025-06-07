import { useState } from 'react';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';
import { isValidUrl } from '../utils';
import { toast } from 'sonner';

export default function LinkTreeView() {
    const [devTreelinks, setDevTreelinks] = useState(social);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreelinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreelinks(updatedLinks);
    }

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreelinks.map(link => {
            if (link.name === socialNetwork) {
                if(isValidUrl(link.url) || link.url === '') {
                    return { ...link, enabled: !link.enabled };
                }else {
                    toast.error(`Please enter a valid URL for ${link.name}`);
                }  
            }
            return link;
        });
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
                        handleEnableLink={handleEnableLink}
                    />
                ))
            }
        </div>
    )
}