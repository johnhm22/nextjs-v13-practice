import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

interface INewProfile {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    locale: string;
    iat: number;
    exp: number;
}

const handler: NextAuthOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user!.email,
            });

            session.user!.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            console.log('profile: ', profile);
            try {
                await connectToDB();
                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile!.email,
                });

                console.log('userExists: ', userExists);
                //if not, create a new user and save to the database
                if (!userExists && profile) {
                    await User.create({
                        email: profile.email,
                        username: profile!.name!.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.log('ERROR is: ', error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
