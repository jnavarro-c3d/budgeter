export class Category {
  name: string;
  items: CategoryItem[];

  constructor(name: string, items: CategoryItem[]) {}
}

export class CategoryItem {
  name: string;
  budget: number;

  constructor(name: string, budget: number) {}
}
