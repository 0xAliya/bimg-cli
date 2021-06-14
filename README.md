# Typora 图床命令工具

## 使用方式

```
npm install bimg-cli -g
```



## 使用 Gitee

1. 创建一个 gitee 仓库，记得设置为开源。

  ![image-20210614155643628](https://gitee.com/penla/image-bed/raw/master/image/16236574363750.png)

2. 生成 token

   点击生成令牌

  ![image-20210614153809819](https://gitee.com/penla/image-bed/raw/master/image/16236575299960.png)

   进行安全验证

  ![image-20210614153906678](https://gitee.com/penla/image-bed/raw/master/image/16236575323370.png)

  生成成功，**记得保存好token，页面关闭后再也没法查看了**



  ![image-20210614154417766](https://gitee.com/penla/image-bed/raw/master/image/16236575373270.png)



3. 打开 Typora 中偏好设置的图像，上传服务设置为 **Custom Command** ，命令填写

```sh
bimg upload --type gitee -t <token> -o <owner> -r <repo> -p <path>
```

例如

```sh
bimg upload --type gitee -t xxxx -o PenLa -r image-bed -p image
```


![image-20210614154623839](https://gitee.com/penla/image-bed/raw/master/image/16236575963270.png)


点击图片服务验证成功后，可以看到图片的url地址，点击链接可以验证是否上传成功。

![image-20210614155227097](https://gitee.com/penla/image-bed/raw/master/image/16236587516850.png)


Typora 图片打开右击菜单，点击图片上传

![image-20210614155036422](https://gitee.com/penla/image-bed/raw/master/image/16236587485010.png)

![image-20210614155107795](https://gitee.com/penla/image-bed/raw/master/image/16236587467570.png)


上传成功后可以看到，图片的地址变成了 gitee 仓库的地址

![image-20210614155826982](https://gitee.com/penla/image-bed/raw/master/image/16236587449550.png)