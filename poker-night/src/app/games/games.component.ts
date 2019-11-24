import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../models/game.model';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialog } from './new-game-dialog/new-game-dialog.component';
import { ConfirmDialog } from '../common/confirm-dialog/confirm-dialog.component';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.less']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  user: User;

  loading = false;
  loaded = false;

  constructor(private gameService: GameService,
              public dialog: MatDialog,
              private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.currentUser.subscribe(user => this.user = user);

    this.getAllGames();
  }

  getAllGames() {
    this.loaded = false;
    setTimeout(t => this.loading = !this.loaded, 500);

    this.gameService.getAll()
      .then(games => {
        this.games = games.map(x => Object.assign(new Game(), x));
        this.loaded = true;
        this.loading = false;
      },
      err => {
        this.loaded = true;
        this.loading = false;
        alert("Sorry, could not get games at this time.");
      })
  }

  openNewGameDialog() {
    const dialogRef = this.dialog.open(NewGameDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getAllGames();
      }
    });
  }

  deleteGame(game: Game) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px'
    });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.gameService.deleteGame(game._id)
          .then(msg => {
            this.getAllGames();
          }, err => {
            alert('Could not delete game.');
          });
      }
    });
  }

}
