import { LitElement, html, css, property, customElement } from 'lit-element';
import {connect} from 'pwa-helpers';
import { store } from './store';
import defaulCss from './styles';
import { BoardsData } from 'kanban-board-types';

import './components/header';
import './components/kanban-board';

@customElement('main-app')
export class kanbanApp extends connect(store)(LitElement) {
  @property()
  selectedBoard!: string;
  @property()
  boardData!: BoardsData;
  
  static get styles() {
    return [
      defaulCss,
      css`
      
    `];
  }

  render() {
    return html`
      <div class="ui">
        <kanban-header></kanban-header>
        <kanban-board></kanban-board>
      </div>
    `;
  }
  stateChanged(state: any) {
    const { reducer } = state;
    const {
      boards,
      selectedBoard
    } = reducer;
    this.boardData = boards.get(selectedBoard);
  }
}