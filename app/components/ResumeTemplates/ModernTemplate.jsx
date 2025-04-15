import { getTextColorForBackground } from '@/app/components/utils/colorUtils';

export default function ModernTemplate({ resume, className = '' }) {
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
        hyphens: 'auto'
    };

    const sectionHeaderStyles = {
        borderBottom: `2px solid ${primaryColor}`,
        ...commonTextStyles
    };

    return (
        <div className={`bg-white ${className}`} style={commonTextStyles}>
            {/* Заголовок */}
            <div
                className="p-6 mb-6 text-white"
                style={{ backgroundColor: primaryColor, color: primaryTextColor }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        {personalInfo?.fullName && (
                            <h1 className="text-2xl font-bold mb-1" style={{ color: primaryTextColor, ...commonTextStyles }}>
                                {personalInfo.fullName}
                            </h1>
                        )}

                        {personalInfo?.profession && (
                            <p className="text-lg opacity-90 mb-2" style={{ color: primaryTextColor, ...commonTextStyles }}>
                                {personalInfo.profession}
                            </p>
                        )}
                    </div>

                    {personalInfo?.photoUrl && (
                        <div className="mt-4 md:mt-0">
                            <img
                                src={personalInfo.photoUrl}
                                alt={personalInfo.fullName || 'Профиль'}
                                className="w-24 h-24 rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="px-6">
                {/* Контактная информация */}
                {personalInfo && (
                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: secondaryColor }}>
                        <div className="flex flex-wrap gap-4">
                            {personalInfo.email && (
                                <div className="flex items-center" style={{ maxWidth: '100%', wordBreak: 'break-all', ...commonTextStyles }}>
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm">{personalInfo.email}</span>
                                </div>
                            )}

                            {personalInfo.phone && (
                                <div className="flex items-center" style={commonTextStyles}>
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm">{personalInfo.phone}</span>
                                </div>
                            )}

                            {personalInfo.address && (
                                <div className="flex items-center" style={commonTextStyles}>
                                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">{personalInfo.address}</span>
                                </div>
                            )}
                        </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {/* Опыт работы */}
                        {experience && experience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold mb-4 pb-2" style={sectionHeaderStyles}>
                                    Опыт работы
                                </h2>

                                {experience.map((exp, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-md font-semibold" style={{ color: primaryColor, ...commonTextStyles }}>
                                            {exp.position}
                                        </h3>
                                        <p className="text-sm font-medium" style={commonTextStyles}>
                                            {exp.company}{exp.location ? `, ${exp.location}` : ''}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1" style={commonTextStyles}>
                                            {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- По настоящее время'}
                                        </p>

                                        {exp.description && (
                                            <div
                                                className="text-sm text-gray-700"
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
                            <div className="mb-6">
                                <h2 className="text-lg font-bold mb-4 pb-2" style={sectionHeaderStyles}>
                                    Образование
                                </h2>

                                {education.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-md font-semibold" style={{ color: primaryColor, ...commonTextStyles }}>
                                            {edu.degree}{edu.field ? ` по специальности ${edu.field}` : ''}
                                        </h3>
                                        <p className="text-sm font-medium" style={commonTextStyles}>
                                            {edu.institution}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1" style={commonTextStyles}>
                                            {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : '- По настоящее время'}
                                        </p>

                                        {edu.description && (
                                            <div
                                                className="text-sm text-gray-700"
                                                style={commonTextStyles}
                                                dangerouslySetInnerHTML={{ __html: edu.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Навыки */}
                        {skills && skills.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold mb-4 pb-2" style={sectionHeaderStyles}>
                                    Навыки
                                </h2>

                                <div className="space-y-3">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium" style={commonTextStyles}>{skill.name}</span>
                                                <span className="text-xs text-gray-500" style={commonTextStyles}>
                          {skill.level === 1 && 'Начинающий'}
                                                    {skill.level === 2 && 'Базовый'}
                                                    {skill.level === 3 && 'Средний'}
                                                    {skill.level === 4 && 'Продвинутый'}
                                                    {skill.level === 5 && 'Эксперт'}
                        </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-2 rounded-full"
                                                    style={{
                                                        width: `${(skill.level / 5) * 100}%`,
                                                        backgroundColor: primaryColor
                                                    }}
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
                                <h2 className="text-lg font-bold mb-4 pb-2" style={sectionHeaderStyles}>
                                    Языки
                                </h2>

                                <ul className="list-disc pl-5 space-y-1">
                                    {languages.map((language, index) => (
                                        <li key={index} className="text-sm" style={commonTextStyles}>
                                            <span className="font-medium">{language.name}</span> - {language.proficiency}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Интересы */}
                        {interests && interests.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold mb-4 pb-2" style={sectionHeaderStyles}>
                                    Интересы и хобби
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm rounded-full"
                                            style={{
                                                backgroundColor: secondaryColor,
                                                color: secondaryTextColor === 'white' ? primaryColor : secondaryTextColor,
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
                </div>
            </div>
        </div>
    );
}