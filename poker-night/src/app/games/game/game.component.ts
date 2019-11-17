import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Game, GamePlayer } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialog } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  game: Game;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getGame();
  }

  getGame() {
    this.route.paramMap.subscribe(params => {
      let gameId = params.get("id");
      this.gameService.get(gameId).then(game => {
        this.game = Object.assign(new Game(), game);
      },
      err => {
        alert("Sorry, could not get this game at this time.");
      });
    });
  }

  openNewGameDialog() {
    const dialogRef = this.dialog.open(AddPlayerDialog, {
      width: '400px',
      data: { game: this.game }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getGame();
      }
    });
  }

  buyInChanged(player: GamePlayer, value: number) {
    player.buyIn = value;
    player.changed = true;
  }

  cashOutChanged(player: GamePlayer, value: number) {
    player.cashOut = value;
    player.changed = true;
  }

  updatePlayer(player: GamePlayer) {
    this.gameService.updatePlayer(this.game._id, player)
      .then(game => {
        this.game = game;
      });
  }

  removePlayer(player: GamePlayer) {
    this.gameService.deletePlayer(this.game._id, player)
      .then(game => {
        this.game = game;
      });
  }

}
