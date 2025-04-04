module.exports = {
  overrides: [
    {
      files: ['**/src/**/*'],
      rules: {
        'max-lines': ['off'],
      },
    },
  ],
  rules: {
    'max-lines': ['error', {max: 600, skipComments: true}],
  },
}
// Do not delete, this is used by the linter to check your tests line count
