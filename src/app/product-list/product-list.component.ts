import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'product A', price: 10 },
    { id: 2, name: 'product B', price: 30 },
  ];

  // itemList = signal(this.products);
  itemList = signal(this.products);

  readonly totalPrice = computed(() => {
    return this.itemList().reduce((acc, curr) => acc + curr.price, 0);
  });

  removeItem(item) {
    // Update the itemList signal by removing the selected item
    this.itemList.set(this.itemList().filter((i) => i !== item));
  }

  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.totalPrice()}`);
    });
  }

  ngOnInit(): void {
    // Signals Example Scenario
    this.doFunctionA();
    this.doFunctionB();

  }

  doFunctionA() {
    let x = 5;
    let y = 3;
    let z = x + y;
    console.log(z);

    x = 10;
    console.log(z);
  }

  doFunctionB() {
    const x = signal(5);
    const y = signal(3);
    const z = computed(() => x() + y());
    console.log(z()); // 8

    x.set(10);
    console.log(z()); // 13
  }
}
