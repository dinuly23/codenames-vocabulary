import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent {
  constructor(private dataService: DataService) {}

  createGame(): string {
    let gameCode = this.dataService.createGame().then(
      (data) => {
        // Handle the successful output here
        console.log('Game created:', data);
        return data;
      },
      (error) => {
        // Handle any errors here
        console.error('Error creating game:', error);
        return error;
      }
    );
    
    return "";
  }
}
