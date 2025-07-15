// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default tseslint.config(
    { ignores: ['dist'] },

    js.configs.recommended,

    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            tailwindcss: tailwindcss,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,

            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            'tailwindcss/classnames-order': 'warn',
            'tailwindcss/no-custom-classname': 'off',
        },
    }
);
