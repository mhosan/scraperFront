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
  public losDatosConFechaConvertida: any;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Superm.', field: 'supermercado', width: 130, sortable: true, filter: true, headerClass: 'miClase'},
      { headerName: 'Fecha', field: 'fecha', width: 120, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Descrip.', field: 'descrip', width: 530, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Precio', field: 'precio', width: 110, sortable: true, headerClass: 'miClase' }
    ];
    this.rowSelection = 'single';
  }

  filtroProducto(producto: string) {
    this.datosService.getProducto(producto)
      .subscribe(
        (data) => {
          this.convertirFecha(data.data);
          this.rowData = this.losDatosConFechaConvertida;
          this.datosLeidos = data.data.length;
        })
  }

  onSelectionChanged(parametro: any) {
    //let selectedNodes = this.gridApi.getSelectedNodes();
    //let selectedData = selectedNodes.map(node => node.data);
    // alert(`Nodo seleccionado:\n${JSON.stringify(selectedData)}`); 
    let selectedRows = this.gridApi.getSelectedRows();
    let seleccion = selectedRows[0].descrip;
    console.log(seleccion);
    this.filtroProducto(seleccion);
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
          this.convertirFecha(datos);
          this.rowData = this.losDatosConFechaConvertida;
        }
      );
    const total = this.datosService.getTotal()
      .subscribe(
        (data) => {
          this.datosTotales = data.data;
        })

  }

  convertirFecha(data: any){
    const algo = JSON.stringify(data, (key, value) => {
      if (key == "fecha") {
        const f = new Date(value);
        return f.toLocaleDateString();
      } else {
        return value;
      }
    });
    this.losDatosConFechaConvertida = JSON.parse(algo);
  }

  home(){
    this.datosService.getDatos()
      .subscribe(
        (data) => {
          const datos: string | any[][] = data;
          this.datosLeidos = datos.length;
          this.convertirFecha(datos);
          this.rowData = this.losDatosConFechaConvertida;
        }
      );
    const total = this.datosService.getTotal()
      .subscribe(
        (data) => {
          this.datosTotales = data.data;
        })
  }
}
