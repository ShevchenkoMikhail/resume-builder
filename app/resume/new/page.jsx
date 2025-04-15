'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/ui/Button';
import Input from '@/app/components/ui/Input';
import AuthGuard from '@/app/components/AuthGuard';
import ResumePreview from '@/app/components/ResumePreview';
import RichTextEditor from '@/app/components/RichTextEditor';
import Cookies from 'js-cookie';
import { getTranslation } from '@/app/messages/languages';

export default function NewResume() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('ru');

    useEffect(() => {
        // Получаем текущий язык из куки
        const savedLanguage = Cookies.get('selectedLanguage') || 'ru';
        setCurrentLanguage(savedLanguage);
    }, []);

    // Функция перевода
    const t = (key, fallback = '') => getTranslation(currentLanguage, key, fallback);

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
            fontFamily: 'Arial, sans-serif',
            lineSpacing: 1.5
        }
    });

    const handleChange = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleUpdateTemplate = (templateId) => {
        setResumeData(prev => ({
            ...prev,
            template: templateId
        }));
    };

    const handleUpdateTemplateSettings = (type, value) => {
        setResumeData(prev => ({
            ...prev,
            templateSettings: {
                ...prev.templateSettings,
                [type]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
            setError('Пожалуйста, заполните обязательные поля (имя и email)');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resumeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Не удалось создать резюме');
            }

            const savedResume = await response.json();
            router.push(`/dashboard`);
        } catch (error) {
            console.error('Ошибка при создании резюме:', error);
            setError(error.message || 'Произошла ошибка при создании резюме');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {t('resume.create', 'Создание нового резюме')}
                            </h1>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                            {/* Форма для ввода данных */}
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            {t('resume.personalInfo', 'Личная информация')}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {t('resume.fillBasicInfo', 'Заполните основные данные для вашего резюме.')}
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-200">
                                        <dl>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.fullName', 'Полное имя')} <span className="text-red-500">*</span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        value={resumeData.personalInfo.fullName}
                                                        onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                                                        placeholder={t('field.fullNamePlaceholder', 'Иван Иванов')}
                                                        required
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.email', 'Email')} <span className="text-red-500">*</span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        type="email"
                                                        value={resumeData.personalInfo.email}
                                                        onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                                                        placeholder={t('field.emailPlaceholder', 'ivan.ivanov@example.com')}
                                                        required
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.phone', 'Телефон')}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        value={resumeData.personalInfo.phone}
                                                        onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                                                        placeholder={t('field.phonePlaceholder', '+7 (999) 123-45-67')}
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.address', 'Адрес')}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        value={resumeData.personalInfo.address}
                                                        onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
                                                        placeholder={t('field.addressPlaceholder', 'г. Москва, Россия')}
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.profession', 'Профессия')}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        value={resumeData.personalInfo.profession}
                                                        onChange={(e) => handleChange('personalInfo', 'profession', e.target.value)}
                                                        placeholder={t('field.professionPlaceholder', 'Разработчик программного обеспечения')}
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.photoUrl', 'URL фотографии')}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <Input
                                                        value={resumeData.personalInfo.photoUrl}
                                                        onChange={(e) => handleChange('personalInfo', 'photoUrl', e.target.value)}
                                                        placeholder={t('field.photoUrlPlaceholder', 'https://example.com/photo.jpg')}
                                                    />
                                                </dd>
                                            </div>

                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    {t('field.summary', 'О себе')}
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    <RichTextEditor
                                                        value={resumeData.personalInfo.summary}
                                                        onChange={(value) => handleChange('personalInfo', 'summary', value)}
                                                        placeholder={t('field.summaryPlaceholder', 'Краткое описание ваших профессиональных навыков и опыта')}
                                                    />
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="px-4 py-5 sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.push('/dashboard')}
                                        >
                                            {t('button.cancel', 'Отмена')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? t('button.creating', 'Создание...') : t('button.createResume', 'Создать резюме')}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Предпросмотр резюме */}
                            <div className="hidden lg:block overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
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
        </AuthGuard>
    );
}