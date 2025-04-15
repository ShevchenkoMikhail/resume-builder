'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import languages from '@/app/messages/languages';

export default function LanguageSelector() {
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useState('ru'); // По умолчанию русский

    // При монтировании компонента загружаем выбранный язык из куки
    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage') || 'ru';
        setCurrentLanguage(savedLanguage);
    }, []);

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setCurrentLanguage(newLanguage);

        // Сохраняем выбранный язык в куки для сохранения между сессиями
        Cookies.set('selectedLanguage', newLanguage, { expires: 365 }); // Сохраняем на год

        // Перезагрузка страницы для применения изменений
        window.location.reload();
    };

    return (
        <div className="relative">
            <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                {Object.values(languages).map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
}