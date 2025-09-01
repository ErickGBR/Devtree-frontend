
import { UserHandle, SocialNetwork } from '../types';

type HandleDataProps = {
    data: UserHandle;
}

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.url);
    return (
        <div className='space-y-6 text-white'>
            <p className='text-5xl text-center font-back'> {data.handle} </p>
            {data.image &&
                <img src={data.image} alt="image profile" className="mx-auto max-w-[250px]" />}
            <p className='text-lg text-center font-bold'> {data.description} </p>
            <div className='mt-20 flex flex-col gap-6'>
                {links.length > 0 ?
                    links.map((link) => (
                        <a 
                        key={link.name} 
                        href={link.url} 
                        target='_blank'
                        rel='noopener noreferrer'
                        className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
                            <img src={ `/social/icon_${link.name}.svg` } alt={link.name} className="w-8 h-8" />
                            <p className='text-black capitalize font-bold text-lg'>{link.name}</p>
                        </a>
                    )) : (
                        <p className='text-gray-500'>No links available</p>
                    )}
            </div>
        </div>
    );
}