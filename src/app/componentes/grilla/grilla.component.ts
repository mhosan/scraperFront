import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { DatosService } from '../../servicios/datos.service';
//import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  public gridApi: any;
  public gridColumnApi: any;
  public gridOptions: any;
  public rowData: any;
  public rowSelection: any;
  public columnDefs: ColDef[] = [];
  private defaultColDef;
  public datosLeidos: number = 0;
  public datosTotales: number = 0;
  public losDatosConFechaConvertida: any;
  public seleccion: string = '';
  public variacion: number = 0;
  public productoVariacion = '';
  public arrayPrecios: number[] = [];
  public filtrarChecked: boolean;
  public mostrarAlert: boolean = false;

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'Superm.', field: 'supermercado', width: 110, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Fecha', field: 'fecha', width: 120, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Descrip.', field: 'descrip', width: 475, sortable: true, filter: true, headerClass: 'miClase' },
      { headerName: 'Precio', field: 'precio', width: 110, sortable: true, headerClass: 'miClase' }
    ];

    this.rowSelection = 'single';
    /* this.defaultColDef = {
      flex: 1,
      minWidth: 110,
      editable: true,
      resizable: true,
    }; */
  }

  filtroProducto(producto: string) {
    this.datosService.getProducto(producto)
      .subscribe(
        (data) => {
          this.convertirFecha(data.data);
          this.rowData = this.losDatosConFechaConvertida;
          this.datosLeidos = data.data.length;
        })
    this.seleccion = '';
    this.filtrarChecked = false;
  }

  onSelectionChanged(event: any) {
    //.................................................................
    //let selectedNodes = this.gridApi.getSelectedNodes();
    //let selectedData = selectedNodes.map((node: { data: any; }) => node.data);
    //console.log(`Nodo seleccionado:\n${JSON.stringify(selectedData)}`);
    //................................................................. 
    let selectedRows = this.gridApi.getSelectedRows();
    let seleccion = selectedRows[0].descrip;
    //console.log(seleccion);
    this.seleccion = seleccion;
    //this.filtroProducto(seleccion);
    //this.variacion = 0;
    this.variaciones();
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

  convertirFecha(data: any) {
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

  home() {
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
    this.seleccion = '';
    this.filtrarChecked = false;
  }

  filtrar() {
    this.filtrarChecked = true;
    this.filtroProducto(this.seleccion);
  }
  variacionUnProducto() {
    alert(this.seleccion);
  }
  editar() {
    this.mostrarAlert = true;
  }
  borrar() {
    this.mostrarAlert = true;
  }

  variaciones() {
    this.datosService.getVariaciones(this.seleccion)
      .subscribe(
        (data) => {
          this.variacion = data.data.length;
          this.productoVariacion = data.data[0]._id.descripcion;
          this.arrayPrecios = [];
          for (let i = 0; i < data.data.length; i++) {
            this.arrayPrecios.push(data.data[i]._id.precio);
          }
          //console.log(this.arrayPrecios);
        })
  }
}
