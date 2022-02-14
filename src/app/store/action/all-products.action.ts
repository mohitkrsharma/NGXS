/* get all products */
export class GetAllProducts {
  static readonly type = '[Products] Get';
}

/* set selected product */
export class SetSelectedProduct {
  static readonly type = '[Products] Set';
  constructor(public id: number) {}
}

/* add product */
export class AddProduct {
  static readonly type = '[Products] Add';
  constructor(public payload: any) {}
}

/* delete product */
export class DeleteProduct {
  static readonly type = '[Products] Delete';
  constructor(public id: number) {}
}

/* update product */
export class UpdateProduct {
  static readonly type = '[Products] Update';
  constructor(public payload: any) {}
}
