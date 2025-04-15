'use client';

import { useState } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

export default function Interests({ items, onChange }) {
    const [interests, setInterests] = useState(items || []);
    const [newInterest, setNewInterest] = useState('');

    // Добавить новый интерес
    const addInterest = () => {
        if (newInterest.trim() === '') return;

        const updatedInterests = [...interests, newInterest.trim()];
        setInterests(updatedInterests);
        onChange(updatedInterests);
        setNewInterest('');
    };

    // Удалить интерес
    const removeInterest = (index) => {
        const updatedInterests = [...interests];
        updatedInterests.splice(index, 1);
        setInterests(updatedInterests);
        onChange(updatedInterests);
    };

    // Обработка нажатия Enter для добавления интереса
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInterest();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Интересы и хобби</h2>

            <div className="flex mb-4">
                <Input
                    name="newInterest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Добавьте интерес или хобби (например, Чтение, Путешествия)"
                    className="flex-grow mr-2"
                    onKeyDown={handleKeyDown}
                />
                <Button
                    onClick={addInterest}
                    disabled={!newInterest.trim()}
                >
                    Добавить
                </Button>
            </div>

            {interests.length === 0 ? (
                <p className="text-gray-500">Интересы еще не добавлены.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                        >
                            <span className="mr-2">{interest}</span>
                            <button
                                onClick={() => removeInterest(index)}
                                className="text-gray-500 hover:text-red-600 focus:outline-none"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}