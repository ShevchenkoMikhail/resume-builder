import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Экспортирует элемент в PDF с поддержкой нескольких страниц
 * @param {string} elementId - ID элемента для экспорта
 * @param {string} filename - Имя выходного файла
 * @returns {Promise<Object>} - Promise с созданным PDF
 */
export async function exportToPdf(elementId, filename = 'resume.pdf') {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Элемент с id ${elementId} не найден`);
        return;
    }

    try {
        // Создаем PDF формата A4
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Создаем canvas из HTML-элемента
        const canvas = await html2canvas(element, {
            scale: 2, // Увеличиваем масштаб для лучшего качества
            useCORS: true, // Разрешаем загрузку изображений с других доменов
            allowTaint: true // Разрешаем использование небезопасного контента
        });

        // Получаем данные из canvas как изображение
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Добавляем изображение на страницу PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

        // Сохраняем PDF
        pdf.save(filename);
    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
        alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз.');
    }
}