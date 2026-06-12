import js from '@eslint/js';
import json from '@eslint/json';

import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
const intechEslintJsConfig =  {
  files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
  // http://eslint.org/docs/rules/
  rules: {
    // Methods that alter an array (filtering / mapping / folding) should always
    // return a value, else it's a sign of a mistake and one should consider
    // using a .forEach instead.
    'array-callback-return': 'error',
    // We think that omitting curly braces is a bad practice, as it can lead to
    // bugs and makes the code harder to read, so we want to enforce the use of
    // curly braces in all control structures.
    'curly': 'error',
    // Default case should always be present in a switch statement to avoid any
    // unexpected behavior, unless it's intentionally omitted and marked with a
    // "no default" comment after the last case.
    'default-case': [
      'error',
      {
        commentPattern: '^no default$',
      },
    ],
    // We consider a good practice to use the type-safe equality operators ===
    // and !== instead of the type-coercing operators == and !=, so we want to
    // enforce this usage. However, we want to allow type-coercing operators in
    // cases where it's useful, like when comparing with null (!= null) to check
    // for both null and undefined.
    'eqeqeq': ['error', 'smart'],
    // We don't see any good reason to construct a new array using the Array
    // constructor instead of the array literal notation.
    'no-array-constructor': 'error',
    // The use of arguments.caller and arguments.callee has been deprecated,
    // so we aim at discouraging their use by disallowing them.
    'no-caller': 'error',
    // We consider the use of console.log() in production code a bad practice,
    // but it's useful for debugging purposes during development, and console is
    // used in Node.js to output information to the user, so we won't throw an
    // error, but we'll warn about it.
    'no-console': 'warn',
    // Duplicating imports will make the code unclear and harder to maintain,
    // so we want to enforce a single import per module.
    'no-duplicate-imports': 'error',
    // Empty functions should not go in production code, as they are a sign of
    // a mistake or a leftover from development. Just add a comment in the function
    // body to explain why it's empty and the error will go away.
    'no-empty-function': 'error',
    // We know that using eval is dangerous and should be avoided, but there are
    // some cases where it's useful, so we'll only warn about it.
    'no-eval': 'warn',
    // We don't see any good reason to extend native objects, as it can lead to
    // unexpected behavior and bugs, so we want to discourage this practice.
    // Just create a new object that inherits from the native object instead.
    'no-extend-native': 'error',
    // ESLint recommended configuration doesn't disallow the bad use of bind(),
    // so we want to enforce the use of bind() only when it's necessary.
    'no-extra-bind': 'error',
    // Labels are already confusing enough, so we want to avoid using them
    // where they are not necessary.
    'no-extra-label': 'error',
    // Don't use implied eval, they are dangerous and can lead to security
    // vulnerabilities. Use function instead.
    'no-implied-eval': 'error',
    // Iterator property is obsolete and should not be used.
    'no-iterator': 'error',
    // Labels are already confusing enough, so don't name them the same as
    // variables or functions.
    'no-label-var': 'error',
    // Labels are hard to read, so we want to avoid using them, but they can
    // be useful in multi-level loops, so we'll only warn about them.
    'no-labels': [
      'error',
      {
        allowLoop: true,
        allowSwitch: false,
      },
    ],
    // Lone blocks do not have any effect and can be confusing, so we want to
    // avoid them.
    'no-lone-blocks': 'error',
    // We want to avoid using lonely if statements inside else blocks, as they
    // can be merged into the above else block.
    'no-lonely-if': "error",
    // We want to avoid using functions inside loops, as they rarely work as
    // we would expect them to. Just create outer functions.
    'no-loop-func': 'error',
    // Yes, it's possible to create multiline strings using backslashes, but
    // template literals exist and are much more readable.
    'no-multi-str': 'error',
    // Don't create functions with the Function constructor as they considered 
    // by many to be a bad practice due to the difficulty in debugging and 
    // reading these types of functions.
    'no-new-func': 'error',
    // Some JavaScript global variables begin with an uppercase letter, but
    // are not classes, so we want to avoid using them as constructors.
    'no-new-native-nonconstructor': 'error',
    // "string", "number" and "boolean" primitive types have wrapper objects.
    // However using those wrapper objects would create an object instead of a
    // primitive value. To avoid any confusion, we want to disallow them.
    'no-new-wrappers': 'error',
    // We don't see any good reason to construct a new object using the Object
    // constructor instead of the object literal notation.
    'no-object-constructor': 'error',
    // Octal escape sequences are deprecated and should be replaced with unicode
    // or hexadecimal escape sequences instead.
    'no-octal-escape': 'error',
    // We want to prevent the use of relative imports, as they can lead to
    // confusion and bugs. Use absolute paths instead.
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    // Prevents the usage require.ensure() and System.import() functions in favor 
    // of import() function.
    'no-restricted-properties': [
      'error',
      {
        object: 'require',
        property: 'ensure',
        message: 'Please use import() instead.',
      },
      {
        object: 'System',
        property: 'import',
        message: 'Please use import() instead.',
      },
    ],
    // We wan't to disallow the use of certain syntaxes such as with statements.
    'no-restricted-syntax': ['error', 'WithStatement'],
    // Disables script urls, as they are a form of eval which we already avoid as 
    // much as possible.
    'no-script-url': 'error',
    // Comparing a variable with itself is a sign of a mistake, so we want to
    // avoid it.
    'no-self-compare': 'error',
    // We don't see any good reason to use the comma operator, this use is often
    // an accident, so we'll throw an error.
    'no-sequences': 'error',
    // Adding variables or expressions using template literals in a regular
    // string is a mistake and should only be used in template literals.
    'no-template-curly-in-string': 'error',
    // Throwing something other than an Error is an anti-pattern. We must always
    // throw an Error object or an object that inherits from it.
    'no-throw-literal': 'error',
    // Unused expressions are not a syntax error, but they do not make sense and
    // have no effect. However we want to allow them in certain useful cases such
    // as short-circuiting, ternary operators and tagged templates.
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    // Using a variable / classes / functions before they're declared can lead to 
    // confusion. However it's allowed by JavaScript and can be useful in some
    // situations, so we'll only warn about it.
    'no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    // We want to use computed keys only when they are necessary, as they can
    // make the code harder to read.
    'no-useless-computed-key': 'error',
    // Avoid unnecessary concatenation of strings.
    'no-useless-concat': 'error',
    // Renaming statements with the same name is useless and can lead to confusion.
    'no-useless-rename': 'error',
    // We don't see any good reason to prefer var over let or const, so we want to
    // enforce their use.
    'no-var': 'error',
    // Template literals are slightly more performant and easier to read than string
    // concatenations, so we want to enforce their use.
    'prefer-template': 'error',
    // As each file should be UTF-8 encoded, we want to enforce the absence of
    // the Unicode Byte Order Mark (BOM) at the beginning of the file.
    'unicode-bom': ['error'],
  },
};

