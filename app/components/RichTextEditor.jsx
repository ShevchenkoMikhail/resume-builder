'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт react-quill, чтобы избежать проблем с SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'align': [] }],
    ['clean']
];

export default function RichTextEditor({
                                           value,
                                           onChange,
                                           placeholder = '',
                                           className = ''
                                       }) {
    const [mounted, setMounted] = useState(false);
    const [editorValue, setEditorValue] = useState(value || '');

    // Устанавливаем mounted в true после монтирования компонента
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setEditorValue(value || '');
    }, [value]);

    const handleChange = (content) => {
        setEditorValue(content);
        if (onChange) {
            onChange(content);
        }
    };

    // Пока компонент не смонтирован, показываем простой textarea
    if (!mounted) {
        return (
            <textarea
                value={value || ''}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${className}`}
                rows={5}
            />
        );
    }

    return (
        <div className={`rich-text-editor ${className}`}>
            <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={handleChange}
                placeholder={placeholder}
                modules={{
                    toolbar: toolbarOptions
                }}
            />
        </div>
    );
}