import { defineStore } from 'pinia';
import type { IProductVO } from '@/model/vo/ProductVO';
import ProductVO from '@/model/vo/ProductVO';

interface IProductsStoreState {
  list: ProductVO[];
  card: number[];
  selected?: ProductVO | null;
  isLoading: boolean;
}

const baseUrl = import.meta.env.VITE_PRODUCTS_API_URL;

export const useProductsStore = defineStore('products', {
  persist: {
    afterRestore: ({ store }) => {
      const fromRawToProduct = (input: any) => {
        if (!input) return input;
        const result = new ProductVO(input._data);
        result.qty = input._qty;
        return result;
      }
      store.list = store.list.map(fromRawToProduct).filter((vo: any) => !!vo);
      store.selected = fromRawToProduct(store.selected);
      console.log('> store(products) -> afterRestore: store.list =', store.list);
    },
  },
  state: (): IProductsStoreState => ({
    list: [],
    card: [],
    selected: null,
    isLoading: true,
  }),
  getters: {
    noProductsLoaded: (state) => state.list.length === 0,
    totalPrice: (state) => {
      return state.card.reduce((prev: number, id: number) => {
        const vo = state.list.find((vo) => vo.id === id) as ProductVO;
        prev += parseFloat(vo?.price) || 0;
        return prev;
      }, 0);
    },
    numberOfSelectedProducts: (state) => state.card.length,
    selectedProducts: (state) => {
      return state.card.reduce((prev: any, id: number) => {
        const vo = state.list.find((vo) => vo.id === id) as ProductVO;
        if (!prev[id]) prev[id] = vo;
        return prev;
      }, {});
    }
  },
  actions: {
    updateSelectedFrom(product: ProductVO) {
      if (product.id === this.selected?.id) {
        this.selected!.qty = product.qty;
      }
    },
    async addProduct(product: ProductVO) {
      console.log('> store(products) -> addProduct: product =', product);
      if (product) {
        product.qty += 1;
        this.updateSelectedFrom(product);
      }
      this.card.push(product.id);
    },
    async removeProduct(product: ProductVO) {
      console.log('> store(products) -> removeProduct: product =', product);
      if (product) {
        product.qty -= 1;
      }
      const index = this.card.findIndex((id) => product.id === id);
      this.card.splice(index, 1);
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
          this.selected!.qty = this.card.filter((cid) => cid === id).length;
          if (this.noProductsLoaded) await this.loadProducts();
          this.isLoading = false;
        } catch (e) {
          console.log('> store(products) -> loadProductById: error =', e);
        }
      }
    },
    async loadProducts({ limit } = { limit: 20 }) {
      console.log('> store(products) -> loadProducts: limit =', limit);
      try {
        this.isLoading = true;
        let card = this.card;
        this.list = await fetch(`${baseUrl}/products?limit=${limit}`)
          .then((res) => res.json())
          .then((list: IProductVO[]) => list.map((raw) => {
            const product = new ProductVO(raw);
            const cardLeft = card.filter((id) => id !== raw.id);
            product.qty = card.length - cardLeft.length;
            card = cardLeft;
            return product;
          }));
        this.isLoading = false;
      } catch (e) {
        console.log('> store(products) -> loadProducts: error =', e);
      }
    },
  },
});
