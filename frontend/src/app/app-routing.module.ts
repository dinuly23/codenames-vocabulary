import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainGameComponent } from './components/main-game/main-game.component';
import { RuleComponent } from './components/rule/rule.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [ 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'rules', component: RuleComponent},
  {path: 'game/:gameId', redirectTo: 'home', pathMatch: 'full' },
  {path: 'game/:gameId/player/:playerType', component: MainGameComponent },
  {path: '404', component: ErrorComponent, data: { errorCode: 404 } },
  {path: '500', component: ErrorComponent, data: { errorCode: 500 } },
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
