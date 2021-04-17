import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()

export class CategoryService {
  private _categories: Category[] = [];

  categoryUpdated = new Subject<{index: number, category: Category}>();
  categoriesUpdated = new Subject<Category[]>();
  categoryDeleted = new Subject();

  constructor(private _http: HttpClient) {
    this._http.get<{message: string, categories: Category[]}>('http://localhost:3000/api/categories').subscribe((res) => {
      this._categories = res.categories;
      this.categoriesUpdated.next(this._categories);
    });
  }

  get categories(): Category[] {
    return this._categories.slice();
  }

  getCategory(index: number): Category {
    return this._categories.slice()[index];
  }

  setCategoryName(index: number, name: string) {
    this._categories[index].name = name;
    this.categoryUpdated.next({index, category: this._categories[index]});
  }

  removeCategory(index: number) {
    this._categories.splice(index, 1);
    console.log(index + ' ' + this._categories);
    this.categoriesUpdated.next(this._categories);
    this.categoryDeleted.next();
  }

  addCategory() {
    this._categories.push(new Category('', []));
    this.categoriesUpdated.next(this._categories);
  }

  calculateCategorySum(index: number): number {
    let sum = 0;
    for (const item of this._categories[index].items) {
      sum += item.budget;
    }
    return sum;
  }

  setItemName(categoryIndex: number, itemIndex: number, name: string) {
    this._categories[categoryIndex].items[itemIndex].name = name;
    this.categoryUpdated.next({
      index: categoryIndex,
      category: this._categories[categoryIndex]
    });
  }

  setItemBudget(categoryIndex: number, itemIndex: number, budget: number) {
    this._categories[categoryIndex].items[itemIndex].budget = budget;
    this.categoryUpdated.next({
      index: categoryIndex,
      category: this._categories[categoryIndex]
    });
  }
}
