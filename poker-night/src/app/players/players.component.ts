import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player, PlayerWithStats } from '../models/player.model';
import { MatDialog } from '@angular/material/dialog';
import { NewPlayerDialog } from './new-player-dialog/new-player-dialog.component';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less']
})
export class PlayersComponent implements OnInit {
  user: User;
  displayedColumns: string[] = ['name', 'gamesPlayed', 'boughtIn', 'cashedOut', 'profit'];
  players: PlayerWithStats[] = [];

  panelOpenState = false;

  constructor(private playerService: PlayerService,
              private accountService: AccountService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.accountService.currentUser.subscribe(user => this.user = user);

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
