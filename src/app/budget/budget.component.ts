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


  trashIcon = faTrash;

  categorySubscription = new Subscription();
  categoriesSubscription = new Subscription();

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this._categoryService.categories;

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

  onCategoryAddSelect() {
    this._categoryService.addCategory();
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
}
