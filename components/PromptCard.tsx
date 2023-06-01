'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { IPost } from '@utils/interfaces';

interface IProps {
    post: IPost;
    image: string;
    username: string;
    email: string;
    handleTagClick: (e: React.MouseEvent) => void;
    handleEdit: () => void;
    handleDelete: () => void;
}

const PromptCard: React.FC<IProps> = ({
    post,
    image,
    username,
    email,
    handleTagClick,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {email}
                        </p>
                    </div>

                    {/* <p>{post}</p> */}
                </div>
            </div>
        </div>
    );
};

export default PromptCard;
