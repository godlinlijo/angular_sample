import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import the PdfViewer Module for the PDF Viewer component
import { PdfViewerModule, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
   NavigationService, TextSearchService, TextSelectionService, PrintService } from '@syncfusion/ej2-angular-pdfviewer';
// Imported syncfusion SplitterModule from layouts package
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule, EditService, PageService, ToolbarService } from '@syncfusion/ej2-angular-grids';
@NgModule({
  //declaration of ej2-angular-pdfviewer module into NgModule
  imports: [ BrowserModule, PdfViewerModule, AppRoutingModule, SplitterModule, ListViewModule, ListBoxModule,  TabModule, ComboBoxAllModule, GridModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent],
  providers: [LinkAnnotationService, BookmarkViewService, MagnificationService,
    ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, EditService, ToolbarService]
})
export class AppModule { }
