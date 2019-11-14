# antd-custom-tpl 项目模版

#### yeoman + cli


---

## 说明

antd-custom-tpl 项目模版，实现项目模版的版本管理和控制。实现用户自由使用各版本，避免模板版本升级后不向下兼容，而对已使用了该模版的项目所带来的大改动。

## 功能

- 询问用户
- 拷贝自定义模板
- 自定安装依赖

## 调用方式
使用yeoman-environment调用
```js
// 更多调用方式 https://yeoman.io/authoring/integrating-yeoman.html
const tplName = 'antd-custom-tpl'
const tplDir = `.tmpl/node_modules/antd-custom-tpl` // 你安装antd-custom-tpl的文件夹
const env = require('yeoman-environment').createEnv()
const requireFrom = require('import-from').silent
env.register(requireFrom(tplDir, tplName), tplName)
env.run(tplName)
```

