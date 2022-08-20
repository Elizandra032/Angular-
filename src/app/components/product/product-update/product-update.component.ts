import { Product } from "./../../../component/product/product.model";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product!: Product
 
  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.ProductService.readById('id').subscribe(product => {
      this.product = product
    });
  }

  updateProduct(): void {
    this.ProductService.update(this.product).subscribe(() => {
      this.ProductService.showMessage("Produto Atualizado Com Sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
