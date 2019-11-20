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
    {value: 'profit', display: 'By Total Profit'},
    {value: 'avgProfit', display: 'By Average Profit'},
    {value: 'boughtIn', display: 'By Total Bought In'},
  ]
  topPlayersSelectedCriteria = this.playerCriterion[0];
  topPlayers: Player[] = [];

  constructor(private playersService: PlayerService) { }

  ngOnInit() {
    this.getTopPlayersByCriteria('profit');
  }

  getTopPlayersByCriteria(criteria: string) {
    this.playersService.getAllWithStats(criteria, 'desc', '9')
      .then(topPlayers => this.topPlayers = topPlayers);
  }

  changeTopPlayerCriteria(criteria) {
    this.topPlayersSelectedCriteria = criteria
    this.getTopPlayersByCriteria(criteria.value);
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
