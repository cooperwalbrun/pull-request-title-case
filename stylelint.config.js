module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-html' // We added this so that we can target plain .html files with stylelint
  ],
  plugins: [
    // The stylelint-config-sass-guidelines dependency bundles these plugins; see:
    // https://www.npmjs.com/package/stylelint-config-sass-guidelines
    // 'stylelint-order',
    // 'stylelint-scss'
  ],
  rules: {
    'max-nesting-depth': 4,
    'selector-max-id': 1,
    'selector-max-compound-selectors': 4,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'] // See: https://stackoverflow.com/a/72161880
      }
    ]
  }
};
