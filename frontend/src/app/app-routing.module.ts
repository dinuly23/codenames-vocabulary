import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainGameComponent } from './components/main-game/main-game.component';
import { RuleComponent } from './components/rule/rule.component';

const routes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: MainGameComponent},
  {path: 'rules', component: RuleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
