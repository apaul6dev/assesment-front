

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../service/products.service';
import { Product } from '../model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from './dialog/pdproduct.component';

@Component({
  selector: 'app-root',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'qty', 'price', 'acciones'];
  dataSource: MatTableDataSource<Product> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any; 

  constructor(private productsService: ProductService,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    /**
     * show messages about the actions
     */
    this.productsService.msgChange.subscribe(data => {
      this.snackBar.open(data, 'Noticed', { duration: 2000 });
    });
    /**
     * refresh the table when there are changes
     */
    this.productsService.productsChange.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    /**
     * List all products stored in the db
     */
    this.productsService.getProducts().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(product?: Product) {
    const med = product != null ? product : new Product();
    this.dialog.open(ProductDialogComponent, {
      width: '250px',
      disableClose: false,
      data: med
    });
  }
  /**
   * 
   * @param product 
   * Remove a product using its id
   */
  removeData(product: Product) {
    this.productsService.delete(product.id ? product.id : 0).subscribe(data => {
      this.productsService.getProducts().subscribe(rs => {
        this.productsService.productsChange.next(rs);
        this.productsService.msgChange.next('Deleted');
      });
    });
  }
  /**
   * 
   * @param event 
   * 
   * used to manage the filter on the table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}