import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
  editingCategoryName: boolean[];
  editingItemName: boolean[][];

  categorySubscription = new Subscription();

  constructor(
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this._categoryService.categories;
    this.editingCategoryName = new Array<boolean>(this.categories.length);
    this.editingItemName = new Array<Array<boolean>>(this.categories.length);
    for (let i = 0; i < this.categories.length; i++) {
      this.editingItemName[i] = new Array<boolean>(this.categories[i].items.length);
    }

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
    this.editingCategoryName[index] = true;
  }

  onItemNameSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemName[categoryIndex][itemIndex] = true;
  }

  onItemBudgetSelect(categoryIndex: number, itemIndex: number) {

  }

  onCategoryNameSubmit(form: NgForm, index: number) {
    if (form.valid) {
      this._categoryService.setCategoryName(index, form.value.categoryName);
      this.clearCategoryNameEdit(index);
    }
  }

  onItemNameSubmit(form: NgForm, categoryIndex: number, itemIndex: number) {
    if (form.valid) {
      this._categoryService.setItemName(categoryIndex, itemIndex, form.value.itemName);
      this.clearItemNameEdit(categoryIndex, itemIndex);
    }
  }

  onItemBudgetSubmit(form: NgForm) {

  }

  clearCategoryNameEdit(index: number) {
    this.editingCategoryName[index] = false;
  }

  clearItemNameEdit(categoryIndex: number, itemIndex: number) {
    this.editingItemName[categoryIndex][itemIndex] = false;
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
