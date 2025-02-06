import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { useDispatch } from 'react-redux'; // Use the dispatch hook

// Public layout components
import AboutView from './page/AboutView';
import CartView from './page/CartView';
import OrderView from './page/OrderView';
import ProductView from './page/ProductView';
import HomeView from './page/HomeView';
import LoginView from './page/auth/LoginView';
import RegisterView from './page/auth/RegisterView';
import PublicLayout from './Layouts/PublicLayout';
import DetailProduct from "./page/DetailProduct";
import CreateProductView from "./page/CreateProductView";
import EditProductView from "./page/EditProductView";
import CheckoutView, { loader as CheckoutLoader } from "./page/CheckoutView";
import ErrorView from "./page/ErrorView";
import OrderDetailView, { orderDetailLoader } from "./page/OrderDetail";


// Loaders
import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";
import { loader as OrderLoader } from "./page/OrderView";
import {loader as CreateProductLoader} from "./page/CreateProductView"
import {loader as EditProductLoader} from "./page/EditProductView"
// Actions
import { action as LoginAction } from "./page/auth/LoginView";
import { action as RegisterAction } from "./page/auth/RegisterView";

// Store
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader
      },
      {
        path: 'products',
        element: <ProductView />,
        loader: ProductLoader
      },
      {
        path: 'product/create',
        element: <CreateProductView />,
        loader: CreateProductLoader(store)
        
      },
      {
        path: 'product/:id/edit',
        element: <EditProductView/>,
        loader : EditProductLoader(store)
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      {
        path: 'order',
        element: <OrderView />,
        loader: OrderLoader(store), // Pass store to OrderLoader
      }, 
      {
        path: "/order/:id",
        element: <OrderDetailView />,
        loader: orderDetailLoader,
      },
      {
        path: 'checkout',
        element: <CheckoutView />,
        loader: CheckoutLoader(store) // Pass store to CheckoutLoader
      },
      {
        path: 'cart',
        element: <CartView />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: '/register',
    element: <RegisterView />,
    action: RegisterAction(store),
  },
  // Catch-all route for 404 Not Found
 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
