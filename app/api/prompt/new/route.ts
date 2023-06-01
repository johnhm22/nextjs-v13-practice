// import { NextApiRequest, NextApiResponse } from 'next';

// import { connectToDB } from '@utils/database'; //we need to connect to the DB so need this function
// import Prompt from '@models/prompt';

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { userId, prompt, tag } = req.body;

//     try {
//         await connectToDB(); //we connect to the db and then create a new prompt
//         //here we need to call the model for the prompt which we still need to create
//         const newPrompt = new Prompt({
//             creator: userId,
//             prompt,
//             tag,
//         });
//         await newPrompt.save();
//         return res.status(201).send(newPrompt);
//     } catch (error) {
// console.log("Error: ", error);
// }
// };

import { connectToDB } from '@utils/database'; //we need to connect to the DB so need this function
import Prompt from '@models/prompt';

export const POST = async (req: Request, res: Response) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB(); //we connect to the db and then create a new prompt
        //here we need to call the model for the prompt which we still need to create
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
    }
};
