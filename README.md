使用@vue/cli完成Todo.
确实方便，把之前的代码复制过去就能跑，因为各种loader,jsx支持,甚至clean-webpack-plugin都已经由vue-cli-service配置好了。


## 修改
#### serve时，prettier发出很多warnings potentially fixable with the `--fix` option  
就是说明代码需要lint以下，所以lint一下就行了：
+ npx vue-cli-service help lint  查看lint选项
+ npm run lint 

#### build时，error: Unexpected console statement (no-console) at src\components\todo.vue

.eslintrc.js中,production阶段有"no-console"的rule.所以应该去掉后再build.

