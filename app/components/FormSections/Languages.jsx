'use client';

import { useState } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

export default function Languages({ items, onChange }) {
    const [languages, setLanguages] = useState(items || []);

    // Варианты уровней владения языком
    const proficiencyLevels = [
        'Начальный', 'Элементарный', 'Средний', 'Продвинутый', 'Свободный', 'Родной'
    ];

    // Новый пустой элемент языка
    const emptyLanguage = {
        name: '',
        proficiency: 'Средний' // По умолчанию
    };

    // Добавить новый язык
    const addLanguage = () => {
        const updatedLanguages = [...languages, { ...emptyLanguage }];
        setLanguages(updatedLanguages);
        onChange(updatedLanguages);
    };

    // Удалить язык
    const removeLanguage = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
        onChange(updatedLanguages);
    };

    // Обновить данные о языке
    const updateLanguage = (index, field, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index] = {
            ...updatedLanguages[index],
            [field]: value
        };
        setLanguages(updatedLanguages);
        onChange(updatedLanguages);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Языки</h2>

            {languages.length === 0 && (
                <p className="text-gray-500 mb-4">Языки еще не добавлены. Нажмите кнопку ниже, чтобы добавить.</p>
            )}

            {languages.map((language, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex justify-between items-start">
                        <div className="flex-grow mr-4">
                            <Input
                                label={`Язык ${index + 1}`}
                                name={`language-${index}`}
                                value={language.name || ''}
                                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                placeholder="например, Английский, Испанский и т.д."
                            />

                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Уровень владения
                                </label>
                                <select
                                    value={language.proficiency || 'Средний'}
                                    onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    {proficiencyLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Button
                            variant="danger"
                            onClick={() => removeLanguage(index)}
                            className="text-sm px-2 py-1 mt-6"
                        >
                            Удалить
                        </Button>
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                onClick={addLanguage}
                className="w-full"
            >
                + Добавить язык
            </Button>
        </div>
    );
}