# VueTurbo

## 技术依赖

* NodeJs >= 16.0
* Vue >= 3.3
* Vite >= 4.5
* Less
* PostCss
* Axios
* Axios-Jsonp
* TypeScript > = 5.2
* Pinia >= 2.1
* Vue-Router >= 3.3

## 项目结构

```
|-configs   // vite配置文件
	|-vite.config.base.ts	// 基础公用配置
	|-vite.config.start.ts	// 本地开发调试配置
	|-vite.config.dist.ts	// 测试环境
	|-vite.config.release.ts	// 正式环境
|-src	// 项目源码
    |-api   // 接口请求定义配置
    |-assets    // 静态资源目录（图片、css等）
    |-components    // 项目自定义组件
    |-views     // 页面
    |-router    // 路由配置
    |-stores    // 全局状态管理
    |-type      // 定义外部全局引用的变量
    |-utils     // 工具类
        |-request.ts    // 基于axios封装的ajax 和 jsonp 请求
    |-vite-end.d.ts     // 定义第三方非typescript模块
|-.eslintrc.js	// eslint规范检查配置
|-.stylelintrc.js   // stylelint规范检查配置
|-params.ts
|-tsconfig.json		// Typescript的编译配置
|-tsconfig.node.json	// Typescript的nodejs编译配置
```

## 启动命令

```bash
	// 本地测试
	pnpm run start
	// 打包测试环境
	pnpm run dist
	// 打包正式环境
	pnpm run release
```
