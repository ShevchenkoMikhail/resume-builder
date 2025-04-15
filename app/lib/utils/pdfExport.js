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
        // Сохраняем оригинальные стили для дальнейшего восстановления
        const originalStyles = {
            width: element.style.width,
            height: element.style.height,
            overflow: element.style.overflow,
            transform: element.style.transform,
            transformOrigin: element.style.transformOrigin
        };

        // Устанавливаем фиксированную ширину для A4 на экране (210мм при 96dpi)
        element.style.width = '794px'; // примерно A4 ширина в пикселях при 96dpi
        element.style.overflow = 'hidden';
        element.style.transform = 'none';
        element.style.transformOrigin = 'center top';

        // Ожидаем полной перерисовки DOM перед захватом canvas
        await new Promise(resolve => setTimeout(resolve, 100));

        // Создаем PDF формата A4
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Размеры A4 в мм
        const pageWidth = 210;
        const pageHeight = 297;

        // Поля в мм
        const margin = 10;
        const contentWidth = pageWidth - 2 * margin;
        const contentHeight = pageHeight - 2 * margin;

        // Создаем canvas из HTML-элемента с улучшенными настройками
        const canvas = await html2canvas(element, {
            scale: 2, // Увеличиваем масштаб для лучшего качества
            useCORS: true, // Разрешаем загрузку изображений с других доменов
            logging: false, // Отключаем логирование для производительности
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            allowTaint: true, // Разрешаем использование потенциально небезопасного контента
            backgroundColor: '#ffffff', // Устанавливаем белый цвет фона
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc) => {
                // Добавляем специальные стили для клонированного документа
                const style = clonedDoc.createElement('style');
                style.innerHTML = `
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        `;
                clonedDoc.head.appendChild(style);
            }
        });

        // Получаем данные из canvas как изображение с высоким качеством
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Размеры и соотношение сторон оригинального контента
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;
        const ratio = originalHeight / originalWidth;

        // Вычисляем, сколько страниц нам понадобится
        const totalPages = Math.ceil((ratio * contentWidth) / contentHeight);

        // Высота на одну страницу в пикселях (на canvas)
        const pageHeightInPx = originalHeight / totalPages;

        // Добавляем каждую страницу в PDF
        for (let i = 0; i < totalPages; i++) {
            // Для страниц после первой добавляем новую страницу в PDF
            if (i > 0) {
                pdf.addPage();
            }

            // Вычисляем, какую часть изображения показывать на этой странице
            const sourceY = i * pageHeightInPx;
            const sourceHeight = Math.min(pageHeightInPx, originalHeight - sourceY);

            // Добавляем часть изображения на страницу
            pdf.addImage(
                imgData,
                'JPEG',
                margin, // X-координата (отступ слева)
                margin, // Y-координата (отступ сверху)
                contentWidth, // Ширина содержимого на странице PDF
                (sourceHeight * contentWidth) / originalWidth, // Пропорциональная высота
                null, // Псевдоним (не нужен)
                'FAST', // Сжатие (для скорости)
                0, // Поворот
                sourceY, // Начальная Y-координата исходного изображения
                originalWidth, // Ширина исходного изображения
                sourceHeight // Высота части исходного изображения для этой страницы
            );
        }

        // Сохраняем PDF
        pdf.save(filename);

        // Восстанавливаем оригинальные стили элемента
        for (const [prop, value] of Object.entries(originalStyles)) {
            element.style[prop] = value;
        }

        return pdf;
    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
        alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз.');
    }
}