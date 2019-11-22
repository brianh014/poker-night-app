import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { Game, GamePlayer } from 'src/app/models/game.model';

export interface DialogData {
  game: Game;
  gamePlayer: GamePlayer;
}

@Component({
  selector: 'app-buy-up-dialog',
  templateUrl: './buy-up-dialog.component.html'
})
export class BuyUpDialog implements OnInit {
  onHand: number;

  constructor(
    private gamesService: GameService,
    public dialogRef: MatDialogRef<BuyUpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({cancel: true});
  }

  buyUp() {
    this.data.gamePlayer.buyIn += this.data.game.buyIn - this.onHand;
    this.dialogRef.close({gamePlayer: this.data.gamePlayer, cancel: false});
  }
}
