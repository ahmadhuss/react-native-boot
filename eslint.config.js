// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,

  // Register the plugin and rules
  {
    plugins: {
      'react-native': reactNative
    },
    rules: {
      'react-native/no-unused-styles': 'error'
    }
  },

  // keep ignores last
  {
    ignores: ['dist/*']
  }
]);
