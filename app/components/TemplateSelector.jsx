'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/ui/Button';
import StandardTemplate from '@/app/components/ResumeTemplates/StandardTemplate';
import ModernTemplate from '@/app/components/ResumeTemplates/ModernTemplate';
import SidebarTemplate from '@/app/components/ResumeTemplates/SidebarTemplate';
import Cookies from 'js-cookie';
import { getTranslation } from '@/app/messages/languages';

const templates = [
    { id: 'standard', name: 'template.standard', component: StandardTemplate },
    { id: 'modern', name: 'template.modern', component: ModernTemplate },
    { id: 'sidebar', name: 'template.sidebar', component: SidebarTemplate },
];

const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Courier New, monospace', label: 'Courier New' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Tahoma, sans-serif', label: 'Tahoma' },
    { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' }
];

export default function TemplateSelector({ resume, onSelect, onColorChange, onFontChange, onLineSpacingChange }) {
    const [showSelector, setShowSelector] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(resume.template || 'standard');
    const [currentLanguage, setCurrentLanguage] = useState('ru');

    useEffect(() => {
        // Получаем текущий язык из куки
        const savedLanguage = Cookies.get('selectedLanguage') || 'ru';
        setCurrentLanguage(savedLanguage);
    }, []);

    // Функция перевода
    const t = (key, fallback = '') => getTranslation(currentLanguage, key, fallback);

    const handleSelectTemplate = (templateId) => {
        setSelectedTemplate(templateId);
        onSelect(templateId);
    };

    const handleColorChange = (type, color) => {
        onColorChange(type, color);
    };

    const handleFontChange = (fontFamily) => {
        onFontChange('fontFamily', fontFamily);
    };

    const handleLineSpacingChange = (lineSpacing) => {
        onLineSpacingChange('lineSpacing', lineSpacing);
    };

    return (
        <div className="mb-4">
            <Button
                variant="outline"
                onClick={() => setShowSelector(!showSelector)}
                className="mb-2 w-full"
            >
                {showSelector ? t('template.hideSettings', 'Скрыть настройки') : t('template.customize', 'Настроить шаблон')}
            </Button>

            {showSelector && (
                <div className="bg-white p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">{t('settings.template', 'Выберите шаблон')}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className={`
                  border p-2 rounded cursor-pointer text-center
                  ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                `}
                                onClick={() => handleSelectTemplate(template.id)}
                            >
                                <div className="h-24 mb-2 flex items-center justify-center bg-gray-100 overflow-hidden">
                                    <template.component
                                        resume={resume}
                                        className="transform scale-[0.2] origin-center"
                                    />
                                </div>
                                <span className="text-sm">{t(template.name, template.name)}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className="font-medium mb-3">{t('settings.font', 'Шрифт')}</h3>
                    <div className="mb-4">
                        <select
                            value={resume.templateSettings?.fontFamily || 'Arial, sans-serif'}
                            onChange={(e) => handleFontChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {fontOptions.map((font) => (
                                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                    {font.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h3 className="font-medium mb-3">{t('settings.lineSpacing', 'Межстрочный интервал')}</h3>
                    <div className="mb-4 flex items-center">
                        <input
                            type="range"
                            min="1"
                            max="2.5"
                            step="0.1"
                            value={resume.templateSettings?.lineSpacing || 1.5}
                            onChange={(e) => handleLineSpacingChange(parseFloat(e.target.value))}
                            className="w-full mr-3"
                        />
                        <span className="text-sm font-medium">{resume.templateSettings?.lineSpacing || 1.5}</span>
                    </div>

                    <h3 className="font-medium mb-3">{t('settings.primaryColor', 'Основной цвет')}</h3>
                    <div className="mb-4">
                        <input
                            type="color"
                            value={resume.templateSettings?.primaryColor || '#3b82f6'}
                            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                            className="w-full h-8 rounded cursor-pointer"
                        />
                    </div>

                    <h3 className="font-medium mb-3">{t('settings.secondaryColor', 'Вторичный цвет')}</h3>
                    <div className="mb-4">
                        <input
                            type="color"
                            value={resume.templateSettings?.secondaryColor || '#f3f4f6'}
                            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                            className="w-full h-8 rounded cursor-pointer"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}