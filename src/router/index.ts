import { createRouter, createWebHistory } from 'vue-router';
import ListProductsView from '@/views/ProductsView.vue';
import Routes from '@/consts/Routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...Routes.LIST_OF_PRODUCTS,
      component: ListProductsView,
    },
    {
      ...Routes.SELECTED_PRODUCT,
      component: () => import('../views/SelectedView.vue'),
    },
    {
      ...Routes.CARD,
      component: () => import('../views/CardView.vue'),
    },
  ],
});

export default router;
