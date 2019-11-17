import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../models/game.model';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialog } from './new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.less']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAll()
      .then(games => {
        this.games = games.map(x => Object.assign(new Game(), x));
      },
      err => {
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
    this.gameService.deleteGame(game._id)
      .then(msg => {
        this.getAllGames();
      }, err => {
        alert('Could not delete game.');
      });
  }

}
