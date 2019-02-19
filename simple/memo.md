## 备注
"dependencies"和"devDependencies"都随意，主要看有没有兴趣用`- D`. 安装的库是默认`--save`的。



## 遇到的一些警告和错误
#### No parser and no filepath given, using 'babylon' the parser now but this will throw an error in the future.

[问题分析](https://github.com/PanJiaChen/vue-element-admin/issues/722)prettier版本高于1.13.0  这个bug在vue-loader@13.7.2之后被解决。
手动删除（被依赖的库不能用`npm uni`删除）vue-loader 的prettier，然后`npm install prettier@~1.12`

#### 整个页面无法被点击！鼠标被禁用！但是可以被vimium的快捷键选中？

因为APP.vue中使用了`z-index:-1`的样式，注释掉！
