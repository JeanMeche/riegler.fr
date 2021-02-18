module.exports = {
    env: {
        browser: true,
        node: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:jsx-a11y/recommended' // Accessibility rules
    ],
    rules: {
        // Override our default settings just for this directory
        'react/react-in-jsx-scope': 'off', // not needed with nextjs
        'react/jsx-filename-extension': [
            2,
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            }
        ],
        'react/no-unescaped-entities': 0,
        '@typescript-eslint/no-var-requires': 0, // to allow require for next-optimized-images
    },
    overrides: [{
        files: [
            '**/*.tsx'
        ],
        rules: {
            'react/prop-types': 'off'
        }
    }]
}