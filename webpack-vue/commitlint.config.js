module.exports = {
  extends: ['cz'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0],
    'type-case': [0],
    'scope-case': [0],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能、页面
        'fix', // 修补 bug
        'wip', // wip
        'docs', // 修改文档、注释
        'style', // 代码格式修改, 注意不是 CSS 修改
        'ui', // 纯 UI 修改：布局、CSS 样式等
        'chore', // 其他不修改 src 和测试文件的不重要的更改
        'hotfix', // 修复线上紧急 bug
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'refactor', // 重构
        'revert', // 回滚到上一个版本
        'perf', // 优化相关，比如提升性能、体验
        'ci', // 持续集成修改
        'test', // 测试用例修改
      ],
    ],
  },
};
