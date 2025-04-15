'use client';

import { useState } from 'react';
import Input from '@/app/components/ui/Input';
import TextArea from '@/app/components/ui/TextArea';
import Button from '@/app/components/ui/Button';

export default function Education({ items, onChange }) {
    const [education, setEducation] = useState(items || []);

    const emptyEducation = {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
    };

    const addEducation = () => {
        const updatedEducation = [...education, { ...emptyEducation }];
        setEducation(updatedEducation);
        onChange(updatedEducation);
    };

    const removeEducation = (index) => {
        const updatedEducation = [...education];
        updatedEducation.splice(index, 1);
        setEducation(updatedEducation);
        onChange(updatedEducation);
    };

    const updateEducation = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value
        };
        setEducation(updatedEducation);
        onChange(updatedEducation);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Образование</h2>

            {education.length === 0 && (
                <p className="text-gray-500 mb-4">Информация об образовании еще не добавлена. Нажмите кнопку ниже, чтобы добавить.</p>
            )}

            {education.map((edu, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Образование #{index + 1}</h3>
                        <Button
                            variant="danger"
                            onClick={() => removeEducation(index)}
                            className="text-sm px-2 py-1"
                        >
                            Удалить
                        </Button>
                    </div>

                    <Input
                        label="Учебное заведение"
                        name={`institution-${index}`}
                        value={edu.institution || ''}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        placeholder="Название университета или школы"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Степень"
                            name={`degree-${index}`}
                            value={edu.degree || ''}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Бакалавр, Магистр и т.д."
                        />

                        <Input
                            label="Направление обучения"
                            name={`field-${index}`}
                            value={edu.field || ''}
                            onChange={(e) => updateEducation(index, 'field', e.target.value)}
                            placeholder="Информатика, Экономика и т.д."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Дата начала"
                            name={`startDate-${index}`}
                            value={edu.startDate || ''}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder="Сентябрь 2018"
                        />

                        <Input
                            label="Дата окончания"
                            name={`endDate-${index}`}
                            value={edu.endDate || ''}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder="Май 2022 (или 'По настоящее время')"
                        />
                    </div>

                    <TextArea
                        label="Описание"
                        name={`description-${index}`}
                        value={edu.description || ''}
                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                        placeholder="Соответствующие курсы, достижения, дипломная работа и т.д."
                        rows={3}
                    />
                </div>
            ))}

            <Button
                variant="outline"
                onClick={addEducation}
                className="w-full"
            >
                + Добавить образование
            </Button>
        </div>
    );
}