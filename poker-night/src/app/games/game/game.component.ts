import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Game, GamePlayer } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialog } from '../add-player-dialog/add-player-dialog.component';
import { ConfirmDialog } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  game: Game;
  user: User;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private accountService: AccountService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.accountService.currentUser.subscribe(user => this.user = user);

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
        this.game = Object.assign(new Game(), game);
      },
      err => alert('Could not update player'));
  }

  removePlayer(player: GamePlayer) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.gameService.deletePlayer(this.game._id, player)
          .then(game => {
            this.game = Object.assign(new Game(), game);
          },
          err => alert('Could not delete player'));
      }
    });
  }

  toggleClosed() {
    if (this.user && this.user.isAdmin) {
      this.gameService.toggleClosed(this.game._id)
        .then(
          game => this.game = Object.assign(new Game(), game),
          err => alert('Could not open or close game')
        );
    }
  }

}
