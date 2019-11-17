import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/player.service';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';

export interface DialogData {
  game: Game;
}

@Component({
  selector: 'app-new-player-dialog',
  templateUrl: './new-player-dialog.component.html'
})
export class NewPlayerDialog {
  name: string = '';

  constructor(
    private playerService: PlayerService,
    public dialogRef: MatDialogRef<NewPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  addPlayer() {
    if (this.name && this.name != '') {
      let player = new Player();
      player.name = this.name;
      this.playerService.updateOrCreatePlayer(player)
        .then(player => {
          this.dialogRef.close(true);
        },
        err => {
          alert("Could not create player. That player may already exist!");
        });
    }
  }
}
