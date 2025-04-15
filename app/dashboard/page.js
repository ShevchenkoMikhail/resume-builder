'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/ui/Button';
import AuthGuard from '@/app/components/AuthGuard';

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    const [resumeList, setResumeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загружаем список резюме, когда компонент монтируется
        const fetchResumes = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/resumes');
                if (response.ok) {
                    const data = await response.json();
                    setResumeList(data);
                } else {
                    console.error('Ошибка загрузки резюме');
                }
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user) {
            fetchResumes();
        }
    }, [session]);

    const handleCreateNewResume = () => {
        router.push('/resume/new');
    };

    const handleEditResume = (id) => {
        router.push(`/resume/edit/${id}`);
    };

    const handleDeleteResume = async (id, e) => {
        e.stopPropagation();

        if (!confirm('Вы уверены, что хотите удалить это резюме?')) {
            return;
        }

        try {
            const response = await fetch(`/api/resumes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Обновляем список резюме
                setResumeList(resumeList.filter(resume => resume._id !== id));
            } else {
                alert('Не удалось удалить резюме');
            }
        } catch (error) {
            console.error('Ошибка удаления резюме:', error);
            alert('Не удалось удалить резюме');
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Мои резюме</h1>

                            <Button
                                onClick={handleCreateNewResume}
                                disabled={resumeList.length >= 4}
                            >
                                Создать новое резюме
                            </Button>
                        </div>

                        {resumeList.length >= 4 && (
                            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Вы достигли максимального количества резюме (4). Удалите одно из существующих, чтобы создать новое.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                <p className="mt-2 text-gray-600">Загрузка резюме...</p>
                            </div>
                        ) : resumeList.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">У вас пока нет резюме</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Начните с создания вашего первого резюме.
                                </p>
                                <div className="mt-6">
                                    <Button onClick={handleCreateNewResume}>
                                        Создать первое резюме
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {resumeList.map((resume) => (
                                    <div
                                        key={resume._id}
                                        className="bg-white overflow-hidden shadow-sm rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => handleEditResume(resume._id)}
                                    >
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                                        {resume.personalInfo?.fullName || 'Без имени'}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500 truncate">
                                                        {resume.personalInfo?.profession || 'Без профессии'}
                                                    </p>
                                                    <p className="mt-3 text-xs text-gray-400">
                                                        Последнее обновление: {new Date(resume.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => handleDeleteResume(resume._id, e)}
                                                    className="text-gray-400 hover:text-red-600 focus:outline-none"
                                                    aria-label="Удалить"
                                                >
                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                            <div className="text-sm">
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => handleEditResume(resume._id)}
                                                >
                                                    Редактировать
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}