module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        // Stage 2
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        // Stage 3
        '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
        development: { // If you want to enable this plugin only in development NODE_ENV
            plugins: [['babel-plugin-pseudolocalize-react-native', {extraLength: 0.5, customLanguageMap: {a: "Ä̬"}}]]
        }
    }
};
