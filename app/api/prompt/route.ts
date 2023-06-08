import { connectToDB } from '@utils/database'; //we need to connect to the DB so need this function
import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    // const query = Prompt.find();
    try {
        await connectToDB(); //we connect to the db
        const prompts = await Prompt.find({}).populate('creator');
        // const prompts = await query.$where(`this.prompt.includes('piano')`);
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response('Failed to find prompts', { status: 500 });
    }
};
