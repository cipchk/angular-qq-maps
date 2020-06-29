import { Component, ViewEncapsulation } from '@angular/core';

declare const TMap: any;

@Component({
  selector: 'demo-gljs',
  templateUrl: './gljs.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DemoGlJsComponent {
  private map: any;
  options: any = {};

  onReady(mapNative: any): void {
    this.map = mapNative;
  }

  change2D(): void {
    if (this.map) {
      this.map.setViewMode('2D');
    }
  }

  change3D(): void {
    if (this.map) {
      this.map.setViewMode('3D');
      this.map.setPitch(70);
      this.map.setZoom(17);
    }
  }

  updateStyle(): void {
    this.options = null;
    // TODO: 强制重新渲染组件
    setTimeout(() => {
      this.options = {
        center: new TMap.LatLng(39.916527, 116.397128),
        zoom: 11,
        mapStyleId: 'style2',
      };
    }, 1000);
  }
}
