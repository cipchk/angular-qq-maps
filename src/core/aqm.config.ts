export class AqmConfig {
    /**
     * APP KEY 必填项
     * 
     * @type {string}
     */
    apiKey: string;

    /**
     * 默认：map.qq.com/api/js
     * 
     * @type {string}
     */
    apiHostAndPath?: string;

    /**
     * API异步加载回调函数名
     * 
     * @type {string}
     */
    apiCallback?:string;

    /**
     * API版本号，默认：2.exp
     * 
     * @type {string}
     */
    apiVersion?: string;

    /**
     * 加载附加库
     * 
     * @type {string[]}
     */
    apiLibraries?: string[];

    /**
     * API 请求协议
     * 
     * @type {('http' | 'https' | 'auto')}
     */
    apiProtocol?: 'http' | 'https' | 'auto';
    
    /**
     * 默认地图配置项，等同于[MapOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/mapoptions.html)
     * 
     * @type {*}
     */
    mapOptions?: any;
    
    /**
     * 默认街景配置项，等同于[PanoramaOptions 对象规范](http://lbs.qq.com/javascript_v2/doc/panoramaoptions.html)
     * 
     * @type {*}
     */
    panoramaOptions?: any;
}
