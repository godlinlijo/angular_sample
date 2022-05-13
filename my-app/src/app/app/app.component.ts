import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems, Column, RowDataBoundEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { SelectedCollection } from '@syncfusion/ej2-angular-lists';

import { MouseEventArgs } from '@syncfusion/ej2-base';
import {
  LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  ToolbarService, NavigationService, AnnotationService, TextSearchService, TextSelectionService, PrintService, FormFieldsService, FormDesignerService,
} from '@syncfusion/ej2-angular-pdfviewer';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // specifies the template string for the PDF Viewer component
  template: `<div class="content-wrapper">
 <ejs-listview id='sample-list' [dataSource]='data'></ejs-listview>
</div>`,
  providers: [LinkAnnotationService, BookmarkViewService, MagnificationService,
    ThumbnailViewService, ToolbarService, NavigationService, AnnotationService, TextSearchService, TextSelectionService, PrintService,  FormFieldsService]
})




export class AppComponent implements OnInit {
  @ViewChild("listview") element: any;
  public service = 'https://localhost:44347/pdfviewer';
  public document = 'FormFillingDocument textbox.pdf';
  public data: { [key: string]: Object }[] = [];
  public toolbarOptions!: ToolbarItems[]; 
  //= ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  public formFieldValue: any = -1;
  public editSettings:  EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  public editingOptions: EditSettingsModel = {allowEditing: false};
public width: any;
@ViewChild('element') tabObj: any;
@ViewChild('grid')
    public grid: any;
    public datagrid: any;
    // public editSettings: any;
    public toolbar:any;
    public formClickedId: any;
    public editparams: any;
    public pageSettings: any;
  public dataSourceSettings: any;
  public headerText:any = [{ 'text': 'CLIENT SIDE EVENTS' }, { 'text': 'PROPERTIES' }];
 // defined the array of data
 public data3: string[] = ['visible','hidden'];
 // set placeholder text to ComboBox input element
 public text: string = 'Select a game';
  public data1: Object = [
    { text: 'formFieldFocusIn', id: '01' },
    { text: 'formFieldFocusOut', id: '02' },
    { text: 'formFieldAdd', id: '03', isChecked: true },
    { text: 'formFieldRemove', id: '04' },
    { text: 'formFieldPropertiesChange', id: '05' },
    { text: 'formFieldMouseLeave', id: '06' },
    { text: 'formFieldMouseover', id: '07' },
    { text: 'formFieldMove', id: '08' },
    { text: 'formFieldResize', id: '09' },
    { text: 'formFieldSelect', id: '10', isChecked: true },
    { text: 'formFieldUnselect', id: '11' },
    { text: 'formFieldDoubleClick', id: '12' },
    { text: 'formFieldClick', id: '13', isChecked: true  }    
  ];
  public columns: any;

  public viewer: any;
  public listboxobj: any; 
  public dataValues: any = [{PropertiesName: 'name', Values: '' },
  {PropertiesName: 'Tooltip', Values: '' },
  {PropertiesName: 'value', Values: '' },
  {PropertiesName: 'FormField-Visibility', Values: '' },
  {PropertiesName: 'Required', Values: '' },
  {PropertiesName: 'Read-Only', Values: '' },
  {PropertiesName: 'Show-printing', Values: '' },
  {PropertiesName: 'Multiline', Values: '' },
  {PropertiesName: 'IsChecked', Values: ''}];

   
  ngOnInit(): void {
    this.toolbarOptions = ['Update'];
}

  load(args: any){
    var gridElement = (<any>document.getElementById('Grid')).ej2_instances[0];
    gridElement.element.addEventListener('mouseup', function(e: any) {
      if (e.target.classList.contains('e-rowcell')) {
        if (gridElement.isEdit) gridElement.endEdit();
        let index = parseInt(e.target.getAttribute('Index'));
        gridElement.selectRow(index);
        gridElement.startEdit();
      }
    });
  }
  // actionComplete(args: any) {
  //   var formField = this.viewer.retrieveFormFields();
  //   if (args.action == 'edit') {
  //     if (args.data['PropertiesName'] == 'name') {
  //       for (var i=0; i<formField.length; i++) {
  //         if(this.formClickedId === formField[i].id) {
  //           this.viewer.formDesigner.updateFormField(formField[i].id, { name: args.data['Values'] });
  //         }
  //       }
         
