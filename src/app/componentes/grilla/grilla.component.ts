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
  public gridOptions: any;
  public rowData: any;
  public rowSelection: any;
  public columnDefs: any;
  public datosLeidos: number = 0;
  public datosTotales: number = 0;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Sup.', field: 'supermercado', width: 100, sortable: true, filter: true, headerClass: 'miClase',
        checkboxSelection: true
      },
      { headerName: 'Fecha', field: 'fecha', width: 110, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Descrip.', field: 'descrip', width: 450, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Precio', field: 'precio', width: 100, sortable: true, filter: true, headerClass: 'miClase' }
    ];
    this.rowSelection = 'single';
  }

  filtroProducto(producto: string) {
    this.datosService.getProducto(producto)
      .subscribe(
        (data) => {
          this.gridApi.setRowData(this.rowData);
        })
  }

  onSelectionChanged(parametro: any) {
    //let selectedNodes = this.gridApi.getSelectedNodes();
    //let selectedData = selectedNodes.map(node => node.data);
    // alert(`Nodo seleccionado:\n${JSON.stringify(selectedData)}`); 
    let selectedRows = this.gridApi.getSelectedRows();
    let seleccion = selectedRows[0].descrip;
    console.log(seleccion);
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData,
    }
    //this.gridApi.setRowData(this.rowData);
    this.datosService.getDatos()
      .subscribe(
        (data) => {
          const datos: string | any[][] = data;
          this.datosLeidos = datos.length;
          const algo = JSON.stringify(datos, (key, value) => {
            if (key == "fecha") {
              const f = new Date(value);
              return f.toLocaleDateString();
            } else {
              return value;
            }
          });
          const losDatos = JSON.parse(algo);
          this.rowData = losDatos;
        }
      );
    const total = this.datosService.getTotal()
      .subscribe(
        (data) => {
          this.datosTotales = data.data;
        })

  }
}
