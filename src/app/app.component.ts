import { Component, ElementRef } from '@angular/core';
import { Ischema } from './interfaces/columns.interface';
import { UploadServiceService } from './services/upload-service.service';
import { datasend } from './interfaces/data.interface';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  @ViewChild('myInput') myInput!: ElementRef;

  title = 'carga-archivos';

  file:any; 

  columns_data: string[] = [ "Nombre", "Telefono",  "Descripcion", "Dir1", "Dir2"];
  first_line: string[] = [];

  schema: Ischema[] = [];

  object: Ischema = { index: 0, property: '', value: '' }

  constructor(private uploadService: UploadServiceService){}


  fileChanged(e: any) { 

    this.file = e.target.files[0];

    // console.log(this.file); 

    var reader = new FileReader(); 

    reader.onload = () => { 

      let first_line = (<string>reader.result).split('\n')[0];

      let splitters = [",", ".", "%"];

      let columns = splitters.reduce((old, c) => old.map(v => v.split(c)).flat(), [first_line]);

      this.first_line = columns;

      console.log("primera linea", columns);

    }; 
    
    reader.readAsText(this.file);

  }

  onChange($event: any, property:string, position:number){
    console.log($event.target.value, property, position)

    this.object = {
      index   : position,
      property: property,
      value   : $event.target.value
    }

    this.schema.push( this.object )

  }


  save(){
  
    let data = { file : this.file, order: this.schema }

    this.uploadService.saveData(data).subscribe(resp => {
      console.log(resp);
      this.first_line = [];
      this.myInput.nativeElement.value = "";
      this.file = null;
    });

  }

}
