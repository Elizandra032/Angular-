import { Product } from './../../../component/product/product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



const EXAMPLE_DATA: Product[] = [
  {id: 2, name: 'Heliump', price: 9.99},
  {id: 3, name: 'Lithiump', price: 9.99},
  {id: 4, name: 'Berylliump', price: 9.99},
  {id: 5, name: 'Boronp', price: 9.99},
  {id: 6, name: 'Carbonp', price: 9.99},
  {id: 7, name: 'Nitrogenp', price: 9.99},
  {id: 8, name: 'Oxygenp', price: 9.99},
  {id: 9, name: 'Fluorinep', price: 9.99},
  {id: 10, name: 'Neonp', price: 9.99},
  {id: 11, name: 'Sodiump', price: 9.99},
  {id: 12, name: 'Magnesiump', price: 9.99},
  {id: 13, name: 'Aluminump', price: 9.99},
  {id: 14, name: 'Siliconp', price: 9.99},
  {id: 15, name: 'Phosphorusp', price: 9.99},
  {id: 16, name: 'Sulfurp', price: 9.99},
  {id: 17, name: 'Chlorinep', price: 9.99},
  {id: 18, name: 'Argonp', price: 9.99},
  {id: 19, name: 'Potassiump', price: 9.99},
  {id: 20, name: 'Calciump', price: 9.99},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare('+a.id', '+b.id', isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