/** @type {import('eslint').Linter.Config[]} */
const intechEslintJsonConfig = [
  // lint JSON files
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },

  // lint JSONC files
  {
    files: ["**/*.jsonc"],
    language: "json/jsonc",
    ...json.configs.recommended,
  },

  // lint JSONC files and allow trailing commas
  {
    files: ["**/tsconfig.json", ".vscode/*.json"],
    language: "json/jsonc",
    languageOptions: {
      allowTrailingCommas: true,
    },
    ...json.configs.recommended,
  },

  // lint JSON5 files
  {
    files: ["**/*.json5"],
    language: "json/json5",
    ...json.configs.recommended,
  },
];

export default defineConfig(
  {
    languageOptions: { 
      globals: {...globals.browser, ...globals.node},
    },
  },
  // ESLint recommended rules
  {
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    ...js.configs.recommended,
  },
  // TypeScript ESLint strict and stylistic configs + custom rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    extends: [
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    rules: {
      // Array type and brackets for defining arrays are equivalent, 
      // but we want to enforce the use of brackets as it feels more 
      // natural and readable.
      '@typescript-eslint/array-type': 'error',
      // TypeScript configuration enforces the use of interfaces over types,
      // but we want to do the opposite. See the following article for more
      // information: https://www.totaltypescript.com/type-vs-interface-which-should-you-use
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // TypeScript configuration to add 'type' keyword on imports to indicate that
      // the export exists only in the type system, not at runtime
      '@typescript-eslint/consistent-type-imports': 'error',
      // TypeScript config already disallows the use of namespaces, but we
      // want to allow them for global namespace augmentation such as ProcessEnv
      // interface augmentation.
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      // Disable eslint 'no-shadow' rule in favor of typescript-eslint 
      // 'no-shadow' rule for TS files.
      'no-shadow': 'off',
      // Variable shadowing is allowed by default in TypeScript, but we
      // want to ensure that it never happens to avoid confusion and
      // potential bugs.
      '@typescript-eslint/no-shadow': 'error',
      // TypeScript config already marks unused variables as errors, but
      // we want to ignore unused parameters for debugging purposes
      // during development. Additionally, we want to ignore unused
      // rest siblings to help with destructuring.
      // NB: ESLint 'no-unused-vars' rule is already disabled by 
      // typescript-eslint strict-type-checked config.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // InTech ESLint JS rules (additional rules + overriding recommended rules)
  intechEslintJsConfig,
  // InTech ESLint JSON rules (recommended rules)
  ...intechEslintJsonConfig,
  // Disable ESLint rules that conflict with Prettier
  eslintConfigPrettier,
);
