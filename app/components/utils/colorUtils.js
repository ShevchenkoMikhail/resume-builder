/**
 * Утилиты для работы с цветами
 */

/**
 * Преобразует HEX цвет в RGB
 * @param {string} hex - HEX цвет в формате #RRGGBB
 * @returns {Object} - RGB компоненты цвета
 */
export function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * Вычисляет относительную яркость цвета по формуле W3C
 * @param {string} color - HEX цвет
 * @returns {number} - Яркость от 0 (черный) до 1 (белый)
 */
export function getColorBrightness(color) {
    const rgb = hexToRgb(color);
    if (!rgb) return 0.5; // Возвращаем середину, если цвет не распознан

    // Формула для определения яркости (W3C)
    // (0.299 * R + 0.587 * G + 0.114 * B) / 255
    return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
}

/**
 * Определяет, должен ли текст быть темным или светлым на основе яркости фона
 * @param {string} backgroundColor - HEX цвет фона
 * @returns {string} - 'dark' или 'light'
 */
export function getContrastText(backgroundColor) {
    const brightness = getColorBrightness(backgroundColor);
    // Если яркость больше 0.5, фон считается светлым и текст должен быть темным
    return brightness > 0.5 ? 'dark' : 'light';
}

/**
 * Возвращает цвет текста (черный или белый) на основе цвета фона
 * @param {string} backgroundColor - HEX цвет фона
 * @returns {string} - 'black' или 'white'
 */
export function getTextColorForBackground(backgroundColor) {
    return getContrastText(backgroundColor) === 'dark' ? 'black' : 'white';
}