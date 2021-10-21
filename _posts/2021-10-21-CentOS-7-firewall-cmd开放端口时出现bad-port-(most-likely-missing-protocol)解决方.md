使用firewall-cmd命令打开端口时遇到了"bad port (most likely missing protocol), correct syntax is portid[-portid]/protocol"这个问题。

百度了下没解决方案，又看了一遍错误提示和输入的命令后被自己蠢哭了

废话不多说，问题的原因是命令中add-port参数值的正确格式为[端口号/协议]，而当前执行的命令中只写了端口号，没有指定协议

正确的命令为: firewall-cmd --zone=public --add-port=8020/tcp --permanent

当然之后别忘记 firewall-cmd --reload 重启防火墙

