import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { Game } from 'src/app/models/game.model';

export interface DialogData {
  game: Game;
}

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html'
})
export class AddPlayerDialog implements OnInit {
  players: Player[] = [];
  selectedPlayer: Player;

  constructor(
    private gamesService: GameService,
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<AddPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.playerService.getAll()
      .then(players => {
        this.players = players.filter(p => this.data.game.players.findIndex(gp => gp.player._id == p._id) < 0);
      });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addPlayer() {
    this.gamesService.addPlayer(this.data.game._id, this.selectedPlayer)
      .then(game => {
        this.dialogRef.close(true);
      },
      err => {
        alert("Sorry, could not add this player to the game.");
      });
  }
}
