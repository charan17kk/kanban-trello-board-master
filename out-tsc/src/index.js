import { __decorate } from "tslib";
import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './store';
import defaulCss from './styles';
import './components/header';
import './components/kanban-board';
let kanbanApp = class kanbanApp extends connect(store)(LitElement) {
    static get styles() {
        return [
            defaulCss,
            css `
      
    `
        ];
    }
    render() {
        return html `
      <div class="ui">
        <kanban-header></kanban-header>
        <kanban-board></kanban-board>
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
], kanbanApp.prototype, "selectedBoard", void 0);
__decorate([
    property()
], kanbanApp.prototype, "boardData", void 0);
kanbanApp = __decorate([
    customElement('main-app')
], kanbanApp);
export { kanbanApp };
//# sourceMappingURL=index.js.map