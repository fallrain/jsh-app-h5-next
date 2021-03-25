module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'react-app',
    'react-app/jest',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    require: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: { jsx: true, },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/alt-text': 0,
    semi: [1, 'always'],
    'prefer-template': 1, // 推荐模板字符串
    'react/prop-types': 0,
    'consistent-return': 0, // 不用强制返回
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'comma-dangle': 0, // 末尾逗号
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2
      }
    ], // 最大行
    eqeqeq: 1,
    'prefer-destructuring': [
      'warn',
      {
        object: false,
        array: false,
      },
    ], // 只对象推荐解构
    'no-param-reassign': 0, // vuex不兼容
    'import/extensions': 0,
    'func-names': 0,
    'import/no-unresolved': 0, // ...
    'no-plusplus': 0, // 没必要禁止
    'no-bitwise': 0, // 没必要禁止
    'no-unused-expressions': 0, // 三元表达式、逻辑或没必要禁止
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-lonely-if': 0,
    'no-restricted-properties': 0,
    // 'object-curly-newline': [
    //   2,
    //   {
    //     ObjectExpression: {
    //       minProperties: 2,
    //       consistent: true
    //     },
    //     ObjectPattern: {
    //       minProperties: 2,
    //       consistent: true
    //     },
    //     ImportDeclaration: {
    //       minProperties: 2,
    //       consistent: true
    //     },
    //     ExportDeclaration: {
    //       minProperties: 2,
    //       consistent: true
    //     },
    //   },
    // ],
    'no-continue': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': 0,
    // 此规则bug太多，无法使用
    'react/no-unused-prop-types': 0,
    // 当属性为函数类型时没必要有默认值，否则会有额外执行步骤
    'react/require-default-props': 0,
    // 没必要
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    // class内方法不一定必须有this
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    // label不是一定需要
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', 'tsx'], },
    ],
    'react/static-property-placement': 0
  },
};