  //      } else if (args.data['PropertiesName'] == 'value') {
  //       for (var i=0; i<formField.length; i++) {
  //         if(this.formClickedId === formField[i].id) {
  //           formField[i].value = args.data['Values'];
  //           this.viewer.updateFormFieldsValue(formField[0]);
  //         }
  //       }
  //     } else if (args.data['PropertiesName'] == 'Required') {
  //       for (var i=0; i<formField.length; i++) {
  //         if(this.formClickedId === formField[i].id) {
  //           formField[i].value = args.data['Values'];
  //           this.viewer.formDesigner.updateFormField(formField[i].id, { isRequired: args.data['Values'] });
  //         }
  //       }
        
  //     } else if (args.data['PropertiesName'] == 'Read-Only') {
  //       for (var i=0; i<formField.length; i++) {
  //         if(this.formClickedId === formField[i].id) {
  //           formField[i].value = args.data['Values'];
  //           this.viewer.formDesigner.updateFormField(formField[0].id, { isReadOnly: args.data['Values'] });
  //         }
  //       }
        
  //     } else if (args.data['PropertiesName'] == 'isChecked') {
  //       for (var i=0; i<formField.length; i++) {
  //         if(this.formClickedId === formField[i].id) {
  //           formField[i].value = args.data['Values'];
  //           this.viewer.formDesigner.updateFormField(formField[0].id, { isChecked: args.data['Values'] });
  //         }
  //       }
        
  //     }
  //   }
  // }
 
  actionComplete(args: any) {
    var formField = this.viewer.retrieveFormFields();
    if (args.action == 'edit') {
      for (var i = 0; i < formField.length; i++) {
        if (this.formClickedId === formField[i].id) {
          //formField[i].value = args.data['Values'];
          switch (args.data['PropertiesName']) {
            case 'name':
              this.viewer.formDesigner.updateFormField(formField[i].id, { name: args.data['Values'] });
              break;              
              case 'value':
              formField[i].value = args.data['Values'];
              this.viewer.updateFormFieldsValue(formField[i]);
              break;
            case 'Required':
              if(args.data['Values'].toLowerCase() == 'true'){
                args.data['Values'] = true;
              }else if(args.data['Values'].toLowerCase() == 'false'){
                args.data['Values'] = false;
              }
              this.viewer.formDesigner.updateFormField(formField[i].id, { isRequired: args.data['Values'] });
              break;
            case 'Read-Only':
              if(args.data['Values'].toLowerCase() == 'true'){
                args.data['Values'] = true;
              }else if(args.data['Values'].toLowerCase() == 'false'){
                args.data['Values'] = false;
              }
              this.viewer.formDesigner.updateFormField(formField[i].id, { isReadOnly: args.data['Values'] });
              break;
            case 'IsChecked':
              if(args.data['Values'].toLowerCase() == 'true'){
                args.data['Values'] = true;
              }else if(args.data['Values'].toLowerCase() == 'false'){
                args.data['Values'] = false;
              }
              this.viewer.formDesigner.updateFormField(formField[i].id, (formField[i].type == 'RadioButton')? { isSelected: args.data['Values'] }:{ isChecked: args.data['Values'] });
              break;
            case 'Tooltip':
              this.viewer.formDesigner.updateFormField(formField[i].id, { tooltip: args.data['Values'] });
              break;
            case 'FormField-Visibility':
              this.viewer.formDesigner.updateFormField(formField[i].id, { visibility: args.data['Values'] });
              break
            case 'Multiline':
              if(args.data['Values'].toLowerCase() == 'true'){
                args.data['Values'] = true;
              }else if(args.data['Values'].toLowerCase() == 'false'){
                args.data['Values'] = false;
              }
              this.viewer.formDesigner.updateFormField(formField[i].id, { isMultiline: args.data['Values'] });
              break;
            case 'Show-printing':
              if(args.data['Values'].toLowerCase() == 'true'){
                args.data['Values'] = true;
              }else if(args.data['Values'].toLowerCase() == 'false'){
                args.data['Values'] = false;
              }
              this.viewer.formDesigner.updateFormField(formField[i].id, { isPrint: args.data['Values'] });
              break;
          }
        }
      }
    }
  }
  documentLoad(args: any) {
   this.viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
   this.listboxobj = (<any>document.getElementById('listbox')).ej2_instances[0];
  for (var i = this.listboxobj.jsonData.length; i > 0; i--) {
    this.listboxobj.removeItems();
  }

  var formField = this.viewer.retrieveFormFields();
  for (var j = 0; j < formField.length; j++) {
    this.data = [{ text: formField[j].name }];

    this.listboxobj.addItems(this.data);
  }
  }
  change(args: any) {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    var formField = viewer.retrieveFormFields();

    for (var i = 0; i < formField.length; i++) {
      if (formField[i].type == 'Textbox' || formField[i].type == 'Password' || formField[i].type == 'RadioButton') {
        if (formField[i].name == args.value[0]) {
          var element: any = document.getElementsByClassName(
            'e-pv-formfield-input'
          );
          for (var j = 0; j < element.length; j++) {
            if (element[j].name == formField[i].name) {
              element[j].focus();
              break;
            }
          }         
        }
      } else {
        if (formField[i].name == args.value[0]) {
          var y = viewer.formFieldCollection[i].bounds.y;
          var pageNumber = viewer.formFieldCollection[i].pageNumber;
          viewer.bookmark.goToBookmark(pageNumber - 1, y);
          break;
        }
      }
    }
  }
  //Testing code for focusing all the formfields
  // changeTest(args: any) {
  //   var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
  //   var formField = viewer.retrieveFormFields();

