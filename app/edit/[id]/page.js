'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResumeForm from '@/app/components/ResumeForm';
import ResumePreview from '@/app/components/ResumePreview';
import Button from '@/app/components/ui/Button';

export default function EditResume({ params }) {
    const router = useRouter();
    const { id } = params;

    // Состояние для хранения данных резюме
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка данных резюме
    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/resumes/${id}`);

                if (!response.ok) {
                    throw new Error('Резюме не найдено');
                }

                const data = await response.json();
                setResumeData(data);
            } catch (error) {
                console.error('Ошибка загрузки резюме:', error);
                setError(error.message || 'Не удалось загрузить резюме');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchResume();
        }
    }, [id]);

    // Обновление данных резюме
    const handleResumeUpdate = (data) => {
        setResumeData(data);
    };

    // Сохранение резюме
    const handleSaveResume = async (data) => {
        const response = await fetch(`/api/resumes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Не удалось обновить резюме');
        }

        return await response.json();
    };

    // Возвращаемся на главную страницу
    const handleBackToHome = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-gray-600">Загрузка резюме...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
                        <h1 className="text-2xl font-bold text-red-600 mb-2">Ошибка</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button onClick={handleBackToHome}>
                            Вернуться на главную
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!resumeData) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Редактирование резюме</h1>
                    <Button
                        variant="outline"
                        onClick={handleBackToHome}
                    >
                        Вернуться на главную
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Форма для ввода данных */}
                    <div>
                        <ResumeForm
                            initialData={resumeData}
                            onUpdate={handleResumeUpdate}
                            onSave={handleSaveResume}
                        />
                    </div>

                    {/* Предпросмотр резюме */}
                    <div className="lg:sticky lg:top-8 self-start">
                        <ResumePreview resume={resumeData} />
                    </div>
                </div>
            </div>
        </main>
    );
}