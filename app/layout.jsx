import { ClientProvider } from '@/lib/context/ClientContext';
import localFont from 'next/font/local';
import "@/scss/global.scss";
import Header from '@/components/header/server/Header';
import Footer from '@/components/footer/server/Footer';
import Notification from '@/components/notification/client/Notification';
const manrope = localFont({
    src: [
        { 
            path: "../public/fonts/Manrope-Thin.woff2",
            weight: '200',
            style: 'normal'
        },
        { 
            path: "../public/fonts/Manrope-Light.woff2",
            weight: '300',
            style: 'normal'
        },
        { 
            path: "../public/fonts/Manrope-Regular.woff2",
            weight: '400',
            style: 'normal'
        }
    ]
});

export const metadata = {
    title: "TopAttraction",
    description: "Достопримечательности Краснодарского края",
};


export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={manrope.className}>
                <ClientProvider>
                    <Header/>
                    <Notification/>
                    <main>
                        {children}
                    </main>
                    <Footer/>
                </ClientProvider>
            </body>
        </html>
    );
}
