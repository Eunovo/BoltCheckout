import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AddProduct } from './pages/products/AddProduct';
import { ViewProducts } from './pages/products/ViewProducts';
import { GET_INVOICES, GET_PRODUCTS } from './api';
import { Checkout } from './pages/checkout/Checkout';
import { PayInvoice } from './pages/pay/PayInvoice';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path='buy/:productId'
        element={<Checkout />}
        loader={({ params }) => GET_PRODUCTS({ _id: params.productId })}
      />
      <Route
        path='pay/:invoiceId'
        element={<PayInvoice />}
        loader={({ params }) => GET_INVOICES({ _id: params.invoiceId })}
      />

      <Route path="dashboard" element={<Outlet />}>
        <Route path="products" element={<Outlet />}>
          <Route
            index
            element={<ViewProducts />}
            loader={({ params }) => GET_PRODUCTS(params)}
          />
          <Route path="add" element={<AddProduct />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
