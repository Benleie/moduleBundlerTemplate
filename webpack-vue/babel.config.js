module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '37',
          chrome: '67',
          safari: '11.1',
        },
        useBuiltIns: 'entry',
        corejs: '3',
      },
    ],
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
      },
    ],
  ],
};
