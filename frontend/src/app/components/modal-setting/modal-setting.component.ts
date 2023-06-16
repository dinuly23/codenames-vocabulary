import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-setting',
  templateUrl: './modal-setting.component.html',
  styleUrls: ['./modal-setting.component.css']
})
export class ModalSettingComponent{
  gameRole: number = 0;
  gameDictionary: number = 0;
  
  selectorRole = {Master: 1, Player: 0};
  selectorDictionary = {'MARUGOTO A2-1':0, 'JLPT N5': 1, 'JLPT N4': 2, 'JLPT N3': 3};

  constructor(private dataService: DataService,
              private dialogRef: MatDialogRef<ModalSettingComponent>,
              private router: Router) {}

  createGame(): void {
    this.dataService.setRole(this.gameRole);
    this.dataService.setDictionary(this.gameDictionary);
    let gameCode = this.dataService.createGame().then(
      (data) => {
        console.log('Game created:', data);
        this.router.navigate([`game/${data.gameId}/player/${this.gameRole}`]);
        this.dialogRef.close();
        return data;
      },
      (error) => {
        // Handle any errors here
        console.error('Error creating game:', error);
        return error;
      }
    );
    return;
  }
}
