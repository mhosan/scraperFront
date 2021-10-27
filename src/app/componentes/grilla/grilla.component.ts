import { Component, OnInit } from '@angular/core';
import { AgGridColumn } from 'ag-grid-angular';
import { DatosService } from '../../servicios/datos.service';
//import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  public gridApi: any;
  public gridColumnApi: any;
  public rowData: any;
  public rowSelection: any;
  public columnDefs: any;
  public datosTotales: number = 0;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Superm.', field: 'supermercado', width: 100, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Fecha', field: 'fecha', sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Descrip.', field: 'descrip', width: 450, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Precio', field: 'precio', width: 100, sortable: true, filter: true, headerClass: 'miClase' }
    ];
    this.datosService.getDatos()
      .subscribe(
        (data) => {
          const datos: string | any[][] = data;
          this.datosTotales = datos.length;
          const algo = JSON.stringify(datos, (key, value)=>{
            if (key == "fecha"){
              const f = new Date(value);
              return f.toLocaleDateString();
            } else {
              return value;
            }
          });
          const losDatos = JSON.parse(algo);
          this.rowData = losDatos;
        }
        //,
        //(error) => {
        //  console.log(`Error: ${error}`);
        //}
      );
    this.rowSelection = 'single';

  }
  onSelectionChanged(parametro: any) {
    // let selectedNodes = this.gridApi.getSelectedNodes();
    // let selectedData = selectedNodes.map(node => node.data);
    // alert(`Nodo seleccionado:\n${JSON.stringify(selectedData)}`); 
    let selectedRows = this.gridApi.getSelectedRows();
    let seleccion = selectedRows[0].id;
    //alert(seleccion);
    //this.destino = seleccion.toString();
  }
  /* onGridReady(params: { api: any; columnApi: any; }) {
    console.log('onGridReady');
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.datosService.getDatos()
      .subscribe(
        (data) => {
          console.log(data);
          //this.rowData = data[0];
        }
      );
  } */
}
