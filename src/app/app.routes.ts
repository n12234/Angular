import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CreateComponent } from "./pages/admin/create/create.component";
import { EditComponent } from './pages/admin/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    { path: 'product/:id', component: ProductDetailComponent },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
          { path: 'products', component: ProductsComponent },
          { path: 'product/create', component: CreateComponent },
          { path: 'product/:id', component: EditComponent },
        ],
    }
]
