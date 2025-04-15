export default function TextArea({
                                     label,
                                     name,
                                     value,
                                     onChange,
                                     placeholder = '',
                                     required = false,
                                     rows = 3,
                                     className = '',
                                     error = null
                                 }) {
    return (
        <div className="mb-4">
            {/* Отображаем метку, если она предоставлена */}
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm
          ${error ? 'border-red-500' : ''} ${className}`}
            />
            {/* Отображаем сообщение об ошибке, если оно есть */}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}