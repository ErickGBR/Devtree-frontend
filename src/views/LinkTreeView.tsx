import { useEffect, useState } from 'react';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';
import { isValidUrl } from '../utils';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/DevTreeAPI';
import { SocialNetwork, User } from '../types';

export default function LinkTreeView() {
    const [devTreelinks, setDevTreelinks] = useState(social);
    const queryClient = useQueryClient();

    const user: User = queryClient.getQueryData(['user'])!;

    console.log('LinkTreeView user data ------ ', JSON.parse(user.links));
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    useEffect(() => {
        const updatedData = devTreelinks.map(item => {
            const existingLink = JSON.parse(user.links).find((link => link.name === item.name));
            if (existingLink) {
                return {
                    ...item,
                    url: existingLink.url,
                    enabled: existingLink.enabled
                };
            }
            return item;
        });
        setDevTreelinks(updatedData);
    }, []);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreelinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreelinks(updatedLinks);
        queryClient.setQueryData(['user'], (prevData: User) => {
            if (prevData) {
                return {
                    ...prevData,
                    links: JSON.stringify(updatedLinks)
                }
            }
            return prevData;
        }
        );
    }

    const links: SocialNetwork[] = JSON.parse(user.links);

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreelinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url) || link.url === '') {
                    return { ...link, enabled: !link.enabled };
                } else {
                    toast.error(`Please enter a valid URL for ${link.name}`);
                }
            }
            return link;
        });
        setDevTreelinks(updatedLinks);

        let updatedItems: SocialNetwork[] = [];
        const selectedSocialNetworks = updatedLinks.find(link => link.name === socialNetwork);

        if (selectedSocialNetworks?.enabled) {
            toast.error(`Please enter a valid URL for ${selectedSocialNetworks.name}`);
            const newItem = {
                ...selectedSocialNetworks,
                id: links.length + 1,
            }
            updatedItems = [...links, newItem];

        } else {

        }
        console.log('updatedLinks links to save db --------------', updatedLinks);

        queryClient.setQueryData(['user'], (prevData: User) => {
            if (prevData) {
                return {
                    ...prevData,
                    links: JSON.stringify(updatedLinks)
                }
            }
            return prevData;
        }
        );
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
            <button
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
                onClick={() => mutate(user)}
            > Save</button>
        </div>
    )
}