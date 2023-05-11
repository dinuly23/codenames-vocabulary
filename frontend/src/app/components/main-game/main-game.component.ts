import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent implements OnInit{
  gameId: string = '';
  playerType: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params['gameId'];
      this.playerType = params['playerType'];
      
      console.log(this.gameId, this.playerType);
      // Perform necessary actions with gameId and playerType
    })
  }  ;
}
