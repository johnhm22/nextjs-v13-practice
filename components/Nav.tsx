'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    signIn,
    signOut,
    useSession,
    getProviders,
    LiteralUnion,
    ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// For info....
// export interface ClientSafeProvider {
//     id: LiteralUnion<BuiltInProviderType>
//     name: string
//     type: ProviderType
//     signinUrl: string
//     callbackUrl: string
//   }

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>();

    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            //below we are setting the state for providers
            setProviders(response);
        };
        setUpProviders();
    }, []);

    const handleSignOut = () => {
        signOut({ callbackUrl: 'http://localhost:3000' });
    };

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    alt="app logo"
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                width={37}
                                height={37}
                                alt="profile image"
                                src={session.user.image!}
                                className="rounded-full"
                                onClick={() => {
                                    setToggleDropdown(
                                        (prevState) => !prevState
                                    );
                                }}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            width={37}
                            height={37}
                            alt="profile image"
                            src={session.user.image!}
                            className="rounded-full"
                            onClick={() => {
                                setToggleDropdown((prevState) => !prevState);
                            }}
                        />
                        {toggleDropdown && (
                            <>
                                <div className="dropdown">
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                        }}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                        }}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                        className="mt-5 w-full black_btn"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
