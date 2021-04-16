import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {NgForm} from '@angular/forms';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget-category-card',
  templateUrl: './budget-category-card.component.html',
  styleUrls: ['./budget-category-card.component.scss']
})
export class BudgetCategoryCardComponent implements OnInit {
  @Input() categoryIndex: number;

  category: Category;
  editingCategoryName = false;
  editingItemName: boolean[];
  editingItemBudget: boolean[];
  trashIcon = faTrash;

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.category = this._categoryService.categories[this.categoryIndex];
    this.editingItemName = new Array<boolean>(this.category.items.length);
    this.editingItemBudget = new Array<boolean>(this.category.items.length);
  }

  onCategoryNameSelect() {
    this.editingCategoryName = true;
  }

  onCategoryNameSubmit(form: NgForm) {
    if (form.valid) {
      this._categoryService.setCategoryName(this.categoryIndex, form.value.categoryName);
      this.clearCategoryNameEdit();
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

  clearCategoryNameEdit() {
    this.editingCategoryName = false;
  }

  clearItemNameEdit(itemIndex: number) {
    this.editingItemName[itemIndex] = false;
  }

  clearItemBudgetEdit(itemIndex: number) {
    this.editingItemBudget[itemIndex] = false;
  }
}
