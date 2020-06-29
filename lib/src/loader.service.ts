import { Injectable } from '@angular/core';
import { AqmConfig } from './aqm.config';

declare const document: any;

@Injectable()
export class LoaderService {
  private _scriptLoadingPromise: Promise<void>;
  private _cog: any;
  constructor(cog: AqmConfig) {
    this._cog = {
      apiProtocol: 'auto',
      apiVersion: '2.exp',
      apiCallback: 'angularQQMapsLoader',
      apiHostAndPath: 'map.qq.com/api/js',
      ...cog,
    };
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getSrc();

    this._scriptLoadingPromise = new Promise<void>(
      (resolve: () => void, reject: (error: Event) => void) => {
        (window as any)[this._cog.apiCallback] = () => {
          resolve();
        };

        script.onerror = (error: Event) => {
          reject(error);
        };
      },
    );

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  private _getSrc(): string {
    let protocol: string;
    switch (this._cog.apiProtocol) {
      case 'http':
        protocol = 'http:';
        break;
      case 'https':
        protocol = 'https:';
        break;
      default:
        protocol = '';
        break;
    }
    const queryParams: { [key: string]: string | string[] } = {
      v: this._cog.apiVersion,
      key: this._cog.apiKey,
      libraries: this._cog.apiLibraries,
      callback: this._cog.apiCallback,
    };
    const params: string = Object.keys(queryParams)
      .filter((k: string) => queryParams[k] != null)
      .filter((k: string) => {
        return (
          !Array.isArray(queryParams[k]) ||
          (Array.isArray(queryParams[k]) && queryParams[k].length > 0)
        );
      })
      .map((k: string) => {
        const i = queryParams[k];
        if (Array.isArray(i)) {
          return { key: k, value: i.join(',') };
        }
        return { key: k, value: i };
      })
      .map((entry: { key: string; value: string }) => {
        return `${entry.key}=${entry.value}`;
      })
      .join('&');
    return `${protocol}//${this._cog.apiHostAndPath}?${params}`;
  }
}
