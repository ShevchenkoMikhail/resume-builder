import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
    title: 'Конструктор резюме',
    description: 'Создавайте и скачивайте профессиональные резюме',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}