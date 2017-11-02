import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AqmComponent } from './core/aqm.component';
import { AqmPanoramaComponent } from './core/aqm-panorama.component';
import { AqmConfig } from './core/aqm.config';
import { LoaderService } from './core/loader.service';

export { AqmConfig } from './core/aqm.config';
export { AqmComponent } from './core/aqm.component';
export { AqmPanoramaComponent } from './core/aqm-panorama.component';

@NgModule({
  imports: [CommonModule],
  providers: [ LoaderService ],
  declarations: [AqmComponent, AqmPanoramaComponent],
  exports: [AqmComponent, AqmPanoramaComponent]
})
export class AqmModule {
    static forRoot(config: AqmConfig): ModuleWithProviders {
        return {
            ngModule: AqmModule,
            providers: [
                { provide: AqmConfig, useValue: config }
            ]
        };
    }
}
