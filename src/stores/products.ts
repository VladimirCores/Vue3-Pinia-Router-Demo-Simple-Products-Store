import { defineStore } from 'pinia';
import type { IProductVO } from '@/model/vo/ProductVO';
import ProductVO from '@/model/vo/ProductVO';

interface IProductsStoreState {
  list: ProductVO[];
  card: ProductVO[];
  selected?: ProductVO | null;
  isLoading: boolean;
}

const baseUrl = import.meta.env.VITE_PRODUCTS_API_URL;

export const useProductsStore = defineStore('products', {
  state: (): IProductsStoreState => ({
    list: [],
    card: [],
    selected: null,
    isLoading: true,
  }),
  getters: {
    totalPrice: (state) => {
      return state.card.length > 0 ? state.card.reduce((prev: number, vo) => (prev += parseFloat(vo.price), prev), 0) : 0;
    }
  },
  actions: {
    async addProduct(product: ProductVO) {
      console.log('> store(products) -> addProduct: product =', product);
      if (product) {
        product.qty += 1;
      }
      this.card.push(product);
    },
    async removeProduct(product: ProductVO) {
      console.log('> store(products) -> removeProduct: product =', product);
      if (product) {
        product.qty -= 1;
      }
      this.card.splice(this.card.indexOf(product), 1);
    },
    findProductById(id: number): ProductVO | undefined {
      console.log('> store(products) -> findProductById: id =', id);
      return this.list.find((vo) => vo.id === id) as ProductVO;
    },
    async loadProductById(id: number) {
      this.selected = this.findProductById(id);
      console.log('> store(products) -> loadProductById: selected =', this.selected);
      if (!this.selected) {
        try {
          this.isLoading = true;
          this.selected = await fetch(`${baseUrl}/products/${id}`).then((res) => res.json()).then((raw) => new ProductVO(raw));
          this.isLoading = false;
        } catch (e) {
          console.log('> store(products) -> loadProductById: error =', e);
        }
      }
    },
    async loadProducts({ limit } = { limit: 10 }) {
      console.log('> store(products) -> loadProducts: limit =', limit);
      try {
        this.isLoading = true;
        this.list = await fetch(`${baseUrl}/products?limit=${limit}`)
          .then((res) => res.json())
          .then((list: IProductVO[]) => list.map((raw) => new ProductVO(raw)));
        this.isLoading = false;
      } catch (e) {
        console.log('> store(products) -> loadProducts: error =', e);
      }
    },
  },
});
