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

    this.datosService.getDatos()
      .subscribe(
        (data) => {
          const datos: string | any[][] = data;
          this.datosTotales = datos.length;
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
    this.rowSelection = 'single';
    const total = this.datosService.getTotal()
      .subscribe(
        (data) => { 
          const parseados = JSON.stringify(data);
          console.log(`El total: ${parseados}`)
        })
  }

  filtroProducto(producto: string) {
    //const filtro = this.gridOptions.api.getFilterInstance(producto);
    console.log('Aca va el filtro');
  }

  onSelectionChanged(parametro: any) {
    //let selectedNodes = this.gridApi.getSelectedNodes();
    //let selectedData = selectedNodes.map(node => node.data);
    // alert(`Nodo seleccionado:\n${JSON.stringify(selectedData)}`); 
    /*let selectedRows = this.gridApi.getSelectedRows();
    let seleccion = selectedRows[0].id;
    console.log(seleccion);
    const destino = seleccion.toString();*/
  }
  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData,
    }
  }
}
