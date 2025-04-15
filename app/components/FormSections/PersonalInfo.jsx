import Input from '@/app/components/ui/Input';
import TextArea from '@/app/components/ui/TextArea';

export default function PersonalInfo({ data, onChange }) {
    // Обработчик изменения полей в форме личной информации
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({
            ...data,
            [name]: value
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Личная информация</h2>

            <Input
                label="Полное имя"
                name="fullName"
                value={data.fullName || ''}
                onChange={handleChange}
                placeholder="Иван Иванов"
                required
            />

            <Input
                label="Профессия"
                name="profession"
                value={data.profession || ''}
                onChange={handleChange}
                placeholder="Разработчик программного обеспечения"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email || ''}
                    onChange={handleChange}
                    placeholder="ivan.ivanov@example.com"
                    required
                />

                <Input
                    label="Телефон"
                    name="phone"
                    value={data.phone || ''}
                    onChange={handleChange}
                    placeholder="+7 123 456 7890"
                />
            </div>

            <Input
                label="Адрес"
                name="address"
                value={data.address || ''}
                onChange={handleChange}
                placeholder="Москва, Россия"
            />

            <Input
                label="URL фотографии"
                name="photoUrl"
                value={data.photoUrl || ''}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
            />

            <TextArea
                label="Профессиональное резюме"
                name="summary"
                value={data.summary || ''}
                onChange={handleChange}
                placeholder="Краткое описание вашего профессионального опыта и целей"
                rows={4}
            />
        </div>
    );
}