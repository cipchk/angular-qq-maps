# angular-qq-maps
Angular 2+ QQ Maps Components

[![NPM version](https://img.shields.io/npm/v/angular-qq-maps.svg)](https://www.npmjs.com/package/angular-qq-maps)
[![Build Status](https://travis-ci.org/cipchk/angular-qq-maps.svg?branch=master)](https://travis-ci.org/cipchk/angular-qq-maps)


## Demo

[Live Demo](https://cipchk.github.io/angular-qq-maps/)

### 1、安装

```
npm install angular-qq-maps --save
```

把 `AqmModule` 模块导入到你项目中。

```typescript
import { AqmModule } from 'angular-qq-maps';

@NgModule({
    imports: [ 
        BrowserModule,
        AqmModule.forRoot({
            apiKey: '' // app key为必选项
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2、使用

**地图组件**

```html
<aqm-map #map [options]="options" (ready)="onReady($event)" style="height: 300px;"></aqm-map>
```

**街景组件**

```html
<aqm-panorama #map [options]="options" (ready)="onReady($event)" style="height: 500px;"></aqm-panorama>
```

默认自动异步加载 js 类库，所以只需要在 NgModule 提供 api key 就可以立即使用了。 `options` 等同腾讯地图 `new qq.maps.Map(mapContainer, options)`。

## 关于事件注意点（很重要，请认真阅读）

我精力有限，而如果真要以Angular的角度去开发腾讯地图工作量非常大，而且官网也并无提供一份良好的Typescript接口定义，所以放弃过度性封装。正因为如此，所以您在注册**事件**的时候还是要认真一点。

腾讯地图除绝大部分所需要的事件都是依赖于 `qq.maps.event` 对象的创建和删除动作，Angular是一种单页开发模式，对资源的**创建与销毁**是非常重要的。如果你在开发腾讯地图的时候突然发现被污染了，那说明你的并没有正确的销毁。

因此，我建议，当你需要注册一个地图的 `click` 事件时：

```typescript
//添加监听事件
qq.maps.event.addListener(this.map, 'click', (event: any) => {
    // doing
    this.zone.run(() => {
        // 对于需要Angular监听的变量而放在 zone 里面，可以确保页面渲染。
        this.status = `click ${+new Date}`;
    });
});
```

与之相对应，一定要在 `ngOnDestroy` 对事件的销毁：

```typescript
ngOnDestroy(): void {
    ['click'].forEach(eventName => {
        qq.maps.event.clearListeners(this.map, eventName);
    });
}
```

当然，这里还有一些关于**覆盖物**相关里面涉及的事件，也一并做相应的销毁处理。

**很抱歉，如果你在使用 angular-qq-maps 的时候请认真阅读**。

## AqmConfig

| 名称    | 类型           | 默认值  | 描述 |
| ------- | ------------- | ----- | ----- |
| apiKey | string |  | APP KEY 必填项 |
| apiHostAndPath | string | map.qq.com/api/js |  |
| apiCallback | string | angularQQMapsLoader | API异步加载回调函数名 |
| apiVersion | string | 2.exp | API版本号 |
| apiLibraries | string[] |  | 附加库 |
| apiProtocol | string | auto | API 请求协议 |
| mapOptions | Object |  | 默认地图配置项，等同于[MapOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/mapoptions.html) |
| panoramaOptions | Object |  | 默认街景配置项，等同于[PanoramaOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/panoramaoptions.html) |

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/angular-qq-maps/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/angular-qq-maps/blob/master/LICENSE) file for the full text)