  //   for (var i = 0; i < formField.length; i++) {
  //     if (formField[i].type == 'Textbox' || formField[i].type == 'PasswordField') {
  //       if (formField[i].name == args.value[0]) {
  //         var element: any = document.getElementsByClassName(
  //           'e-pv-formfield-input'
  //         );
  //         for (var j = 0; j < element.length; j++) {
  //           if (element[j].name == formField[i].name) {
  //             element[j].focus();
  //             break;
  //           }
  //         }         
  //       }
  //     }
  //     // else if(formField[i].type == 'RadioButton'){
  //     //   if (formField[i].name == args.value[0]) {
  //     //     var element: any = document.getElementsByClassName('e-pv-radiobtn-container');
  //     //     for (var j = 0; j < element.length; j++) {
  //     //       if (element[j].id.split('_')[0] == formField[i].id) {
  //     //         element[j].focus();
  //     //         break;
  //     //       }
  //     //     }         
  //     //   }
  //     // } 
  //     else {
  //       if (formField[i].name == args.value[0]) {
  //         var y = viewer.formFieldCollection[i].bounds.y;
  //         var pageNumber = viewer.formFieldCollection[i].pageNumber;
  //         viewer.bookmark.goToBookmark(pageNumber - 1, y);
  //         //new code
  //         if(formField[i].type == 'RadioButton'){
  //             if (formField[i].name == args.value[0]) {
  //               var element: any = document.getElementsByClassName('e-pv-radiobtn-container');
  //               for (var j = 0; j < element.length; j++) {
  //                 if (element[j].id.split('_')[0] == formField[i].id) {
  //                   element[j].focus();
  //                   break;
  //                 }
  //               }         
  //             }
  //           } 
  //         //end of new code
  //         break;
  //       }
  //     }
  //   }
  // }


