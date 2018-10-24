

和[课程](https://www.imooc.com/learn/935)完全一致的配置！

发现了个奇怪的事情，整个页面无法被点击，但是可以被vimium的快捷键选中？
+ 安装 browserslist

## 错误
+ No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future.
[问题分析](https://github.com/PanJiaChen/vue-element-admin/issues/722)prettier版本高于1.13.
手动删除（被依赖的库不能用`npm uni`删除）vue-loader 的prettier，然后`npm install prettier@~1.12`
