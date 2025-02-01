import { BoardsData } from 'kanban-board-types';
import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { changeBoard, createBoard } from '../actions/actions';
import { store } from '../store';
import defaulCss from '../styles'

@customElement('kanban-header')
export class Header extends connect(store)(LitElement) {
    @property()
    allBoards!: any[];
    @property()
    selectedBoard!: string;

    static get styles() {
        return [
            defaulCss,
            css`
        
        `];
    }
    changeBoard(e: any, id: string) {
        e.preventDefault();
        store.dispatch(changeBoard(id));
    }
    addNewBoard(e: any) {
        e.preventDefault();
        store.dispatch(createBoard());
    }
    render() {
        return html`
            <div class="header">
                <nav class="navbar app">Kanban Task Board</nav>
            </div>
            <div class="available-boards">
                <ul>
                    ${this.allBoards.map((item, i) => {
                        return html`
                            <li class="${this.selectedBoard === item.key ? 'selected' : ''}" @click=${(e:any)=>this.changeBoard(e, item['key'])} key=${i}>
                                ${item.title}
                            </li>
                            `
                    })}
                    <li class="add-board" @click=${this.addNewBoard}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                  </svg></li>
                </ul>
            </div>
        `;
    }
    stateChanged(state: any) {
        const { reducer } = state;
        const {
            boards,
            selectedBoard
        }: { boards: Map<any, BoardsData>, selectedBoard: string } = reducer;
        let boardNames: any = [];
        boards.forEach((item, key) => {
            boardNames.push({key, title: item.title})
        })
        this.allBoards = boardNames;
        this.selectedBoard = selectedBoard;
    }
}