  //Testing code for focusing all the formfields
  changeTest(args: any) {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    var formField = viewer.retrieveFormFields();
    for (var i = 0; i < formField.length; i++) {
      if (formField[i].name == args.value[0]) {
        this.focusFields(formField[i], viewer);
        break;
      }
    }
  }
  focusFields(field: any, viewer: any) {
    var instance = this;
    if (field && field.id != '') {
      if (!instance.focusCurrentField(field)) {
        var pageNumber = field.pageIndex;
        viewer.navigationModule.goToPage(pageNumber + 1);
        setTimeout(function () {
          instance.focusCurrentField(field);
        }, 1000);
      }
    }
  }
  firstField() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    var formField = viewer.retrieveFormFields();
    for (var i = 0; i < formField.length; i++) {
      if (formField[0].type == 'Textbox') {
        var element: any = document.getElementsByClassName(
          'e-pv-formfield-input'
        );
        element[0].focus();
        break;
      } else {
        var y = viewer.formFieldCollection[0].bounds.y;
        var pageNumber = viewer.formFieldCollection[0].pageNumber;
        viewer.bookmark.goToBookmark(pageNumber - 1, y);
        break;
      }
    }
  }
  nextField() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    if (this.formFieldValue >= 0) {
      this.formFieldValue++;
    } else {
      this.formFieldValue = 0;
    }
    this.retireveFormfields(true);
    if (this.formFieldValue == viewer.formFieldCollections.length) {
      this.formFieldValue = -1;
    }
  }

  previousField() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    if (this.formFieldValue >= 0) {
      this.formFieldValue--;
    } else {
      this.formFieldValue = 0;
    }
    this.retireveFormfields(false);
  }
  lastField() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    var formField = viewer.retrieveFormFields();
    for (var i = formField.length - 1; i > 0; i--) {
      if (formField[formField.length - 1].type == 'Textbox') {
        var element: any = document.getElementsByClassName(
          'e-pv-formfield-input'
        );
        element[formField.length - 1].focus();
        break;
      } else {
        var y = viewer.formFieldCollection[formField.length - 1].bounds.y;
        var pageNumber =
          viewer.formFieldCollection[formField.length - 1].pageNumber;
        viewer.bookmark.goToBookmark(pageNumber - 1, y);
        break;
      }
    }
  }
  delete() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    let currentData: any = viewer.formFieldCollections[9];
    viewer.formDesigner.deleteFormField(currentData.id, false);
  }
  add() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    viewer.formDesignerModule.addFormField("Textbox", {name: "Demo First Name", bounds: { X: 146, Y: 229, Width: 150, Height: 24 } });
    viewer.formDesignerModule.addFormField("Password", {name: "Password Name", bounds: { X: 106, Y: 279, Width: 150, Height: 24 } });
    viewer.formDesignerModule.addFormField("CheckBox", {name: "Information Billing", bounds: { X: 290, Y: 740, Width:20, Height:20}, isChecked:false });
    viewer.formDesignerModule.addFormField("SignatureField", {name: "Sign", bounds: { X: 57, Y: 923, Width:200, Height:43} }); 
    viewer.formDesignerModule.addFormField("InitialField", {name: "Agree", bounds: { X: 148, Y: 408, Width:200, Height:43} }); 
    viewer.formDesignerModule.addFormField("RadioButton", {bounds: { X: 292, Y: 289, Width:18, Height:18}, name: "Gender", isSelected: false });
    viewer.formDesignerModule.addFormField("DropDown", {name: "Drop Name", bounds: { X: 166, Y: 269, Width: 150, Height: 24 } });
    viewer.formDesignerModule.addFormField("ListBox", {name: "List Name", bounds: { X: 186, Y: 249, Width: 150, Height: 24 } });
  }
  changeValue() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    let currentData: any = viewer.formFieldCollections[9];
    currentData.isReadOnly = true;
    viewer.updateFormFields(currentData);
  }
  Click() {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    let currentData: any = viewer.formFieldCollections[9];
    viewer.fireFormFieldClickEvent('formFieldClicked',currentData,false,true);
  }
  clearbtn(): void {
    let data: any = document.getElementById('EventLog');
    data.innerHTML = '';
}
  // focusCurrentField(field: any) {
  //   var currentField = document.getElementById(field.id);
  //   if (currentField) {
  //     currentField.focus();
  //     // if (click) {
  //     //   currentField.click();
  //     // }
  //   }
  //   return currentField;
  // }

  focusCurrentField(field:any) {
    var currentField = document.getElementById(field.id);
    if (currentField) {
      currentField.focus();
    }
    return currentField;
  }
  retireveFormfields(nextField: boolean): void {
    var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
    if (this.formFieldValue != -1) {
      let currentData: any = viewer.formFieldCollections[this.formFieldValue];
      let currentTarget: any = document.getElementById(currentData.id);
      if (currentTarget) {
        currentTarget.blur();
        currentTarget.focus();
      } else if (this.formFieldValue != -1) {
        let pageNumber: number = parseInt(currentData.id.split('_')[1]);
        if (nextField) {
          pageNumber = pageNumber + 1;
        } else {
          pageNumber = pageNumber - 1;
        }
        viewer.navigationModule.goToPage(pageNumber);
        currentTarget = document.getElementById(currentData.id);
        if (currentTarget) {
          currentTarget.blur();
          currentTarget.focus();
        }
      }
    }
  }

eventLog(args: any) {
  let selecteditem = this.element.getSelectedItems();
  let data: any = document.getElementById('EventLog');
  for (var i = 0; i < selecteditem["data"].length; i++) {
    if (selecteditem["text"][i] == args.name) {
      data.innerHTML = this.textData(args, data);
    }
  }
}
eventLogArgs(args: any) {
  let selecteditem = this.element.getSelectedItems();
  let data: any = document.getElementById('EventLog');
  for (var i = 0; i < selecteditem["data"].length; i++) {
    if (selecteditem["text"][i] == args.name) {
      data.innerHTML = this.textData(args, data);
    }
  }
}
formFieldFocusIn (args: any) {
  this.eventLog(args);
  };
