import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>  
            import('./features/dashboard/dashboard-page/dashboard-page.component')
                .then(m => m.DashboardPageComponent),
    },
    {
        path: 'transactions/new',
        loadComponent: () =>
            import('./features/transactions/transaction-form-page/transaction-form-page.component')
            .then(m => m.TransactionFormPageComponent),
    },

    {
        path: 'transactions',
        loadComponent: () =>  
            import('./features/transactions/transactions-page/transactions-page.component')
                .then(m => m.TransactionsPageComponent),
    },
    {
        path: 'transactions/:id/edit',
        loadComponent: () =>
            import('./features/transactions/transaction-form-page/transaction-form-page.component')
            .then(m => m.TransactionFormPageComponent)
    },
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, // Vào trang gốc / thì tự về dashboard 
    {path: '**', redirectTo: 'dashboard' }, // Gõ URL sai về trang gốc
];
