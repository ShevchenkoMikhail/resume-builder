import { getTextColorForBackground } from '@/app/components/utils/colorUtils';

export default function SidebarTemplate({ resume, className = '' }) {
    const { personalInfo, education, experience, skills, languages, interests, templateSettings } = resume;

    const primaryColor = templateSettings?.primaryColor || '#3b82f6';
    const secondaryColor = templateSettings?.secondaryColor || '#f3f4f6';
    const fontFamily = templateSettings?.fontFamily || 'Arial, sans-serif';
    const lineSpacing = templateSettings?.lineSpacing || 1.5;

    // Определяем цвет текста на основе цвета фона
    const primaryTextColor = getTextColorForBackground(primaryColor);
    const secondaryTextColor = getTextColorForBackground(secondaryColor);

    const commonTextStyles = {
        fontFamily: fontFamily,
        lineHeight: lineSpacing,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        hyphens: 'auto'
    };

    const sidebarStyles = {
        backgroundColor: primaryColor,
        color: primaryTextColor,
        ...commonTextStyles
    };

    const sidebarHeaderStyles = {
        borderBottom: `1px solid ${primaryTextColor}`,
        ...commonTextStyles
    };

    const mainSectionHeaderStyles = {
        borderBottom: `2px solid ${primaryColor}`,
        color: primaryColor,
        ...commonTextStyles
    };

    return (
        <div className={`bg-white flex flex-col md:flex-row ${className}`} style={commonTextStyles}>
            {/* Боковая панель (1/3 ширины) */}
            <div className="md:w-1/3 p-6 text-white" style={sidebarStyles}>
                {/* Фото профиля */}
                {personalInfo?.photoUrl && (
                    <div className="mb-6 flex justify-center">
                        <img
                            src={personalInfo.photoUrl}
                            alt={personalInfo.fullName || 'Профиль'}
                            className="w-32 h-32 rounded-full object-cover border-2 border-white"
                        />
                    </div>
                )}

                {/* Контактная информация */}
                {personalInfo && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 pb-2" style={sidebarHeaderStyles}>
                            Контактная информация
                        </h2>

                        <div className="space-y-3">
                            {personalInfo.email && (
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm overflow-hidden" style={{ wordBreak: 'break-all', ...commonTextStyles }}>{personalInfo.email}</span>
                                </div>
                            )}

                            {personalInfo.phone && (
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm" style={commonTextStyles}>{personalInfo.phone}</span>
                                </div>
                            )}

                            {personalInfo.address && (
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm" style={commonTextStyles}>{personalInfo.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Навыки */}
                {skills && skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 pb-2" style={sidebarHeaderStyles}>
                            Навыки
                        </h2>

                        <div className="space-y-3">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium mb-1" style={commonTextStyles}>{skill.name}</p>
                                    <div className="h-2 bg-white bg-opacity-30 rounded-full">
                                        <div
                                            className="h-2 bg-white rounded-full"
                                            style={{ width: `${(skill.level / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Языки */}
                {languages && languages.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 pb-2" style={sidebarHeaderStyles}>
                            Языки
                        </h2>

                        <div className="space-y-1">
                            {languages.map((language, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-sm font-medium" style={commonTextStyles}>{language.name}</p>
                                    <p className="text-xs opacity-80" style={commonTextStyles}>{language.proficiency}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Интересы */}
                {interests && interests.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 pb-2" style={sidebarHeaderStyles}>
                            Интересы и хобби
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full"
                                    style={{
                                        backgroundColor: 'white',
                                        color: primaryColor,
                                        ...commonTextStyles
                                    }}
                                >
                  {interest}
                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Основное содержимое (2/3 ширины) */}
            <div className="md:w-2/3 p-6">
                {/* Заголовок с именем и профессией */}
                {personalInfo && (
                    <div className="mb-6 pb-4" style={{ borderBottom: `2px solid ${primaryColor}` }}>
                        {personalInfo.fullName && (
                            <h1 className="text-3xl font-bold text-gray-900 mb-1" style={commonTextStyles}>
                                {personalInfo.fullName}
                            </h1>
                        )}

                        {personalInfo.profession && (
                            <p className="text-xl text-gray-600" style={commonTextStyles}>
                                {personalInfo.profession}
                            </p>
                        )}

                        {personalInfo.summary && (
                            <div className="mt-4">
                                <div
                                    className="text-sm text-gray-700"
                                    style={commonTextStyles}
                                    dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Опыт работы */}
                {experience && experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4" style={mainSectionHeaderStyles}>
                            Опыт работы
                        </h2>

                        {experience.map((exp, index) => (
                            <div key={index} className="mb-5">
                                <div className="flex justify-between items-start flex-wrap">
                                    <div className="mr-2">
                                        <h3 className="text-lg font-semibold" style={commonTextStyles}>
                                            {exp.position}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-700" style={commonTextStyles}>
                                            {exp.company}{exp.location ? `, ${exp.location}` : ''}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-nowrap" style={commonTextStyles}>
                                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- По настоящее время'}
                                    </p>
                                </div>

                                {exp.description && (
                                    <div
                                        className="text-sm text-gray-700 mt-2"
                                        style={commonTextStyles}
                                        dangerouslySetInnerHTML={{ __html: exp.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Образование */}
                {education && education.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4" style={mainSectionHeaderStyles}>
                            Образование
                        </h2>

                        {education.map((edu, index) => (
                            <div key={index} className="mb-5">
                                <div className="flex justify-between items-start flex-wrap">
                                    <div className="mr-2">
                                        <h3 className="text-lg font-semibold" style={commonTextStyles}>
                                            {edu.degree}{edu.field ? ` по специальности ${edu.field}` : ''}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-700" style={commonTextStyles}>
                                            {edu.institution}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-nowrap" style={commonTextStyles}>
                                        {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : '- По настоящее время'}
                                    </p>
                                </div>

                                {edu.description && (
                                    <div
                                        className="text-sm text-gray-700 mt-2"
                                        style={commonTextStyles}
                                        dangerouslySetInnerHTML={{ __html: edu.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}