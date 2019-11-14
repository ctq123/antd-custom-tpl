const fs = require('fs')
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class GeneratorAntdCustom extends Generator {

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入项目名称(antd-custom)：',
        default: 'antd-custom',
        validate(name) {
          if (fs.readdirSync('.').includes(name)) return '目录已存在'
          return true
        }
      },
      {
        type: 'input',
        name: 'version',
        message: '请输入项目版本号(0.0.1):',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
      },
    ]).then(props => {
      this.props = props
    })
  }

  writing() {
    const { name } = this.props
    // 改写并复制package.json文件
    const tmplpkg = this.fs.readJSON(this.templatePath('package.json'), {})
    this.fs.writeJSON(this.destinationPath(name, 'package.json'), { ...tmplpkg, ...this.props })
    // 复制其他文件
    fs.readdirSync(this.templatePath())
    .filter(name => name !== 'package.json')
    .forEach(item => {
      this.fs.copy(this.templatePath(item), this.destinationPath(name, item))
    })
  }

  install() {
    this.log(`开始安装项目依赖包...`)
    this.log()
    const projectDir = path.join(process.cwd(), this.answers.name)
    this.spawnCommandSync('npm', ['install', '--registry=https://registry.npmjs.org'], { cwd: projectDir })
  }

  end() {
    this.log()
    this.log(`项目依赖包安装完成！`)
    this.log()
    this.log(`一切准备就绪！运行 npm start 启动项目`)
    this.log()
    process.exit(0)
  }

  log(str='', color='yellow') {
    const co = chalk[color] || chalk.yellow
    console.log(co(str))
  }
}