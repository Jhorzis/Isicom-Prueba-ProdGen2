import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar Componentes
import { ProdGenComponent } from './components/prod-gen.component';
import { ConProdGenComponent } from './components/con-prod-gen.component'; 


const appRoutes: Routes = [
    {path: '', component: ConProdGenComponent},
    {path: 'ConsultaProdGenerico', component: ConProdGenComponent},
    {path: 'ProdGenerico', component: ProdGenComponent},
    {path: '**', component: ConProdGenComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);