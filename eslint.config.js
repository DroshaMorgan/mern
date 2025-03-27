// import globals from 'globals';
// import eslint from '@eslint/js';
// import tsEslint from 'typescript-eslint';
// import pluginPrettier from 'eslint-plugin-prettier';
// // NB: See https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
// // import tailwind from 'eslint-plugin-tailwindcss';

// export default tsEslint.config(
//     {
//         ignores: [
//             'node_modules',
//             'generated',
//             '.react-router',
//             'build',
//             'vite.config.ts',
//             'orval.config.ts',
//             'eslint.config.js',
//         ],
//     },
//     {
//         extends: [
//             eslint.configs.recommended,
//             ...tsEslint.configs.strictTypeChecked,
//         ],
//         plugins: {
//             prettier: pluginPrettier,
//         },
//         languageOptions: {
//             ecmaVersion: 'latest',
//             globals: globals.browser,
//             parser: tsEslint.parser,
//             parserOptions: {
//                 ecmaVersion: 'latest',
//                 sourceType: 'module',
//                 tsconfigRootDir: import.meta.dirname,
//                 project: ['tsconfig.json'],
//             },
//         },
//         rules: {
//             ...pluginPrettier.configs.recommended.rules,

//             '@typescript-eslint/no-unused-vars': [2, {argsIgnorePattern: '^_', ignoreRestSiblings: true}],
//             '@typescript-eslint/consistent-type-imports': [2],
//             '@typescript-eslint/no-misused-promises': [1],
//             '@typescript-eslint/restrict-template-expressions': [0],
//             '@typescript-eslint/only-throw-error': [1],

//             'no-console': [2],
//         },
//     },
// );
