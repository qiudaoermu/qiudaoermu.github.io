### Mac端环境变量配置
Mac使用bash做为默认的shell

MAC OS X环境配置的加载顺序
```
# 系统级别
/etc/profile
/etc/paths 

# 用户级别
~/.zshrc
```
前两个是系统级别的环境变量，针对所有用户，后面四个带有~/用户级别的环境变量。
-前两个环境配置在系统启动时候就会加载。
- **~/.zshrc** 是zsh shell打开时候加载

之前mac 是使用bash
新版本mac默认使用zsh，所以配置的.bash_profile不能生效，需要再配置.zshrc（新建.zshrc）
配置内容：
```
if [ -f ~/.bash_profile ]; then
source ~/.bash_profile
fi
```
