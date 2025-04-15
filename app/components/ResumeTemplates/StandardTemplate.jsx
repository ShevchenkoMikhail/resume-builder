import { getTextColorForBackground } from '@/app/components/utils/colorUtils';

export default function StandardTemplate({ resume, className = '' }) {
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
        borderColor: primaryColor,
        color: 'rgb(17, 24, 39)', // text-gray-900 в rgb
        ...commonTextStyles
    };

    return (
        <div className={`bg-white p-6 ${className}`} style={commonTextStyles}>
            {/* Заголовок с личной информацией */}
            {personalInfo && (
                <div className="mb-6 border-b pb-6" style={{ borderColor: primaryColor }}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            {personalInfo.fullName && (
                                <h1 className="text-2xl font-bold text-gray-900 mb-1" style={commonTextStyles}>
                                    {personalInfo.fullName}
                                </h1>
                            )}

                            {personalInfo.profession && (
                                <p className="text-lg text-gray-600 mb-2" style={commonTextStyles}>
                                    {personalInfo.profession}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-y-1">
                                {personalInfo.email && (
                                    <div className="mr-4 text-sm text-gray-600" style={{ ...commonTextStyles, maxWidth: '100%', wordBreak: 'break-all' }}>
                                        <span className="font-medium">Email:</span> {personalInfo.email}
                                    </div>
                                )}

                                {personalInfo.phone && (
                                    <div className="mr-4 text-sm text-gray-600" style={commonTextStyles}>
                                        <span className="font-medium">Телефон:</span> {personalInfo.phone}
                                    </div>
                                )}

                                {personalInfo.address && (
                                    <div className="text-sm text-gray-600" style={commonTextStyles}>
                                        <span className="font-medium">Местоположение:</span> {personalInfo.address}
                                    </div>
                                )}
                            </div>
                        </div>

                        {personalInfo.photoUrl && (
                            <div className="mt-4 md:mt-0">
                                <img
                                    src={personalInfo.photoUrl}
                                    alt={personalInfo.fullName || 'Профиль'}
                                    className="w-24 h-24 rounded-full object-cover border-2"
                                    style={{ borderColor: primaryColor }}
                                />
                            </div>
                        )}
                    </div>

                    {personalInfo.summary && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold mb-1" style={commonTextStyles}>Обо мне</h3>
                            <div
                                className="text-sm text-gray-700"
                                style={commonTextStyles}
                                dangerouslySetInnerHTML={{ __html: personalInfo.summary }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Раздел с опытом работы */}
            {experience && experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b pb-1" style={sectionHeaderStyles}>
                        Опыт работы
                    </h2>

                    {experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between">
                                <h3 className="text-md font-semibold" style={commonTextStyles}>{exp.position}</h3>
                                <p className="text-sm text-gray-600" style={commonTextStyles}>
                                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- По настоящее время'}
                                </p>
                            </div>

                            <p className="text-sm font-medium text-gray-700" style={commonTextStyles}>
                                {exp.company}{exp.location ? `, ${exp.location}` : ''}
                            </p>

                            {exp.description && (
                                <div
                                    className="text-sm text-gray-700 mt-1"
                                    style={commonTextStyles}
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Раздел с образованием */}
            {education && education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b pb-1" style={sectionHeaderStyles}>
                        Образование
                    </h2>

                    {education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between">
                                <h3 className="text-md font-semibold" style={commonTextStyles}>
                                    {edu.degree}{edu.field ? ` по специальности ${edu.field}` : ''}
                                </h3>
                                <p className="text-sm text-gray-600" style={commonTextStyles}>
                                    {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : '- По настоящее время'}
                                </p>
                            </div>

                            <p className="text-sm font-medium text-gray-700" style={commonTextStyles}>
                                {edu.institution}
                            </p>

                            {edu.description && (
                                <div
                                    className="text-sm text-gray-700 mt-1"
                                    style={commonTextStyles}
                                    dangerouslySetInnerHTML={{ __html: edu.description }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Раздел с навыками */}
            {skills && skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b pb-1" style={sectionHeaderStyles}>
                        Навыки
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill, index) => (
                            <div key={index} className="mb-2">
                                <p className="text-sm font-medium text-gray-800" style={commonTextStyles}>
                                    {skill.name}
                                </p>
                                <div className="w-24 h-1 bg-gray-200 rounded mt-1">
                                    <div
                                        className="h-1 rounded"
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

            {/* Раздел с языками */}
            {languages && languages.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b pb-1" style={sectionHeaderStyles}>
                        Языки
                    </h2>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {languages.map((language, index) => (
                            <div key={index} className="mb-1">
                <span className="text-sm font-medium text-gray-800" style={commonTextStyles}>
                  {language.name}
                </span>
                                <span className="text-sm text-gray-600 ml-1" style={commonTextStyles}>
                  ({language.proficiency})
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Раздел с интересами */}
            {interests && interests.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b pb-1" style={sectionHeaderStyles}>
                        Интересы и хобби
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-sm rounded-full"
                                style={{
                                    backgroundColor: secondaryColor,
                                    color: secondaryTextColor,
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
    );
}