#### 问题描述：
使用git clone项目，出现The project you were looking for could not be found

#### 原因：
git自动保存了用户名密码，当前项目的用户名密码与之前的发生冲突。
很有可能是github设置了用户名和密码，当你在别的平台使用git时用户名就不一样了，发生错误

#### 解决方案：
（1)一次性
```sh
git clone http://mygitusername@git.coding.net/name/project.git
```
（2）永久

`windows:`

清除本地git账户，重新输入用户名与密码。
```
git config --system --unset  credential.helper
```
之后再进行git操作时，弹出用户名密码窗口，输入即可。

` mac:`
```sh
git config --global credential.username <mygitusername>
```
> [Git密码（登录凭证）的保存和重置 Mac](https://blog.csdn.net/lynnjinglei/article/details/119025494)
