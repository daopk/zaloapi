const { ignores } = require('@daopk/eslint-config-ignores')
const { javascript } = require('@daopk/eslint-config-javascript')
const { node } = require('@daopk/eslint-config-node')
const { imports } = require('@daopk/eslint-config-imports')
const { typescript } = require('@daopk/eslint-config-typescript')
const { stylistic } = require('@daopk/eslint-config-stylistic')

module.exports = [
  ...ignores(),
  ...javascript(),
  ...node(),
  ...imports(),
  ...typescript(),
  ...stylistic(),
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
