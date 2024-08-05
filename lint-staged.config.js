module.exports = {
  // We intentionally write the line below as a function so that lint-staged will only execute the
  // given command once instead of once for each staged file
  '*.{js,ts,mts,html,css,scss}': fileNames => 'npm run lint-and-format'
};
