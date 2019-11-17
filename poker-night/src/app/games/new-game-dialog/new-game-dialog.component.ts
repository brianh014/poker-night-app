import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { NewGame } from 'src/app/models/game.model';

export interface DialogData {
}

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html'
})
export class NewGameDialog implements OnInit {
  date: string;
  buyIn: number;

  constructor(
    private gamesService: GameService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    let now = new Date();
    this.date = this.datePipe.transform(now, 'yyyy-MM-dd');

    this.buyIn = 10;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  createGame() {
    if (this.date != null && this.buyIn > 0) {
      let newGame = new NewGame();
      newGame.buyIn = this.buyIn;
      newGame.date = new Date(this.date);

      this.gamesService.createNewGame(newGame)
        .then(newGame => {
          this.dialogRef.close(true);
        },
        err => {
          alert("Sorry, could not create a new game. Game on this date and buy in may already exist!");
        })
    }
  }
}
