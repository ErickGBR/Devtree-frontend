
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import NavigationTabs from "../components/NavigationsTab";
import { useEffect, useState } from "react";
import { SocialNetwork, User } from "../types";
import DevTreeLink from "../components/DevtreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProps = {
    data: User;
}

export default function DevTree({ data }: DevTreeProps) {
    // Initialize state to hold enabled social network links
    const [enableLinks, setEnableLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled));

    // useEffect to set the enabled links based on the data passed
    useEffect(() => {
        setEnableLinks(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled));
    }, [data]);

    const queryClient = useQueryClient();
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (active.id !== over?.id) {
            /**
             * Get the previous and new index of the dragged item
             */
            const prevIndex = enableLinks.findIndex(link => link.id === active.id);
            const newIndex = enableLinks.findIndex(link => link.id === over?.id);


            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => !link.enabled);
            /**
             * Reorder the enabled links
             */
            const order = arrayMove(enableLinks, prevIndex, newIndex);
            setEnableLinks(order);

            const Links = order.concat(disabledLinks);

            /**
             * Update the user data in the query client
             * with the new links order
             */

            queryClient.setQueryData(['user'], (prevData: User | undefined) => {
                return {
                    ...prevData,
                    links: JSON.stringify(Links)
                };
            });
        }

    }

    return (
        <>
            <Header/>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        > View my profile : /{data.handle}</Link>
                    </div>


                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

                            <p className="text-4xl text-center text-white" > {data.handle} </p>
                            {data.image &&
                                <img src={data.image} alt="image profile" className="mx-auto max-w-[250px]" />}

                            <p className="text-white text-center text-lg" > {data.description} </p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="text-white mt-20 flex flex-col gap-5" >
                                    <SortableContext
                                        items={enableLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {
                                            enableLinks.map((link: SocialNetwork) => (
                                                <DevTreeLink
                                                    key={link.name}
                                                    link={link}
                                                />
                                            ))
                                        }
                                    </SortableContext>

                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}