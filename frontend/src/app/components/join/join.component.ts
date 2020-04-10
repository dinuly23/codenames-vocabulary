import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PlayerType } from '../../../../../server/src/api/player_type';
import { AppRoutingNavigation } from '../../app.routing.navigation';
import { copyToClipboard } from '../../utils/copy_to_clipboard';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
    constructor(
        private navigation: AppRoutingNavigation,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar) { }

    gameId = '';

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(value => {
            this.gameId = value.get('gameId');
        });
    }

    onCopyLinkClick(event: MouseEvent) {
        event.preventDefault();
        copyToClipboard(this.navigation.getJoinLink(this.gameId));
        this.snackBar.open('Ссылка скопирована в буфер обмена.', 'Огонь!', {
            horizontalPosition: 'center',
            duration: 3000
        });
    }

    async onJoinAsCaptainClick() {
        await this.navigation.toGameBoard(this.gameId, PlayerType.CAPTAIN);
    }

    async onJoinAsTeammateClick() {
        await this.navigation.toGameBoard(this.gameId, PlayerType.REGULAR);
    }

    async onBackClick() {
        await this.navigation.toStart();
    }
}
