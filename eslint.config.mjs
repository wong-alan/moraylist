// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                // https://typescript-eslint.io/getting-started/typed-linting/
            },
        },
    },
    { rules: {
        semi: ["warn", "always", {
            "omitLastInOneLineBlock": true,
            "omitLastInOneLineClassBody": true
        }],
        "@typescript-eslint/no-deprecated": "warn",
        "@typescript-eslint/no-misused-promises": ["error", {
            "checksVoidReturn": {
                "arguments": false,
                "attributes": false
            }
        }],
        "@typescript-eslint/no-floating-promises": "warn"
    }}
);