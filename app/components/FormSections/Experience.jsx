'use client';

import { useState } from 'react';
import Input from '@/app/components/ui/Input';
import TextArea from '@/app/components/ui/TextArea';
import Button from '@/app/components/ui/Button';

export default function Experience({ items, onChange }) {
    const [experience, setExperience] = useState(items || []);

    const emptyExperience = {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
    };

    const addExperience = () => {
        const updatedExperience = [...experience, {...emptyExperience}];
        set
        Experience(updatedExperience);
        onChange(updatedExperience);
    };
    const removeExperience = (index) => {
        const updatedExperience = [...experience];
        updatedExperience.splice(index, 1);
        setExperience(updatedExperience);
        onChange(updatedExperience);
    };

    const updateExperience = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [field]: value
        };
        setExperience(updatedExperience);
        onChange(updatedExperience);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Опыт работы</h2>

            {experience.length === 0 && (
                <p className="text-gray-500 mb-4">Опыт работы еще не добавлен. Нажмите кнопку ниже, чтобы добавить.</p>
            )}

            {experience.map((exp, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Опыт #{index + 1}</h3>
                        <Button
                            variant="danger"
                            onClick={() => removeExperience(index)}
                            className="text-sm px-2 py-1"
                        >
                            Удалить
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Компания"
                            name={`company-${index}`}
                            value={exp.company || ''}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            placeholder="Название компании"
                        />

                        <Input
                            label="Должность"
                            name={`position-${index}`}
                            value={exp.position || ''}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            placeholder="Название должности"
                        />
                    </div>

                    <Input
                        label="Местоположение"
                        name={`location-${index}`}
                        value={exp.location || ''}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        placeholder="Город, Страна"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Дата начала"
                            name={`startDate-${index}`}
                            value={exp.startDate || ''}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            placeholder="Январь 2020"
                        />

                        <Input
                            label="Дата окончания"
                            name={`endDate-${index}`}
                            value={exp.endDate || ''}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            placeholder="По настоящее время"
                        />
                    </div>

                    <TextArea
                        label="Описание"
                        name={`description-${index}`}
                        value={exp.description || ''}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        placeholder="Опишите ваши обязанности, достижения и проекты"
                        rows={3}
                    />
                </div>
            ))}

            <Button
                variant="outline"
                onClick={addExperience}
                className="w-full"
            >
                + Добавить опыт работы
            </Button>
        </div>
    );
}