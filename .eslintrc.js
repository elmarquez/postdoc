module.exports = {
  extends: 'erb',
  globals: {
    describe: true,
    it: true
  },
  rules: {
    "array-callback-return": "warn",
    "class-methods-use-this": "warn",
    "import/extensions": "warn",
    "import/named": "warn",
    "import/no-unresolved": "warn",
    "import/prefer-default-export": "off",
    "jsx-a11y/alt-text": "warn",
    "no-empty": "warn",
    "import/no-named-as-default-member": "warn",
    "no-bitwise": "warn",
    "no-param-reassign": "warn",
    "no-plusplus": "warn",
    "no-proto": "warn",
    "no-prototype-builtins": "warn",
    "no-shadow": "warn",
    "no-undef": "warn",
    "no-underscore-dangle": "warn",
    "no-unused-expressions": "warn",
    "no-unused-vars": "warn",
    "no-useless-constructor": "warn",
    "prefer-promise-reject-errors": "warn",
    "promise/always-return": "warn",
    "promise/catch-or-return": "warn",
    "radix": "warn",
    "react/destructuring-assignment": "warn",
    "react/forbid-prop-types": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-props-no-spreading": "warn",
    "react/no-access-state-in-setstate": "warn",
    "react/no-array-index-key": "warn",
    "react/no-unused-prop-types": "warn",
    "react/no-unused-state": "warn",
    "react/prop-types": "warn",
    "react/require-default-props": "warn",
    "react/sort-comp": "warn"
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
}
