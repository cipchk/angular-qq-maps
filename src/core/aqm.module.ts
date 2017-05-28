import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AqmComponent } from './aqm.component';
import { AqmPanoramaComponent } from './aqm-panorama.component';
import { AqmConfig } from './aqm.config';

import { LoaderService } from './loader.service';

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
