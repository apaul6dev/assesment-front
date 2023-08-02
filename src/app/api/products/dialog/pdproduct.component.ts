import { Component, Inject, OnInit } from "@angular/core";
import { Product } from '../../model/product';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProductService } from "../../service/products.service";

@Component({
    selector: 'app-product-dialog',
    templateUrl: './pdproduct.component.html',
    styleUrls: ['./pdproduct.component.css']
})
export class ProductDialogComponent implements OnInit {

    product: Product | any;

    constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Product,
        private productService: ProductService) {

    }

    ngOnInit(): void {
        this.product = new Product();
        this.product.id = this.data.id;
        this.product.name = this.data.name;
        this.product.description = this.data.description;
        this.product.qty = this.data.qty;
        this.product.price = this.data.price;
    }

    operar() {
        if (this.product != null && this.product.id > 0) {
            this.productService.update(this.product).subscribe(data => {
                this.productService.getProducts().subscribe(medicos => {
                    this.productService.productsChange.next(medicos);
                    this.productService.msgChange.next('Updated');
                });
            });
        } else {
            this.productService.save(this.product).subscribe(data => {
                this.productService.getProducts().subscribe(medicos => {
                    this.productService.productsChange.next(medicos);
                    this.productService.msgChange.next('Saved');
                });
            });
        }
        this.dialogRef.close();
    }


    cancel() {
        this.dialogRef.close();
    }

}