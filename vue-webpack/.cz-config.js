module.exports = {
  types: [
    { value: 'feat', name: 'feat:     功能 - 新增功能、页面' },
    { value: 'fix', name: 'fix:      修复 - 某个 bug' },
    { value: 'wip', name: 'wip:      功能 - 开发中' },
    { value: 'docs', name: 'docs:     文档 - 修改/增加文档、注释' },
    {
      value: 'style',
      name: 'style:    格式 - 不影响代码运行的变动、空格、格式化等',
    },
    { value: 'ui', name: 'ui:       界面 - 修改布局、CSS 样式等' },
    {
      value: 'chore',
      name: 'chore:    其他 - 不修改 src 目录及测试文件的修改',
    },
    { value: 'hotfix', name: 'hotfix:   修复 - 线上紧急 bug' },
    { value: 'build', name: 'build:    构建 - 项目打包构建相关更改' },
    {
      value: 'refactor',
      name: 'refactor: 重构 - 代码重构，未新增任何功能和修复任何 bug',
    },
    { value: 'revert', name: 'revert:   回退 - 代码回退到某个版本节点' },
    { value: 'perf', name: 'perf:     优化 - 提升性能、用户体验等' },
    { value: 'ci', name: 'ci:       CI/CD 配置文件和脚本更改' },
    { value: 'test', name: 'test:     测试 - 包括单元测试、集成测试' },
  ],
  scopes: [{ name: '列表页' }, { name: '登录页' }],
  // 交互提示信息
  messages: {
    type: '选择提交类型:',
    scope: '选择影响范围（可选）:',
    customScope: '表示此更改的范围:', // used if allowCustomScopes is true
    subject: '短说明:\n',
    body: '长说明，使用"|"符号换行（可选）:\n',
    breaking: '非兼容性说明（可选）:\n',
    footer: '关联关闭的 issue 等，例如：#31, #34（可选）:\n',
    confirmCommit: '确定提交说明?（y/n）',
  },
  allowCustomScopes: true,
  // 设置选择了哪些 type，才询问 breaking message
  allowBreakingChanges: ['feat', 'hotfix', 'refactor', 'perf'],
  subjectLimit: 100,
};
