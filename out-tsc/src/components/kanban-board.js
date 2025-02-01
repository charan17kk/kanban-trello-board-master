import { __decorate } from "tslib";
import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import defaulCss from '../styles';
import './kanban-tasks-group';
let kanbanBoard = class kanbanBoard extends connect(store)(LitElement) {
    static get styles() {
        return [
            defaulCss,
            css `
        
        `
        ];
    }
    render() {
        return html `
    <div class="lists">
        <kanban-tasks-group taskType="backlogList"></kanban-tasks-group>
        <kanban-tasks-group taskType="blockedList"></kanban-tasks-group>
        <kanban-tasks-group taskType="inProgressList"></kanban-tasks-group>
        <kanban-tasks-group taskType="testingList"></kanban-tasks-group>
        <kanban-tasks-group taskType="completedList"></kanban-tasks-group>
    </div>
    `;
    }
    stateChanged(state) {
        const { reducer } = state;
        const { boards, selectedBoard } = reducer;
        this.boardData = boards.get(selectedBoard);
    }
};
__decorate([
    property()
], kanbanBoard.prototype, "boardData", void 0);
kanbanBoard = __decorate([
    customElement('kanban-board')
], kanbanBoard);
export { kanbanBoard };
//# sourceMappingURL=kanban-board.js.map