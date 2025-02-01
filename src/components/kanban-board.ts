import { BoardsData } from 'kanban-board-types';
import { LitElement, html, css, property, customElement } from 'lit-element';
import {connect} from 'pwa-helpers';
import { store } from '../store';
import defaulCss from '../styles';

import './kanban-tasks-group'

@customElement('kanban-board')
export class kanbanBoard extends connect(store)(LitElement) {
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
    <div class="lists">
        <kanban-tasks-group taskType="backlogList"></kanban-tasks-group>
        <kanban-tasks-group taskType="blockedList"></kanban-tasks-group>
        <kanban-tasks-group taskType="inProgressList"></kanban-tasks-group>
        <kanban-tasks-group taskType="testingList"></kanban-tasks-group>
        <kanban-tasks-group taskType="completedList"></kanban-tasks-group>
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