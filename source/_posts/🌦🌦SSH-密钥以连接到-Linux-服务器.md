---
title: "🌦🌦SSH-密钥以连接到-Linux-服务器"
date: 2025-06-20
tags: 
- 开发日常
---
在 Mac 电脑上配置 SSH 密钥以连接到 Linux 服务器，主要步骤如下：

---

### **1. 生成 SSH 密钥对（在 Mac 上）**
打开 Mac 的终端（Terminal），执行以下命令生成密钥对：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
- `-t ed25519`：使用更安全的 Ed25519 算法（也支持 `-t rsa -b 4096`）。
- 提示输入保存路径时，直接按回车使用默认路径（`~/.ssh/id_ed25519`）。
- 设置一个安全的密钥密码（可选，增强安全性）。

---

### **2. 将公钥上传到 Linux 服务器**
#### **方法一：使用 `ssh-copy-id`（推荐）**
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub username@linux_server_ip
```
- 输入 Linux 用户的密码，公钥会自动追加到服务器的 `~/.ssh/authorized_keys` 文件中。

#### **方法二：手动复制公钥**
1. 查看公钥内容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. 登录 Linux 服务器：
   ```bash
   ssh username@linux_server_ip
   ```
3. 在服务器上创建 `~/.ssh/authorized_keys` 并粘贴公钥：
   ```bash
   mkdir -p ~/.ssh
   echo "粘贴你的公钥内容" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   ```

---

### **3. 测试 SSH 免密登录**
```bash
ssh username@linux_server_ip
```
- 如果密钥有密码，首次登录会提示输入密钥密码。
- 成功登录说明配置正确。
PS :记得加用户名 username 否则默认当前电脑用户

# 使用默认用户名（当前系统用户名）
ssh 10.200.255.99

# 指定用户名
ssh mac@10.200.255.99

# 指定端口（默认是22，如果改了端口需要指定）
ssh -p 2222 mac@10.200.255.99

通过以上步骤，你的 Mac 就可以通过 SSH 密钥安全地连接到 Linux 服务器了！
