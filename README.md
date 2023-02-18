# 谷粒微课 vue3+ts+pinia版本
小程序本地开发：

先安装依赖

node依赖版本：`v16.7.0`

```
yarn install
```

启动开发服务器

```
yarn dev:mp-weixin
```

运行小程序

微信开发者工具版本：`Stable 1.0.6` ,调试基础库`2.30.0`，

启动以后将`dit/dev/mp-weixin`目录下的文件在微信开发者工具打开即可

小程序打包：

```
yarn build:mp-weixin
```

打包之后将 `dist/build/mp-weixin` 中的文件上传到小程序开发者工具