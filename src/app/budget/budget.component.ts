import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {Subscription} from 'rxjs';

enum EditingMode {
  CategoryName = 1,
  ItemName = 2,
  ItemBudget = 3
}

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {
  editingModes = EditingMode;

  categories: Category[];
  selectedCategoryIndex: number;
  editingCategoryIndex: number;
  editingItemIndex: number;
  editingMode: EditingMode;

  categorySubscription = new Subscription();

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this._categoryService.categories;

    this.categorySubscription = this._categoryService.categoryUpdated.subscribe(
      ({index, category}) => {
        this.categories[index] = category;
      }
    );
  }

  onCategorySelect(index: number) {
    this.selectedCategoryIndex = index;
  }

  onCategoryNameSelect(index: number) {
    this.editingCategoryIndex = index;
    this.editingMode = EditingMode.CategoryName;
  }

  onItemNameSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemIndex = itemIndex;
    this.editingMode = EditingMode.ItemName;
  }

  onItemBudgetSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemIndex = itemIndex;
    this.editingMode = EditingMode.ItemBudget;
  }

  onCategoryNameSubmit(form: NgForm) {
    if (form.valid) {
      this._categoryService.setCategoryName(this.editingCategoryIndex, form.value.categoryName);
      this.clearCategoryNameEdit();
    }
  }

  clearCategoryNameEdit() {
    this.editingCategoryIndex = undefined;
    this.editingMode = undefined;
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
