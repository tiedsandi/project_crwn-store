# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```r
src/
├── app/
│   ├── Routes.jsx
│   ├── store.js
├── assets/
├── components/
│   ├── navigation/ # intinya header
│   ├── UI/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Spinner/ # untuk loading
├── features/
│   ├── admin/
│   │   ├── components/
│   │   ├── layout/
│   │   │   ├── admin-layout.component.jsx
│   │   │   └── admin-layout.module.css
│   │   ├── pages/
│   │   │   ├── product/
│   │   │   │   ├── AdminProduct.jsx #page product admin/product
│   │   │   │   ├── ProductCreate.jsx #page product admin/product/create
│   │   │   │   ├── productUpdate.jsx #page product admin/product/update/:id
│   │   │   ├── AdminDashboard.jsx #page dashboard admin/dashboard
│   │   │   └── AdminTranscation.jsx #page transaction admin/transaction
│   │   └── product.firebase.js
│   ├── auth/
│   │   ├── components/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── layout-auth.component.jsx
│   │   ├── services/
│   │   ├── auth.selector.js
│   │   ├── auth.utils.js
│   │   ├── authSlice.js #auth slice
│   │   └── Auth.jsx #page auth
│   ├── cart/
│   │   ├── components/
│   │   ├── cart.selector.js
│   │   ├── cart.utils.js
│   │   └── cartSlice.js #cart slice
│   ├── checkout/
│   │   ├── components/
│   │   ├── services/
│   │   └── checkout.jsx #page checkout
│   ├── home/
│   │   ├── components/
│   │   └── home.jsx #page home
│   └── shop/
│       ├── components/
│       └── Shop.jsx #page shop
├── hooks/             # Custom hooks
├── utils/
│   └── firebase.js
├── data.js
├── index.css
├── index.jsx
└── App.jsx          # Komponen root aplikasi


```
