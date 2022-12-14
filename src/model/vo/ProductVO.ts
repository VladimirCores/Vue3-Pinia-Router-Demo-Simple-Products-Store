export interface IProductVO {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default class ProductVO implements IProductVO {
  get qty(): number {
    return this._qty;
  }

  set qty(value: number) {
    this._qty = value;
  }
  get title(): string {
    return this._data.title;
  }
  get price(): string {
    return this._data.price;
  }
  get image(): string {
    return this._data.image;
  }
  get id(): number {
    return this._data.id;
  }
  get description(): string {
    return this._data.description;
  }
  get category(): string {
    return this._data.category;
  }

  private readonly _data: IProductVO;
  private _qty: number = 0;
  
  constructor(data:IProductVO) {
    this._data = data;
  }
}
