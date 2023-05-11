import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css']
})
export class HintComponent {
  inputValue: string = '';

  constructor(private dataService: DataService){}

  commitHint(): string {
    // Perform any action you want with the input value
    console.log('Input value:', this.inputValue);
    let gameCode = this.dataService.commitCode(this.inputValue).then(
      (data) => {
        console.log('Game status:', data);
        this.inputValue = '';
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
