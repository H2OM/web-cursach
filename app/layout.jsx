import { ClientProvider } from '@/lib/context/ClientContext';
import localFont from 'next/font/local';
import "@/scss/global.scss";
import Header from '@/components/header/server/Header';
import Footer from '@/components/footer/server/Footer';
import Notification from '@/lib/basecomponents/notification/Notification';
import Favmenu from '@/lib/basecomponents/favmenu/favmenu';
import SearchMenu from '@/lib/basecomponents/searchmenu/searchmenu';
import Voteform from '@/components/voteform/client/Voteform';
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
                    <Favmenu/>
                    <SearchMenu/>
                    <Notification/>
                    <main>
                        {children}
                    </main>
                    <Voteform/>
                    <Footer/>
                </ClientProvider>
            </body>
        </html>
    );
}
