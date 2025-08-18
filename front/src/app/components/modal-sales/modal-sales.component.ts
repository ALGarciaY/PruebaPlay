import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSalesComponent, number>,
    private service: ProductService,
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
      this.service
        .saveBuyProduct(idProduct, this.form.value.cantidad!)
        .subscribe({
          next: (response) => {
            setTimeout(() => {
              Swal.fire({
                title: 'Venta exitosa',
                text: `Se han vendido ${this.form.value.cantidad} unidades de ${this.data.name}.`,
                icon: 'success',
              });
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

      this.dialogRef.close(this.form.value.cantidad!);
    }
  }
}
