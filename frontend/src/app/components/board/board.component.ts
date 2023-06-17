import { Component, OnInit, Input} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Card } from 'src/app/interfaces/card.interface';
import { Side } from 'src/app/enums/side.enum';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];
  gameId: string = '';
  hint: string = '';
  team: number = 1;
  gameIsFinished: boolean = false;
  winnerSide: number = 0;
  winScreenIsShown: boolean = false; 

  @Input() playerType: number = 0;

  statusSubscription: Subscription | undefined;
  statusInterval = 1000;

  constructor(private dataService: DataService) {}

  getGameStatus(): void {
    let gameCode = this.dataService.getSatus().then(
      (data) => {
        // Handle the successful output here
        this.cards = data.game.board;
        this.hint = (data.game.move.count === 0) ? '0' :
                      `${data.game.move.hint} ${data.game.move.count-1} +1`;
        this.team = data.game.move.side;
        this.gameIsFinished = data.game.isFinished;
        if(this.gameIsFinished) {
          this.winnerSide = (data.game.redLeft === 0 ) ? Side.red : 
                            ((data.game.blueLeft === 0 ) ? Side.blue : 
                            data.game.log[data.game.log.length - 1].sideWinner);
        }
        console.log('Game status in component:', data);
      },
      (error) => {
        // Handle any errors here
        console.error('Error creating game:', error);
      }
    );
    
  }
  
  ngOnInit(): void {
    this.getGameStatus();
    this.statusSubscription = interval(this.statusInterval).subscribe(() => {
      this.getGameStatus();
    });
  }

  ngOnDestroy(): void {
    if(this.playerType == 0){
      this.stopStatusUpdates();
    }
  }
  
  stopStatusUpdates(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  playCardContent(text: string, lang: string = 'ja-JP') {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; 

    synth.speak(utterance);
  }

  getBackgroundColor(side: number | undefined): string {
    if (side === undefined) {
      return 'defaultColor';
    }
    const backgroundColors = ['defaultColor', 'red', 'blue', 'black', 'burlywood'];
    return backgroundColors[side] || 'defaultColor';
  }

  getColorTeam():string{
    if(this.team == 1){
      return 'red';
    }else if(this.team == 2){
      return 'blue';
    }
    return 'defaultColor';
  }

  uncoverCard(index: number): string {
    let gameCode = this.dataService.uncoverCard(index).then(
      (data) => {
        console.log('Uncover status:', data);
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

  closeWinScreen() {
    this.gameIsFinished = false;
    this.winScreenIsShown = true;
  }
}

