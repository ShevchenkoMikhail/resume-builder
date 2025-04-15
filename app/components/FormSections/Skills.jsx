'use client';

import { useState } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

export default function Skills({ items, onChange }) {
    const [skills, setSkills] = useState(items || []);

    // Новый пустой элемент навыка
    const emptySkill = {
        name: '',
        level: 3 // По умолчанию: средний уровень
    };

    // Добавить новый навык
    const addSkill = () => {
        const updatedSkills = [...skills, { ...emptySkill }];
        setSkills(updatedSkills);
        onChange(updatedSkills);
    };

    // Удалить навык
    const removeSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
        onChange(updatedSkills);
    };

    // Обновить данные о навыке
    const updateSkill = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = {
            ...updatedSkills[index],
            [field]: field === 'level' ? parseInt(value, 10) : value
        };
        setSkills(updatedSkills);
        onChange(updatedSkills);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Навыки</h2>

            {skills.length === 0 && (
                <p className="text-gray-500 mb-4">Навыки еще не добавлены. Нажмите кнопку ниже, чтобы добавить.</p>
            )}

            {skills.map((skill, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow mr-4">
                            <Input
                                label={`Навык ${index + 1}`}
                                name={`skill-${index}`}
                                value={skill.name || ''}
                                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                placeholder="например, JavaScript, Управление проектами и т.д."
                            />
                        </div>
                        <Button
                            variant="danger"
                            onClick={() => removeSkill(index)}
                            className="text-sm px-2 py-1 mt-6"
                        >
                            Удалить
                        </Button>
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Уровень владения
                        </label>
                        <div className="flex items-center">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={skill.level || 3}
                                onChange={(e) => updateSkill(index, 'level', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                {skill.level === 1 && 'Начинающий'}
                                {skill.level === 2 && 'Базовый'}
                                {skill.level === 3 && 'Средний'}
                                {skill.level === 4 && 'Продвинутый'}
                                {skill.level === 5 && 'Эксперт'}
              </span>
                        </div>
                    </div>
                </div>
            ))}

            <Button
                variant="outline"
                onClick={addSkill}
                className="w-full"
            >
                + Добавить навык
            </Button>
        </div>
    );
}