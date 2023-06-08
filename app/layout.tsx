import '../styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

import { SessionProviderProps } from 'next-auth/react';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
};

const RootLayout: React.FC<SessionProviderProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
