module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: [
          "default",
          "since 2017-12"
        ],
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
