import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  playerCriterion = [
    {value: 'profit', display: 'By Total Profit', header: 'Total Profit'},
    {value: 'avgProfit', display: 'By Average Profit', header: 'Average Profit'},
    {value: 'boughtIn', display: 'By Total Bought In', header: 'Total Bought In'},
  ]
  topPlayersSelectedCriteria = this.playerCriterion[0];
  topPlayers: Player[] = [];

  loading = false;
  loaded = false;
  firstLoaded = false;

  constructor(private playersService: PlayerService) { }

  ngOnInit() {
    this.getTopPlayersByCriteria('profit');
  }

  getTopPlayersByCriteria(criteria: string) {
    this.loaded = false;
    setTimeout(t => this.loading = !this.loaded, 500);

    this.playersService.getAllWithStats(criteria, 'desc', '9')
      .then(topPlayers => {
        this.loaded = true;
        this.loading = false;
        this.firstLoaded = true;
        this.topPlayers = topPlayers;
      },
      err => {
        this.loaded = true;
        this.loading = false;
        this.firstLoaded = true;
        alert('Could not get top players');
      });
  }

  changeTopPlayerCriteria(criteria) {
    this.topPlayersSelectedCriteria = criteria.value
    this.getTopPlayersByCriteria(criteria.value.value);
  }

  getTrophySrc(place: number) {
    switch (place) {
      case 1:
        return '/assets/images/trophy_gold.png';
      case 2:
        return '/assets/images/trophy_silver.png';
      case 3:
        return '/assets/images/trophy_bronze.png';
      default:
        return;
    }
  }

}
