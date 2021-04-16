import {Category} from '../models/category.model';
import {Subject} from 'rxjs';

export class CategoryService {
  // TODO: Populate information from NodeJS
  private _categories: Category[] = [
    {
      name: 'Necessities',
      items: [
        {
          name: 'Apartment Rent',
          budget: 1200.00
        },
        {
          name: 'Groceries',
          budget: 300.00
        },
        {
          name: 'Utilities',
          budget: 230.00
        }
      ]
    },
    {
      name: 'Lifestyle',
      items: [
        {
          name: '24 Hour Fitness Membership',
          budget: 41.99
        },
        {
          name: 'YouTube Premium',
          budget: 12.49
        },
        {
          name: 'JetBrains',
          budget: 24.59
        },
        {
          name: 'EveryDollar Plus',
          budget: 10.49
        }
      ]
    },
    {
      name: 'Generosity',
      items: [
        {
          name: 'Tithes',
          budget: 430.00
        }
      ]
    }
  ];

  categoryUpdated = new Subject<{index: number, category: Category}>();

  get categories(): Category[] {
    return this._categories.slice();
  }

  setCategoryName(index: number, name: string) {
    this._categories[index].name = name;
    this.categoryUpdated.next({index, category: this._categories[index]});
  }

  setItemName(categoryIndex: number, itemIndex: number, name: string) {
    this._categories[categoryIndex].items[itemIndex].name = name;
    this.categoryUpdated.next({
      index: categoryIndex,
      category: this._categories[categoryIndex]
    });
  }
}
