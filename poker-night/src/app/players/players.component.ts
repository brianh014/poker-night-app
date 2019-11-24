import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player, PlayerWithStats } from '../models/player.model';
import { MatDialog } from '@angular/material/dialog';
import { NewPlayerDialog } from './new-player-dialog/new-player-dialog.component';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less']
})
export class PlayersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  user: User;
  displayedColumns: string[] = ['name', 'gamesPlayed', 'boughtIn', 'cashedOut', 'profit'];
  players: PlayerWithStats[] = [];

  panelOpenState = false;
  loading = false;
  loaded = false;

  constructor(private playerService: PlayerService,
              private accountService: AccountService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.accountService.currentUser.subscribe(user => this.user = user);
  }

  ngAfterViewInit() {
    this.getAllPlayers();
    this.sort.sortChange.subscribe(() => {
      this.getAllPlayers();
    });
  }

  getAllPlayers() {
    this.loaded = false;
    setTimeout(t => this.loading = !this.loaded, 500);

    this.playerService.getAllWithStats(this.sort.active, this.sort.direction)
      .then(players => {
        this.players = players;
        this.loaded = true;
        this.loading = false;
      },
      err => {
        this.loaded = true;
        this.loading = false;
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
