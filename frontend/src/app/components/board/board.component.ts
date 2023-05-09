import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Card } from 'src/app/interfaces/card.interface';
import { Side } from 'src/app/enums/side.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];
  gameId: string = '';
  name = '';
  side = Side.unknown;
  uncovered = false;
  uncoveringInProgress: number | boolean = false;
  fontSize = 0;

  constructor(private dataService: DataService) {}

  getGameStatus(): string {
    // this.dataService.commitCode();
    let gameCode = this.dataService.getSatus().then(
      (data) => {
        // Handle the successful output here
        this.cards = data.game.board;
        console.log('Game status:', this.cards);
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
  
  ngOnInit(): void {
    //this.getGameStatus();
  }

  playCardContent(text: string, lang: string = 'ja-JP') {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; 

    synth.speak(utterance);
  }

}

