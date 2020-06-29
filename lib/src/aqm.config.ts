export class AqmConfig {
  /**
   * 表示使用 [JavaScript API GL](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview) 版本
   */
  gl?: boolean;

  /**
   * APP KEY 必填项
   */
  apiKey?: string;

  /**
   * 默认：map.qq.com/api/js
   */
  apiHostAndPath?: string;

  /**
   * API异步加载回调函数名
   */
  apiCallback?: string;

  /**
   * API版本号，默认：2.exp
   */
  apiVersion?: string;

  /**
   * 加载附加库
   */
  apiLibraries?: string[];

  /**
   * API 请求协议
   */
  apiProtocol?: 'http' | 'https' | 'auto';

  /**
   * 默认地图配置项，等同于[MapOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/mapoptions.html)，当指定 `gl: true` 表示Gl版本的[MapOptions 对象规范](https://lbs.qq.com/javascript_gl/doc/mapoptions.html)
   */
  mapOptions?: any;

  /**
   * 默认街景配置项，等同于[PanoramaOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/panoramaoptions.html)
   */
  panoramaOptions?: any;
}
