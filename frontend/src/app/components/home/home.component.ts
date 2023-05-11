import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSettingComponent } from '../modal-setting/modal-setting.component';
import { ModalJoinComponent } from '../modal-join/modal-join.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openModalCreateNewGame(): void {
    this.dialog.open(ModalSettingComponent);
  }

  openModalJoinGame(): void {
    this.dialog.open(ModalJoinComponent);
  }
}
