import mongoose from 'mongoose';

// Проверяем, не зарегистрирована ли уже модель, чтобы избежать ошибок
const Resume = mongoose.models.Resume || mongoose.model('Resume', new mongoose.Schema({
    // Идентификатор пользователя
    userId: { type: String, required: true },

    // Личная информация
    personalInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        photoUrl: { type: String },
        profession: { type: String },
        summary: { type: String }
    },
    // Образование
    education: [{
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String }
    }],
    // Опыт работы
    experience: [{
        company: { type: String },
        position: { type: String },
        location: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String }
    }],
    // Навыки
    skills: [{
        name: { type: String },
        level: { type: Number } // От 1 до 5
    }],
    // Языки
    languages: [{
        name: { type: String },
        proficiency: { type: String } // Beginner, Intermediate, Advanced, Fluent, Native
    }],
    // Интересы/хобби
    interests: [{ type: String }],
    // Выбранный шаблон
    template: { type: String, default: 'standard' },
    // Настройки шаблона
    templateSettings: {
        primaryColor: { type: String, default: '#3b82f6' }, // Основной цвет (blue-500)
        secondaryColor: { type: String, default: '#f3f4f6' }, // Вторичный цвет (gray-100)
        fontFamily: { type: String, default: 'Inter' },
    },
    // Автоматически добавляем дату создания и обновления
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }));

export default Resume;