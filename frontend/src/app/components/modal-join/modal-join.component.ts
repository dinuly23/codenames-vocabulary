import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-join',
  templateUrl: './modal-join.component.html',
  styleUrls: ['./modal-join.component.css']
})
export class ModalJoinComponent {
  codeGame: string ='';
  gameRole: number = 0;

  selectorRole = {Master: 1, Player: 0};

  constructor(private dataService: DataService,
    private dialogRef: MatDialogRef<ModalJoinComponent>,
    private router: Router) {}
  
  joinGame():void{
    this.dataService.setRole(this.gameRole);
    this.dataService.setGameId(this.codeGame);

    this.router.navigate([`game/${this.codeGame.replace(/\s+/g, '')}/player/${this.gameRole}`]);
    this.dialogRef.close();
  }
    
}
