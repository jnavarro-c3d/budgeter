import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {Subscription} from 'rxjs';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {
  categories: Category[];
  selectedCategoryIndex: number;
  selectedCategoryToRemoveIndex: number;
  editingCategoryName: boolean[];
  editingItemName: boolean[][];
  editingItemBudget: boolean[][];

  trashIcon = faTrash;

  categorySubscription = new Subscription();
  categoriesSubscription = new Subscription();

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this._categoryService.categories;
    this.editingCategoryName = new Array<boolean>(this.categories.length);
    this.editingItemName = new Array<Array<boolean>>(this.categories.length);
    this.editingItemBudget = new Array<Array<boolean>>(this.categories.length);
    for (let i = 0; i < this.categories.length; i++) {
      this.editingItemName[i] = new Array<boolean>(this.categories[i].items.length);
      this.editingItemBudget[i] = new Array<boolean>(this.categories[i].items.length);
    }

    this.categorySubscription = this._categoryService.categoryUpdated.subscribe(
      ({index, category}) => {
        this.categories[index] = category;
      }
    );
    this.categoriesSubscription = this._categoryService.categoriesUpdated.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );

    this._route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.selectedCategoryIndex = +paramMap.get('id');
        } else {
          this.selectedCategoryIndex = undefined;
        }
      }
    );
  }

  onCategorySelect(index: number) {
    if (this.selectedCategoryIndex !== undefined && this.selectedCategoryIndex === index) {
      this._router.navigate(['/budget']);
    } else {
      this._router.navigate(['/budget', index]);
    }
  }

  onCategoryNameSelect(index: number) {
    this.editingCategoryName[index] = true;
  }

  onItemNameSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemName[categoryIndex][itemIndex] = true;
  }

  onItemBudgetSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemBudget[categoryIndex][itemIndex] = true;
  }

  onCategoryNameSubmit(form: NgForm, index: number) {
    if (form.valid) {
      this._categoryService.setCategoryName(index, form.value.categoryName);
      this.clearCategoryNameEdit(index);
    }
  }

  onCategoryRemoveSelect() {
    this._categoryService.removeCategory(this.selectedCategoryIndex);
    this.selectedCategoryIndex = undefined;
  }

  onCategoryAddSelect() {
    this._categoryService.addCategory();
    this.editingCategoryName[this.categories.length - 1] = true;
  }

  onItemNameSubmit(form: NgForm, categoryIndex: number, itemIndex: number) {
    if (form.valid) {
      this._categoryService.setItemName(categoryIndex, itemIndex, form.value.itemName);
      this.clearItemNameEdit(categoryIndex, itemIndex);
    }
  }

  onItemBudgetSubmit(form: NgForm, categoryIndex: number, itemIndex: number) {
    if (form.valid) {
      this._categoryService.setItemBudget(categoryIndex, itemIndex, +form.value.itemBudget.toFixed(2));
      this.clearItemBudgetEdit(categoryIndex, itemIndex);
    }
  }

  clearCategoryNameEdit(index: number) {
    this.editingCategoryName[index] = false;
  }

  clearItemNameEdit(categoryIndex: number, itemIndex: number) {
    this.editingItemName[categoryIndex][itemIndex] = false;
  }

  clearItemBudgetEdit(categoryIndex: number, itemIndex: number) {
    this.editingItemBudget[categoryIndex][itemIndex] = false;
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
}
