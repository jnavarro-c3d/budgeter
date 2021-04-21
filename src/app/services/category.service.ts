import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()

export class CategoryService {
  private _categories: Category[] = [];

  categoryUpdated = new Subject<{index: number, category: Category}>();
  categoriesUpdated = new Subject<Category[]>();
  categoryDeleted = new Subject();

  constructor(private _http: HttpClient) {
    this._http.get<{message: string, categories: any}>('http://localhost:3000/api/categories')
      .pipe(map((categoryData) => {
        return categoryData.categories.map(category => {
          return {
            id: category._id,
            name: category.name,
            items: category.items
          };
        });
      }))
      .subscribe(transformedCategories => {
        this._categories = transformedCategories;
        this.categoriesUpdated.next(this._categories.slice());
      });
  }

  get categories(): Category[] {
    return this._categories.slice();
  }

  getCategory(index: number): Category {
    return this._categories.slice()[index];
  }

  // TODO: Look more into the proper way to use PATCH in your API
  setCategoryName(id: string, name: string) {
    this._http.patch<{message: string, name: string}>(
      'http://localhost:3000/api/categories/' + id,
      {
        name
      })
        .subscribe((res) => {
          const index = this._categories.findIndex(category => category.id === id);
          this._categories[index].name = name;
          console.log(index);
          this.categoriesUpdated.next(this._categories.slice());
    });
  }

  removeCategory(id: string) {
    this._http.delete<{message: string, categories: Category[]}>(
      'http://localhost:3000/api/categories/' + id
      )
      .subscribe(res => {
        const updatedCategories = this._categories.filter(category => category.id !== id);
        this._categories = updatedCategories;
        this.categoriesUpdated.next(this._categories.slice());
      });
  }

  addCategory() {
    const addedCategory = new Category('New Category', []);
    this._http.post<{message: string, category: any}>(
      'http://localhost:3000/api/categories', addedCategory)
      .pipe(map((categoryData) => {
        return {
          id: categoryData.category._id,
          name: categoryData.category.name,
          items: categoryData.category.items
        };
      }))
      .subscribe(category => {
        this._categories.push(category);
        this.categoriesUpdated.next(this._categories.slice());
    });
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
