import { connectToDB } from '@utils/database'; //we need to connect to the DB so need this function
import Prompt from '@models/prompt';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }) => {
    const { userId } = params;
    try {
        await connectToDB(); //we connect to the db
        const userPrompts = await Prompt.find({ creator: userId }).populate(
            'creator'
        );
        return new Response(JSON.stringify(userPrompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to find prompts for user', { status: 500 });
    }
};
