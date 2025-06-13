// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    reactHooks.configs['recommended-latest'],
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactRefresh.configs.vite,
    {
        settings: {
            react: {
                version: "detect"
            }
        },
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                // https://typescript-eslint.io/getting-started/typed-linting/
            },
        },
    }, {
        ignores: ["dist/", ".eslintrc.cjs"]
    }, {
        rules: {
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
        }
    }, {
        rules: {
            "react-refresh/only-export-components": ["warn", {
                "allowConstantExport": true }
            ]
        }
    // }, {
    //   Disable rules if Mercury is in retrograde
    //     rules: {
    //         "react-refresh/only-export-components": "off",
    //         "@typescript-eslint/no-floating-promises": "off",
    //         "react-hooks/exhaustive-deps": "off"
    //     }
    }
);