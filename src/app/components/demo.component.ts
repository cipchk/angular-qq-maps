import {
  NgZone,
  OnDestroy,
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AqmComponent } from 'angular-qq-maps';

declare const qq: any;

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent implements OnDestroy {
  constructor(private el: ElementRef, private zone: NgZone) {}
  options: any = {};
  status = '';
  @ViewChild('map') mapComp: AqmComponent;

  private map: any;

  // 卫星
  satelliteOptions: any;
  private mapSatellite: any;
  onReady(mapNative: any): void {
    mapNative.setOptions({
      zoom: 12,
      center: new qq.maps.LatLng(39.916527, 116.397128),
    });
    this.map = mapNative;
    this.status = '加载完成';
    // 添加监听事件
    qq.maps.event.addListener(this.map, 'click', (event: any) => {
      // tslint:disable-next-line:no-unused-expression
      new qq.maps.Marker({
        position: event.latLng,
        map: this.map,
      });
      this.zone.run(() => {
        this.status = `click ${+new Date()}`;
      });
    });
  }

  panTo(): void {
    this.map.panTo(new qq.maps.LatLng(39.9, 116.4));
  }

  zoom(): void {
    this.map.zoomTo((this.map.getZoom() + 1) % 17);
  }

  infoWindow(): void {
    const infoWin = new qq.maps.InfoWindow({
      map: this.map,
    });
    infoWin.open();
    infoWin.setContent('Hello world');
    infoWin.setPosition(this.map.getCenter());
  }
  onReadySatellite(mapNative: any): void {
    mapNative.setOptions({
      zoom: 14,
      center: new qq.maps.LatLng(39.916527, 116.397128),
      mapTypeId: qq.maps.MapTypeId.SATELLITE,
    });
    this.mapSatellite = mapNative;
  }

  ngOnDestroy(): void {
    ['click'].forEach((eventName) => {
      qq.maps.event.clearListeners(this.map, eventName);
    });
  }
}
