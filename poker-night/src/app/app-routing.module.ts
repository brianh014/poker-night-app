import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'players', component: PlayersComponent},
  { path: 'games', component: GamesComponent},
  { path: 'games/:id', component: GameComponent},

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
