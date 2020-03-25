export class AqmConfig {
  /**
   * APP KEY 必填项
   */
  apiKey: string;

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
   * 默认地图配置项，等同于[MapOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/mapoptions.html)
   */
  mapOptions?: any;

  /**
   * 默认街景配置项，等同于[PanoramaOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/panoramaoptions.html)
   */
  panoramaOptions?: any;
}
