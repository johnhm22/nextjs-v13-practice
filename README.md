This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Promptopia - Discovering Next.js 13
![image](https://github.com/johnhm22/nextjs-v13-practice/assets/71333679/1dd7b341-8550-4d52-bdd8-c73d83d25bcb)

## What does it do?
The Promptopia app allows the user to:
* View all prompts from other users - prompt details, user name and email, hashtags for each prompt
* Login via Google
* When logged in, create, edit and delete their own AI prompts along with associated hashtags by sending RESTful api requests to a mongodb cloud database


## Intro
At the time of writing (and developing) Next.js 13 had just recently become available. Having worked previously on a large, complex app using Next.js 12, I was keen to understand the differences and new features. I found this YouTube tutorial that took you through a simple project. I coded along, adding features which I felt added to the learning experience. For example, I used TypeScript and also the axios library for api calls.

Ref.: https://www.youtube.com/watch?v=wm5gMKuwSYk&t=4s

## Tech stack
* Next.js 13 (of course) with TypeScript
* NextAuth.js for authentication using Google as a provider
* MongoDB Atlas deployed in the cloud
* Tailwind CSS

## Getting Started
If you're cloning this repo, simply complete the clone process and then in the terminal run npm install. This will install Next.js and all the dependencies and libraries listed in the package.json file.

Once finished, again in the terminal, you can run the following to get the server up and running.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

I used VS Code and ran it from the built-in terminal.

From the terminal output, you can click on the link to http://localhost:3000 which will open the browser displaying the app home page.

## Further Documentation
As provided by the Next.js team:  
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
