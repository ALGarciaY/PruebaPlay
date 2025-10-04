import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BuyService } from '../../../services/buy.service';

export interface ModalSalesData {
  variable: string;
  initial?: number;
  min?: number;
  max?: number;
  idProduct?: number;
  name?: string; 
}

@Component({
  selector: 'app-modal-sales',
  templateUrl: './modal-sales.component.html',
  styleUrls: ['./modal-sales.component.css'],
})
export class ModalSalesComponent {
  form = this.fb.group({
    cantidad: [
      this.data.initial ?? 1,
      [
        Validators.required,
        Validators.min(this.data.min ?? 1),
        ...(this.data.max ? [Validators.max(this.data.max)] : []),
      ],
    ],
  });
  router: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSalesComponent, number>,
    private service: BuyService,
    @Inject(MAT_DIALOG_DATA) public data: ModalSalesData
  ) {}

  cancelar() {
    this.dialogRef.close(); // undefined => cancelado
  }

  vender() {

    const { idProduct } = this.data;

    if (!idProduct) {
      console.error('ID del producto no proporcionado');
      return;
    }

    if (this.form.valid) {
      const cantidad = this.form.value.cantidad!;
      const producto = this.data.name;

      Swal.fire({
        title: `¿Seguro que desea vender ${cantidad} unidades de ${producto}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, vender',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          //Si confirma, realiza la venta
          this.service.saveBuyProduct(idProduct, cantidad).subscribe({
            next: (response) => {
              Swal.fire({
                title: 'Venta exitosa',
                text: `Se han vendido ${cantidad} unidades de ${producto}.`,
                icon: 'success',
              }).then(() => {
                this.dialogRef.close(cantidad);
                this.router.navigate(['/products']); //Redirige al listado
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo completar la venta.',
                icon: 'error',
              });
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          //Si cancela, cierra el modal y redirige
          this.dialogRef.close();
          this.router.navigate(['/products']);
        }
      });
    }
  }
}
