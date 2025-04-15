'use client';

import { useRef, useEffect } from 'react';
import Button from '@/app/components/ui/Button';
import TemplateSelector from '@/app/components/TemplateSelector';
import StandardTemplate from '@/app/components/ResumeTemplates/StandardTemplate';
import ModernTemplate from '@/app/components/ResumeTemplates/ModernTemplate';
import SidebarTemplate from '@/app/components/ResumeTemplates/SidebarTemplate';
import { exportToPdf } from '@/app/lib/utils/pdfExport';
import Cookies from 'js-cookie';
import { getTranslation } from '@/app/messages/languages';

export default function ResumePreview({ resume, onUpdateTemplate, onUpdateTemplateSettings }) {
    const resumeRef = useRef(null);
    const [currentLanguage, setCurrentLanguage] = useState('ru');

    useEffect(() => {
        const savedLanguage = Cookies.get('selectedLanguage') || 'ru';
        setCurrentLanguage(savedLanguage);
    }, []);

    const t = (key, fallback = '') => getTranslation(currentLanguage, key, fallback);

    const handleExportPdf = async () => {
        if (!resumeRef.current) return;
        try {
            await exportToPdf('resume-preview', `${resume.personalInfo.fullName || 'Resume'}.pdf`);
        } catch (error) {
            console.error('Ошибка экспорта PDF:', error);
            alert('Не удалось экспортировать PDF. Пожалуйста, попробуйте снова.');
        }
    };

    const handleSelectTemplate = (templateId) => {
        if (onUpdateTemplate) {
            onUpdateTemplate(templateId);
        }
    };

    const handleColorChange = (type, color) => {
        if (onUpdateTemplateSettings) {
            onUpdateTemplateSettings(type, color);
        }
    };

    const handleFontChange = (type, value) => {
        if (onUpdateTemplateSettings) {
            onUpdateTemplateSettings(type, value);
        }
    };

    const handleLineSpacingChange = (value) => {
        if (onUpdateTemplateSettings) {
            onUpdateTemplateSettings('lineSpacing', value);
        }
    };

    const hasPersonalInfo = resume.personalInfo && (
        resume.personalInfo.fullName ||
        resume.personalInfo.email ||
        resume.personalInfo.phone ||
        resume.personalInfo.address
    );

    const hasContent = hasPersonalInfo ||
        (resume.education && resume.education.length > 0) ||
        (resume.experience && resume.experience.length > 0) ||
        (resume.skills && resume.skills.length > 0) ||
        (resume.languages && resume.languages.length > 0) ||
        (resume.interests && resume.interests.length > 0);

    const renderTemplate = () => {
        const templateId = resume.template || 'standard';

        switch (templateId) {
            case 'modern':
                return <ModernTemplate resume={resume} />;
            case 'sidebar':
                return <SidebarTemplate resume={resume} />;
            case 'standard':
            default:
                return <StandardTemplate resume={resume} />;
        }
    };

    return (
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('resume.preview', 'Предпросмотр резюме')}</h2>
                <Button
                    onClick={handleExportPdf}
                    disabled={!hasContent}
                    variant="secondary"
                >
                    {t('button.exportPdf', 'Экспорт в PDF')}
                </Button>
            </div>

            <TemplateSelector
                resume={resume}
                onSelect={handleSelectTemplate}
                onColorChange={handleColorChange}
                onFontChange={handleFontChange}
                onLineSpacingChange={handleLineSpacingChange}
            />

            {!hasContent ? (
                <div className="text-center py-12 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">{t('resume.noContent', 'Нет содержимого')}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {t('resume.startFilling', 'Начните заполнять форму, чтобы увидеть предпросмотр вашего резюме.')}
                    </p>
                </div>
            ) : (
                <div
                    id="resume-preview"
                    ref={resumeRef}
                    className="border border-gray-200 rounded-md shadow-sm mx-auto bg-white"
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        maxWidth: '100%'
                    }}
                >
                    {renderTemplate()}
                </div>
            )}
        </div>
    );
}