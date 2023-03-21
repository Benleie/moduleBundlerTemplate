module.exports = {
  presets: [
    // ['@vue/cli-plugin-babel/preset', {
    //   useBuiltIns: 'entry',
    //   debug: true
    // }],
    ['@babel/preset-env',
    {
      targets: {
        edge: '17',
        firefox: '37',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'entry',
      debug: true,
      corejs: '3',
    },]
  ]
}