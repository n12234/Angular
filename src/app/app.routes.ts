import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CreateComponent } from "./pages/admin/create/create.component";
import { EditComponent } from './pages/admin/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ListCategoryComponent } from './pages/admin/categories/list-category/list-category.component';
import { CreateCategoryComponent } from './pages/admin/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { ListUserComponent } from './pages/admin/users/list-user/list-user.component';
import { EditUserComponent } from './pages/admin/users/edit-user/edit-user.component';
import { CreateUserComponent } from './pages/admin/users/create-user/create-user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'admin',
        component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: 'products', component: ProductsComponent },
            { path: 'product/create', component: CreateComponent },
            { path: 'product/:id', component: EditComponent },
            { path: 'categories', component: ListCategoryComponent },
            { path: 'categories/create', component: CreateCategoryComponent },
            { path: 'category/:id', component: EditCategoryComponent },
            { path: 'users', component: ListUserComponent },
            { path: 'users/create', component: CreateUserComponent },
            { path: 'user/:id', component: EditUserComponent },
        ],
    }
]