formFieldFocusOut (args: any) {
  this.eventLog(args);
  };
  formFieldAdd (args: any) {
    this.eventLog(args);
  };
  formFieldRemove (args: any) {
    this.eventLog(args);
  };  
  formFieldPropertiesChange  (args: any)  {
    //this.eventLog(args);
    this.formFieldClick(args);
  };
  formFieldMouseLeave (args: any) {
    this.eventLog(args);
  };
  formFieldMouseover  (args: any)  {
    this.eventLog(args);
  };
  formFieldMove  (args: any) {
    this.eventLog(args);
  };
  formFieldResize (args: any) {
    this.eventLog(args);
  };
  formFieldSelect (args: any) {
    this.eventLog(args);
    
  };
  
  formFieldUnselect (args: any) {
    this.eventLog(args);
  };
  formFieldDoubleClick (args: any) {
    this.eventLog(args);
  };
formFieldClick(args: any) {
  var viewer = (<any>document.getElementById('pdfViewer')).ej2_instances[0];
  this.formClickedId = args.field.id.split('_')[0];
  var formField = viewer.retrieveFormFields();
  if((<any>document.getElementById('Grid')) ){
    var tab: any = (<any>document.getElementById('element')).ej2_instances[0];
    let items: any = tab.items;
    if(args.formFieldAnnotationType){
      items[1].header.text = args.formFieldAnnotationType + " Properties ";
    }
    if(args.field.type){
      items[1].header.text = args.field.type + " Properties ";
    }
    this.eventLog(args);
    //New code in product
    var grid = (<any>document.getElementById('Grid')).ej2_instances[0];
     for (var i = 0; i < grid.dataSource.length; i++) {
       var newData = Object.assign({}, grid.dataSource[i]);
         for (var j = 0; j < formField.length; j++) {
           if (formField[j].id == this.formClickedId) {
             if(formField[j].type == 'PasswordField'){
               formField[j].type = 'Password';
             }
             switch (newData.PropertiesName){
              case 'name':
                newData.Values = formField[j].name;
                break;
              case 'value':
                newData.Values = formField[j].value;
                break;
              case 'Required':
                newData.Values = formField[j].isRequired;
                break;
              case 'Read-Only':
                newData.Values = formField[j].isReadOnly;
                break;
               case 'IsChecked':
                //  if(args.field.type == 'Checkbox' || args.field.type == 'RadioButton'){
                //   newData.Values = !formField[j].isChecked;
                //  }
                if(args.field.formFieldAnnotationType == 'Checkbox'){
                  newData.Values = formField[j].isChecked;
                 }
                 else if(args.field.formFieldAnnotationType == 'RadioButton'){
                  newData.Values = formField[j].isSelected;
                 }
                 else{
                  newData.Values = "";
                 }
                 break;
               case 'Tooltip':
                 newData.Values = formField[j].tooltip;
                 break;
               case 'FormField-Visibility':
                 newData.Values = formField[j].visibility;
                 break;
               case 'Multiline':
                 if(args.field.type == 'Textbox'){
                  newData.Values = formField[j].isMultiline;
                 }else{
                  newData.Values = "";
                 }
                 break;
               case 'Show-printing':
                 newData.Values = formField[j].isPrint;
                 break;
             }
             grid.setRowData(newData.PropertiesName, newData);
           }
           //grid.setRowData(newData.PropertiesName, newData);
         }
     }
  }
 }
  textData(args: any, data: any) {
    if(args.name === 'formFieldFocusIn' || args.name === 'formFieldFocusOut'){
      args.field = args.fieldName;
    }
    if (args.field) {
      var text =
        '<br>' +
        'Event :: ' +
        args.name +
        ' { FieldName: ' +
        args.field.name +
        ' FieldId: { ' +
        args.field.id +
        ' } ' +
        ' FieldValue: { ' +
        args.field.value +
        ' } ' +
        'checked : ' +
        args.field.isChecked +
        ' }  ' +
        data.innerHTML +
        '<br>';
    } else {
      text = '<br>' + args.name + ' is triggered' + data.innerHTML + '<br>';
    }
    return text;
  }
  // Validation task
  
  color() {
    var viewer = (<any>document.getElementById('pdfViewer'))
      .ej2_instances[0];
    debugger;
    var formFields = viewer.retrieveFormFields();
    let color: any = { backgroundColor: '#1565c0' };
    viewer.formDesignerModule.updateFormField(formFields[1], color);
  }
}