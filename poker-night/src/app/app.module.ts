import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { PlayersComponent } from './players/players.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';
import { LoginComponent } from './login/login.component';

import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import { AccountService } from './services/account.service';
import { HttpClientService } from './services/httpClient.service';

import { NewGameDialog } from './games/new-game-dialog/new-game-dialog.component';
import { AddPlayerDialog } from './games/add-player-dialog/add-player-dialog.component';
import { NewPlayerDialog } from './players/new-player-dialog/new-player-dialog.component';
import { ConfirmDialog } from './common/confirm-dialog/confirm-dialog.component';
import { BuyUpDialog } from './games/buy-up-dialog/buy-up-dialog.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    DashboardComponent,
    GamesComponent,
    GameComponent,
    NewGameDialog,
    AddPlayerDialog,
    NewPlayerDialog,
    ConfirmDialog,
    LoginComponent,
    BuyUpDialog,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    NgxCurrencyModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpClientService,
    PlayerService,
    GameService,
    DatePipe,
    AccountService,
    CookieService
  ],
  entryComponents: [
    NewGameDialog,
    AddPlayerDialog,
    NewPlayerDialog,
    ConfirmDialog,
    BuyUpDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
