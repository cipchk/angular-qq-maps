import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  Output,
  NgZone,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LoaderService } from './loader.service';
import { AqmConfig } from './aqm.config';
import { isSSR } from './aqm.core';

declare const qq: any;
declare const TMap: any;

@Component({
  selector: 'aqm-map',
  template: ``,
  styles: [
    `
      aqm-map {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  exportAs: 'aqmMap',
  encapsulation: ViewEncapsulation.None,
})
export class AqmComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config: AqmConfig;
  @Input() options: any = {};
  @Output() ready = new EventEmitter<any>();

  private map: any = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private COG: AqmConfig,
    private loader: LoaderService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    if (isSSR) {
      return;
    }
    this._initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.loader.cog = this.config;
    }
    if ('options' in changes) {
      this._updateOptions();
    }
  }

  private _initMap(): void {
    if (this.map) {
      return;
    }
    this.loader
      .load()
      .then(() => {
        this.zone.runOutsideAngular(() => {
          try {
            console.log(this.options);
            this.map = new (this.loader.cog.gl === true ? TMap : qq.maps).Map(
              this.el.nativeElement,
              this.options,
            );
          } catch (ex) {
            console.warn('地图初始化失败', ex);
          }
        });
        this.ready.emit(this.map);
      })
      .catch((error: Error) => {
        console.warn('js加载失败', error);
      });
  }

  private _updateOptions(): void {
    this.options = { ...this.COG.mapOptions, ...this.options };
    if (this.map && this.map.setOptions) {
      this.map.setOptions(this.options);
    }
  }

  ngOnDestroy(): void {
    if (this.map && this.map.destroy) {
      this.map.destroy();
    }
  }
}
