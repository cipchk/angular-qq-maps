import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';

import { AqmModule } from 'angular-qq-maps';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';
import { DemoPanoramaComponent } from './components/panorama.component';
import { DemoGlJsComponent } from './components/gljs.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', component: DemoComponent },
        { path: 'panorama', component: DemoPanoramaComponent },
        { path: 'gljs', component: DemoGlJsComponent },
      ],
      { useHash: true },
    ),
    CommonModule,
    HighlightJsModule,

    AqmModule.forRoot({
      apiKey: 'I3TBZ-QTN3J-MWPFI-FERMS-IBOCQ-LBBWY',
    }),
  ],
  declarations: [
    AppComponent,
    DemoComponent,
    DemoPanoramaComponent,
    DemoGlJsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppDemoModule {}
