'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ResumeForm from '@/app/components/ResumeForm';
import ResumePreview from '@/app/components/ResumePreview';
import Button from '@/app/components/ui/Button';
import Navbar from '@/app/components/Navbar';

export default function Dashboard() {
    const router = useRouter();
    const { data: session } = useSession();

    // Состояние для хранения данных резюме
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            photoUrl: '',
            profession: '',
            summary: ''
        },
        education: [],
        experience: [],
        skills: [],
        languages: [],
        interests: [],
        template: 'standard',
        templateSettings: {
            primaryColor: '#3b82f6',
            secondaryColor: '#f3f4f6',
            fontFamily: 'Inter',
        }
    });

    // Состояние для хранения списка сохраненных резюме
    const [savedResumes, setSavedResumes] = useState([]);
    const [savedResumeId, setSavedResumeId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showResumeList, setShowResumeList] = useState(false);

    // Загрузка списка резюме при загрузке страницы
    useEffect(() => {
        if (!session) return;

        const loadResumes = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/resumes');
                if (response.ok) {
                    const resumes = await response.json();
                    setSavedResumes(resumes);

                    // Если есть хотя бы одно резюме, загружаем последнее
                    if (resumes.length > 0) {
                        const lastResume = resumes[0]; // Последнее созданное резюме
                        setResumeData(lastResume);
                        setSavedResumeId(lastResume._id);
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки резюме:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadResumes();
    }, [session]);

    // Обновление данных резюме
    const handleResumeUpdate = (data) => {
        setResumeData(data);
    };

    // Сохранение резюме
    const handleSaveResume = async (data) => {
        // Если есть ID, обновляем существующее резюме, иначе создаем новое
        const url = savedResumeId
            ? `/api/resumes/${savedResumeId}`
            : '/api/resumes';

        const method = savedResumeId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Не удалось сохранить резюме');
            }

            const savedResume = await response.json();
            setSavedResumeId(savedResume._id);

            // Обновляем список резюме
            const resumesResponse = await fetch('/api/resumes');
            if (resumesResponse.ok) {
                const resumes = await resumesResponse.json();
                setSavedResumes(resumes);
            }

            return savedResume;
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            throw error;
        }
    };

    // Создать новое резюме
    const handleCreateNewResume = () => {
        // Сбрасываем данные и ID
        setResumeData({
            personalInfo: {
                fullName: '',
                email: '',
                phone: '',
                address: '',
                photoUrl: '',
                profession: '',
                summary: ''
            },
            education: [],
            experience: [],
            skills: [],
            languages: [],
            interests: [],
            template: 'standard',
            templateSettings: {
                primaryColor: '#3b82f6',
                secondaryColor: '#f3f4f6',
                fontFamily: 'Inter',
            }
        });
        setSavedResumeId(null);
        setShowResumeList(false);
    };

    // Редактировать существующее резюме
    const handleEditResume = (resume) => {
        setResumeData(resume);
        setSavedResumeId(resume._id);
        setShowResumeList(false);
    };

    // Удалить резюме
    const handleDeleteResume = async (id, e) => {
        e.stopPropagation(); // Предотвращаем всплытие события

        if (!confirm('Вы уверены, что хотите удалить это резюме?')) {
            return;
        }

        try {
            const response = await fetch(`/api/resumes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Обновляем список резюме
                const updatedResumes = savedResumes.filter(resume => resume._id !== id);
                setSavedResumes(updatedResumes);

                // Если удалили текущее резюме, сбрасываем его
                if (savedResumeId === id) {
                    if (updatedResumes.length > 0) {
                        setResumeData(updatedResumes[0]);
                        setSavedResumeId(updatedResumes[0]._id);
                    } else {
                        handleCreateNewResume();
                    }
                }
            } else {
                alert('Не удалось удалить резюме');
            }
        } catch (error) {
            console.error('Ошибка удаления резюме:', error);
            alert('Не удалось удалить резюме');
        }
    };

    // Обновление шаблона резюме
    const handleUpdateTemplate = (templateId) => {
        const updatedResumeData = {
            ...resumeData,
            template: templateId
        };
        setResumeData(updatedResumeData);
        handleSaveResume(updatedResumeData);
    };

    // Обновление настроек шаблона
    const handleUpdateTemplateSettings = (type, value) => {
        const updatedResumeData = {
            ...resumeData,
            templateSettings: {
                ...resumeData.templateSettings,
                [type]: value
            }
        };
        setResumeData(updatedResumeData);
        handleSaveResume(updatedResumeData);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Мои резюме</h1>

                        <div className="flex gap-4 mt-4 md:mt-0">
                            <Button
                                onClick={handleCreateNewResume}
                                variant="secondary"
                                disabled={savedResumes.length >= 4}
                            >
                                Создать новое резюме
                            </Button>

                            <Button
                                onClick={() => setShowResumeList(!showResumeList)}
                                variant="outline"
                            >
                                {showResumeList ? 'Скрыть сохраненные' : 'Показать сохраненные'}
                            </Button>
                        </div>
                    </div>

                    {/* Предупреждение о максимальном количестве резюме */}
                    {savedResumes.length >= 4 && (
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

                    {/* Список сохраненных резюме */}
                    {showResumeList && (
                        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Ваши резюме</h2>

                            {isLoading ? (
                                <p className="text-center py-4">Загрузка...</p>
                            ) : savedResumes.length === 0 ? (
                                <p className="text-center py-4 text-gray-500">У вас еще нет сохраненных резюме</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedResumes.map((resume) => (
                                        <div
                                            key={resume._id}
                                            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${savedResumeId === resume._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                            onClick={() => handleEditResume(resume)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">
                                                        {resume.personalInfo?.fullName || 'Без имени'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {resume.personalInfo?.profession || 'Без профессии'}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Обновлено: {new Date(resume.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={(e) => handleDeleteResume(resume._id, e)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    title="Удалить резюме"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative h-[calc(100vh-200px)]">
                        {/* Форма для ввода данных с отдельной прокруткой */}
                        <div className="overflow-y-auto pr-2 h-full pb-4">
                            <ResumeForm
                                initialData={resumeData}
                                onUpdate={handleResumeUpdate}
                                onSave={handleSaveResume}
                            />
                        </div>

                        {/* Предпросмотр резюме с отдельной прокруткой */}
                        <div className="overflow-y-auto pl-2 h-full pb-4">
                            <ResumePreview
                                resume={resumeData}
                                onUpdateTemplate={handleUpdateTemplate}
                                onUpdateTemplateSettings={handleUpdateTemplateSettings}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}