const languages = {
    ru: {
        name: 'Русский',
        code: 'ru',
        dictionary: {
            // Навигация
            'nav.home': 'Главная',
            'nav.dashboard': 'Мои резюме',
            'nav.donate': 'Поддержать проект',
            'nav.signin': 'Войти',
            'nav.signout': 'Выйти',

            // Резюме разделы
            'resume.personalInfo': 'Личная информация',
            'resume.education': 'Образование',
            'resume.experience': 'Опыт работы',
            'resume.skills': 'Навыки',
            'resume.languages': 'Языки',
            'resume.interests': 'Интересы и хобби',

            // Поля
            'field.fullName': 'Полное имя',
            'field.email': 'Email',
            'field.phone': 'Телефон',
            'field.address': 'Адрес',
            'field.photoUrl': 'URL фотографии',
            'field.profession': 'Профессия',
            'field.summary': 'О себе',

            // Кнопки
            'button.save': 'Сохранить',
            'button.cancel': 'Отмена',
            'button.exportPdf': 'Экспорт в PDF',
            'button.createResume': 'Создать резюме',

            // Шаблоны
            'template.standard': 'Стандартный',
            'template.modern': 'Современный',
            'template.sidebar': 'С боковой панелью',
            'template.customize': 'Настроить шаблон',
            'template.hideSettings': 'Скрыть настройки',

            // Настройки
            'settings.template': 'Выберите шаблон',
            'settings.primaryColor': 'Основной цвет',
            'settings.secondaryColor': 'Вторичный цвет',
            'settings.font': 'Шрифт',
            'settings.lineSpacing': 'Межстрочный интервал',

            // Уровни навыков
            'skill.beginner': 'Начинающий',
            'skill.basic': 'Базовый',
            'skill.intermediate': 'Средний',
            'skill.advanced': 'Продвинутый',
            'skill.expert': 'Эксперт'
        }
    },

    en: {
        name: 'English',
        code: 'en',
        dictionary: {
            // Navigation
            'nav.home': 'Home',
            'nav.dashboard': 'My Resumes',
            'nav.donate': 'Support Project',
            'nav.signin': 'Sign In',
            'nav.signout': 'Sign Out',

            // Resume sections
            'resume.personalInfo': 'Personal Information',
            'resume.education': 'Education',
            'resume.experience': 'Work Experience',
            'resume.skills': 'Skills',
            'resume.languages': 'Languages',
            'resume.interests': 'Interests & Hobbies',

            // Fields
            'field.fullName': 'Full Name',
            'field.email': 'Email',
            'field.phone': 'Phone',
            'field.address': 'Address',
            'field.photoUrl': 'Photo URL',
            'field.profession': 'Profession',
            'field.summary': 'About Me',

            // Buttons
            'button.save': 'Save',
            'button.cancel': 'Cancel',
            'button.exportPdf': 'Export to PDF',
            'button.createResume': 'Create Resume',

            // Templates
            'template.standard': 'Standard',
            'template.modern': 'Modern',
            'template.sidebar': 'Sidebar',
            'template.customize': 'Customize Template',
            'template.hideSettings': 'Hide Settings',

            // Settings
            'settings.template': 'Select Template',
            'settings.primaryColor': 'Primary Color',
            'settings.secondaryColor': 'Secondary Color',
            'settings.font': 'Font',
            'settings.lineSpacing': 'Line Spacing',

            // Skill levels
            'skill.beginner': 'Beginner',
            'skill.basic': 'Basic',
            'skill.intermediate': 'Intermediate',
            'skill.advanced': 'Advanced',
            'skill.expert': 'Expert'
        }
    },

    cs: {
        name: 'Čeština',
        code: 'cs',
        dictionary: {
            // Navigace
            'nav.home': 'Hlavní stránka',
            'nav.dashboard': 'Moje životopisy',
            'nav.donate': 'Podpořit projekt',
            'nav.signin': 'Přihlásit se',
            'nav.signout': 'Odhlásit se',

            // Sekce životopisu
            'resume.personalInfo': 'Osobní údaje',
            'resume.education': 'Vzdělání',
            'resume.experience': 'Pracovní zkušenosti',
            'resume.skills': 'Dovednosti',
            'resume.languages': 'Jazyky',
            'resume.interests': 'Zájmy a koníčky',

            // Pole
            'field.fullName': 'Celé jméno',
            'field.email': 'Email',
            'field.phone': 'Telefon',
            'field.address': 'Adresa',
            'field.photoUrl': 'URL fotografie',
            'field.profession': 'Profese',
            'field.summary': 'O mně',

            // Tlačítka
            'button.save': 'Uložit',
            'button.cancel': 'Zrušit',
            'button.exportPdf': 'Export do PDF',
            'button.createResume': 'Vytvořit životopis',

            // Šablony
            'template.standard': 'Standardní',
            'template.modern': 'Moderní',
            'template.sidebar': 'S postranním panelem',
            'template.customize': 'Upravit šablonu',
            'template.hideSettings': 'Skrýt nastavení',

            // Nastavení
            'settings.template': 'Vyberte šablonu',
            'settings.primaryColor': 'Hlavní barva',
            'settings.secondaryColor': 'Sekundární barva',
            'settings.font': 'Písmo',
            'settings.lineSpacing': 'Řádkování',

            // Úrovně dovedností
            'skill.beginner': 'Začátečník',
            'skill.basic': 'Základní',
            'skill.intermediate': 'Střední',
            'skill.advanced': 'Pokročilý',
            'skill.expert': 'Expert'
        }
    }
};

export default languages;

export function getTranslation(lang, key, fallback = '') {
    if (!languages[lang] || !languages[lang].dictionary[key]) {
        // Если перевод не найден, возвращаем английский или запасное значение
        return languages.en?.dictionary[key] || fallback;
    }
    return languages[lang].dictionary[key];
}