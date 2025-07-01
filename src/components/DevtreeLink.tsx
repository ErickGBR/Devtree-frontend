
import { SocialNetwork } from "../types";

type DevTreeLinkProps = {
    link: SocialNetwork;
}

/** * DevTreeLink component to display a single social network link
 * @param {DevTreeLinkProps} props - The properties for the DevTreeLink component
 * @returns {JSX.Element} - The rendered DevTreeLink component
 */

export default function DevTreeLink({ link }: DevTreeLinkProps) {
    return (
        <li className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
            <div
                className='w-12 h-12 bg-cover'
                style={{ backgroundImage: `url(/social/icon_${link?.name}.svg)` }}
            ></div>
            <p className="capitalize text-black"> Follow: <span className="font-black"> {link.name} </span></p>
        </li>
    );
}