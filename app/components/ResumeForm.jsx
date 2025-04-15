'use client';

import { useState } from 'react';
import Button from '@/app/components/ui/Button';
import PersonalInfo from '@/app/components/FormSections/PersonalInfo';
import Education from '@/app/components/FormSections/Education';
import Experience from '@/app/components/FormSections/Experience';
import Skills from '@/app/components/FormSections/Skills';
import Languages from '@/app/components/FormSections/Languages';
import Interests from '@/app/components/FormSections/Interests';

export default function ResumeForm({ initialData = {}, onUpdate, onSave }) {
    const [formData, setFormData] = useState({
        personalInfo: initialData.personalInfo || {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            photoUrl: '',
            profession: '',
            summary: ''
        },
        education: initialData.education || [],
        experience: initialData.experience || [],
        skills: initialData.skills || [],
        languages: initialData.languages || [],
        interests: initialData.interests || [],
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handlePersonalInfoChange = (personalInfo) => {
        const updatedData = { ...formData, personalInfo };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleEducationChange = (education) => {
        const updatedData = { ...formData, education };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleExperienceChange = (experience) => {
        const updatedData = { ...formData, experience };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleSkillsChange = (skills) => {
        const updatedData = { ...formData, skills };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleLanguagesChange = (languages) => {
        const updatedData = { ...formData, languages };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleInterestsChange = (interests) => {
        const updatedData = { ...formData, interests };
        setFormData(updatedData);
        onUpdate(updatedData);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        try {
            await onSave(formData);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Ошибка сохранения резюме:', error);
            setSaveError(error.message || 'Не удалось сохранить резюме. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSaving(false);
        }
    };

    const isFormValid = formData.personalInfo.fullName && formData.personalInfo.email;

    return (
        <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Создайте своё резюме</h1>

            <PersonalInfo
                data={formData.personalInfo}
                onChange={handlePersonalInfoChange}
            />

            <Education
                items={formData.education}
                onChange={handleEducationChange}
            />

            <Experience
                items={formData.experience}
                onChange={handleExperienceChange}
            />

            <Skills
                items={formData.skills}
                onChange={handleSkillsChange}
            />

            <Languages
                items={formData.languages}
                onChange={handleLanguagesChange}
            />

            <Interests
                items={formData.interests}
                onChange={handleInterestsChange}
            />

            <div className="mt-6">
                {saveError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                        <p className="font-medium">Ошибка:</p>
                        <p>{saveError}</p>
                    </div>
                )}

                {saveSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                        <p>Резюме успешно сохранено!</p>
                    </div>
                )}

                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={!isFormValid || isSaving}
                    className="w-full"
                >
                    {isSaving ? 'Сохранение...' : 'Сохранить резюме'}
                </Button>

                {!isFormValid && (
                    <p className="mt-2 text-sm text-red-600">
                        Пожалуйста, заполните обязательные поля (ФИО и Email).
                    </p>
                )}
            </div>
        </div>
    );
}