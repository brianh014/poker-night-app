import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player, PlayerWithStats } from '../models/player.model';
import { MatDialog } from '@angular/material/dialog';
import { NewPlayerDialog } from './new-player-dialog/new-player-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less']
})
export class PlayersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gamesPlayed', 'boughtIn', 'cashedOut', 'profit'];
  players: PlayerWithStats[] = [];

  panelOpenState = false;

  constructor(private playerService: PlayerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.playerService.getAllWithStats()
      .then(players => {
        this.players = players;
      },
      err => {
        alert("Sorry, was not able to get players at this time.");
      });
  }

  openNewPlayerDialog() {
    const dialogRef = this.dialog.open(NewPlayerDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.getAllPlayers();
      }
    });
  }

}
