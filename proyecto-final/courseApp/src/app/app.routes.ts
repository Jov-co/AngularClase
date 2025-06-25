import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/courses/courses.component').then(m => m.CoursesComponent)
    },
    {
        path: 'admin-panel',
        loadComponent: () => import('./components/courses/courses.component').then(m => m.CoursesComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
    
];
