export class Category {
  id?;
  name = '';
  items: CategoryItem[] = [];

  constructor(name: string, items: CategoryItem[]) {
    this.name = name;
    this.items = items;
  }
}

export class CategoryItem {
  name: string;
  budget: number;

  constructor(name: string, budget: number) {
    this.name = name;
    this.budget = budget;
  }
}
