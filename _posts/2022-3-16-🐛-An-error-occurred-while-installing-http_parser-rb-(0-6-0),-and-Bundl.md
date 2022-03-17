---
  layout: post
  tilte: "🐛-An-error-occurred-while-installing-http_parser-rb-(0-6-0),-and-Bundl.md"
  date: 2022-3-16-
  tags: 
    - 开发日常

---


* content
{:toc}


### 问题
 $ `bundle install`

```
An error occurred while installing http_parser.rb (0.6.0), and Bundler cannot continue.

In Gemfile:
  jekyll was resolved to 4.2.1, which depends on
    em-websocket was resolved to 0.5.2, which depends on
      http_parser.rb

```
打开错误日志
```
"pkg-config --exists openssl" 
 package configuration for openssl is not found
```
 
### 原因：没有正确设置PATH导致的问题

**mac 使用默认的ruby 版本，要更新最新版本 ruby 并且覆盖**
### 解决方法:
$ `brew install ruby`

$ `brew link --overwrite ruby`

```
If you need to have ruby first in your PATH run:
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc

For compilers to find ruby you may need to set:
export LDFLAGS="-L/usr/local/opt/ruby/lib"
export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"
```

在 .zshrc 加入 'export PATH="/usr/local/opt/ruby/bin:$PATH"'

$ `source ~/.zshrc`
