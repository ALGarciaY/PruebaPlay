import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products: Product[];
  hasProducts: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
        this.hasProducts = this.products.length > 0;
      },
      error => {
        console.error('Error al obtener la lista de productos', error);
        this.hasProducts = false;
      }
    );
  }

  editProduct(id: number) {
    window.location.href = '/editProduct/' + id;
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: '¿Seguro que desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
  }).then((result) => {
      if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe(
              data => {
                  console.log(data);
                  this.getProducts();
                  Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
              }
          );
      }
  });
  }

}
