import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    validationType?: 'letters' | 'numbers';
    applyCpfMask?: boolean;
    applyDateMask?: boolean;
    error?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const MyInput: React.FC<InputProps> = ({
                                           id,
                                           label,
                                           validationType,
                                           applyCpfMask,
                                           applyDateMask,
                                           error,
                                           className = '',
                                           labelClassName = '',
                                           inputClassName = '',
                                           onChange,
                                           ...props
                                       }) => {

    const handleCpfMask = (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    };

    const handleDateMask = (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2}\/)(\d{2})(\d)/, '$1$2/$3')
            .substring(0, 10);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.currentTarget;
        let { value } = e.currentTarget;

        if (validationType === 'letters') {
            value = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (validationType === 'numbers' || applyCpfMask || applyDateMask) {
            value = value.replace(/\D/g, '');
        }
        if (applyCpfMask) {
            value = handleCpfMask(value);
        }
        if (applyDateMask) {
            value = handleDateMask(value);
        }
        const newEvent = {
            target: {
                name: name,
                value: value,
            },
        };
        if (onChange) {
            onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };
    const errorBorderClass = error ? 'border-red-500' : 'border-gray-300';
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className={`block text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errorBorderClass} ${inputClassName}`}
                onChange={handleChange}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default MyInput;
