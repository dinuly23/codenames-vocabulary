import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Agent } from '../../../../../server/src/api/agent';
import { AgentSide } from '../../../../../server/src/api/agent_side';
import { Game } from '../../../../../server/src/api/game';
import { GameStatusResponse } from '../../../../../server/src/api/game_status_response';
import { PlayerType } from '../../../../../server/src/api/player_type';
import { UncoverAgentResponse } from '../../../../../server/src/api/uncover_agent_response';
import { AppRoutingNavigation } from '../../app.routing.navigation';
import { copyToClipboard } from '../../utils/copy_to_clipboard';
import { switchHandler } from '../../utils/switch_handler';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {
    constructor(
        private httpClient: HttpClient,
        private navigation: AppRoutingNavigation,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private snackBar: MatSnackBar) { }

    error = '';
    playerType = PlayerType.REGULAR;
    gameId = '';
    game: Game;

    polingTimer = 0;
    updateInProgress = false;
    uncoveringInProgress = new Set<number>();

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(value => {
            this.gameId = value.get('gameId');
            this.playerType = Number(value.get('playerType'));
            this.updateGameStatus();
            this.polingTimer = setInterval(() => this.updateGameStatus(), 2000);
        });
    }

    ngOnDestroy(): void {
        clearInterval(this.polingTimer);
    }

    agentId(index: number, agent: Agent) {
        return `${index}-${agent.name}`;
    }

    updateGameStatus() {
        if (this.updateInProgress)
            return;

        this.updateInProgress = true;
        this.cd.markForCheck();

        this.httpClient
            .get<GameStatusResponse>(`/api/games/${this.gameId}/status?player=${this.playerType}`)
            .subscribe(
                value => {
                    this.game = value.game;
                    this.gameId = this.game.id; // in case of games chain may differ
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        switchHandler(error.status, {
                            404: () => this.error = 'Игра не найдена, проверьте ссылку или создайте новую',
                            else: () => this.error = 'Что-то пошло не так...'
                        });
                        this.cd.markForCheck();
                    }
                },
                () => {
                    this.updateInProgress = false;
                    this.cd.markForCheck();
                }
            );
    }

    uncoverAgent(index: number) {
        if (this.game.board[index].side !== AgentSide.UNKNOWN)
            return;

        this.uncoveringInProgress.add(index);
        this.cd.markForCheck();

        this.httpClient
            .get<UncoverAgentResponse>(`/api/games/${this.gameId}/agents/${index}/uncover`)
            .subscribe(
                value => this.game.board[index] = { ...value.agent, uncovered: false },
                error => this.snackBar.open('Что-то пошло не так... :(', 'Блять!', { duration: 5000 }),
                () => {
                    this.uncoveringInProgress.delete(index);
                    this.cd.markForCheck();
                }
            );
    }

    onCopyGameLinkClick() {
        copyToClipboard(this.navigation.getJoinLink(this.gameId));
        this.snackBar.open('Ссылка скопирована в буфер обмена.', 'Огонь!', {
            horizontalPosition: 'center',
            duration: 3000
        });
    }

    async onCodenamesClick() {
        await this.navigation.toStart();
    }
}
