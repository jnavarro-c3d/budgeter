import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {NgForm} from '@angular/forms';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-budget-category-card',
  templateUrl: './budget-category-card.component.html',
  styleUrls: ['./budget-category-card.component.scss']
})
export class BudgetCategoryCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() categoryIndex: number;

  category: Category;
  editingCategoryName = false;
  editingItemName: boolean[];
  editingItemBudget: boolean[];

  trashIcon = faTrash;
  plusIcon = faPlus;

  categoriesSubscription = new Subscription();

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.category = this._categoryService.getCategory(this.categoryIndex);
    this.editingItemName = new Array<boolean>(this.category.items.length);
    this.editingItemBudget = new Array<boolean>(this.category.items.length);

    // If being added, enter category name editing mode
    if (this.category.name === '') {
      this.editingCategoryName = true;
    }

    this.categoriesSubscription = this._categoryService.categoriesUpdated.subscribe(
      (categories: Category[]) => {
        this.category = categories[this.categoryIndex];
      }
    );
  }

  ngOnChanges(): void {
    this.category = this._categoryService.getCategory(this.categoryIndex);
    this.editingItemName = new Array<boolean>(this.category.items.length);
    this.editingItemBudget = new Array<boolean>(this.category.items.length);
  }

  onCategoryNameSelect() {
    this.editingCategoryName = true;
  }

  onCategoryNameBlur(form: NgForm) {
    if (form.valid) {
      this.onCategoryNameSubmit(form);
    }
  }

  onCategoryNameSubmit(form: NgForm) {
    if (form.valid) {
      this._categoryService.setCategoryName(this.categoryIndex, form.value.categoryName);
      this.clearCategoryNameEdit(form);
    }
  }

  onCategoryRemoveSelect() {
    this._categoryService.removeCategory(this.categoryIndex);
  }

  onItemNameSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemName[itemIndex] = true;
  }

  onItemBudgetSelect(categoryIndex: number, itemIndex: number) {
    this.editingItemBudget[itemIndex] = true;
  }

  onItemNameSubmit(form: NgForm, itemIndex: number) {
    if (form.valid) {
      this._categoryService.setItemName(this.categoryIndex, itemIndex, form.value.itemName);
      this.clearItemNameEdit(itemIndex);
    }
  }

  onItemBudgetSubmit(form: NgForm, itemIndex: number) {
    if (form.valid) {
      this._categoryService.setItemBudget(this.categoryIndex, itemIndex, +form.value.itemBudget.toFixed(2));
      this.clearItemBudgetEdit(itemIndex);
    }
  }

  clearCategoryNameEdit(form: NgForm) {
    if (form.valid) {
      this.editingCategoryName = false;
    }
  }

  clearItemNameEdit(itemIndex: number) {
    this.editingItemName[itemIndex] = false;
  }

  clearItemBudgetEdit(itemIndex: number) {
    this.editingItemBudget[itemIndex] = false;
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }
}
