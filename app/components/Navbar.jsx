'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/app/components/ui/Button';
import LanguageSelector from '@/app/components/LanguageSelector';

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-900">Resume Builder</span>
                        </Link>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            <Link
                                href="/"
                                className="px-3 py-2 text-gray-900 hover:text-blue-600 rounded-md"
                            >
                                Главная
                            </Link>

                            {status === 'authenticated' && (
                                <Link
                                    href="/dashboard"
                                    className="px-3 py-2 text-gray-900 hover:text-blue-600 rounded-md"
                                >
                                    Мои резюме
                                </Link>
                            )}

                            <Link
                                href="/donate"
                                className="px-3 py-2 text-gray-900 hover:text-blue-600 rounded-md"
                            >
                                Поддержать проект
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        {/* Добавляем селектор языка */}
                        <LanguageSelector />

                        {status === 'authenticated' && session?.user ? (
                            <div className="flex items-center">
                                {session.user.image && (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        className="h-8 w-8 rounded-full mr-2"
                                    />
                                )}
                                <span className="mr-3 text-sm text-gray-700">
                  {session.user.name || session.user.email}
                </span>
                                <Button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    variant="outline"
                                    className="text-sm"
                                >
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <Link href="/auth/signin">
                                <Button variant="primary" className="text-sm">
                                    Войти
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        >
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        href="/"
                        className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        Главная
                    </Link>

                    {status === 'authenticated' && (
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Мои резюме
                        </Link>
                    )}

                    <Link
                        href="/donate"
                        className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsOpen(false)}
                    >
                        Поддержать проект
                    </Link>
                </div>

                {/* Добавляем селектор языка в мобильной версии */}
                <div className="pt-2 pb-3 border-t border-gray-200 px-4">
                    <LanguageSelector />
                </div>

                <div className="pt-4 pb-3 border-t border-gray-200">
                    {status === 'authenticated' && session?.user ? (
                        <div className="px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center">
                                {session.user.image && (
                                    <img
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        className="h-8 w-8 rounded-full mr-2"
                                    />
                                )}
                                <div>
                                    <div className="text-base font-medium text-gray-800">
                                        {session.user.name || "Пользователь"}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {session.user.email}
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut({ callbackUrl: '/' });
                                }}
                                variant="outline"
                                className="text-sm"
                            >
                                Выйти
                            </Button>
                        </div>
                    ) : (
                        <div className="px-4 py-2">
                            <Link
                                href="/auth/signin"
                                onClick={() => setIsOpen(false)}
                            >
                                <Button variant="primary" className="w-full text-sm">
                                    Войти
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}