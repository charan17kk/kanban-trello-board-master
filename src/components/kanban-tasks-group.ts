import { BoardsData, TaskData, TaskList } from 'kanban-board-types';
import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { PageDataStateFactory } from '../models';
import { store } from '../store';
import defaulCss from '../styles';
import { addBoardTask, dropDraggedTask, storeDraggedTask } from '../actions/actions';


@customElement('kanban-tasks-group')
export class Header extends connect(store)(LitElement) {
  @property()
  taskData!: TaskList;
  @property()
  addTaskStatus!: Boolean;
  @property()
  newTaskData!: TaskData;
  @property()
  selectedBoard!: string;
  @property()
  taskType!: string;
  @property()
  boards!: Map<any, BoardsData>;

  static get styles() {
    return [
      defaulCss,
      css`
      .list {
        width: 300px;
        height: calc(100vh- 10px - 17px);
      }
      .list > * {
        background-color: #e2e4e6;
        color: #333;
        padding: 0 10px;
      }
      .list .task-header {
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .list .add-task-btn {
        line-height: 36px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #888;
        display: block;
        background-color: #fff;
        box-shadow: rgb(0 0 0 / 10%) 0px 1px 1px;
        width: 92%;
        border: none;
        margin: 0 auto;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .list .tasksList {
        list-style: none;
        margin: 0;
        max-height: calc(100vh - 136px - 36px);
        overflow-y: auto;
      }
      .list .tasksList .task {
        color: #333;
        background-color: #fff;
        padding: 10px;
        border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        cursor: move;
      }
      .list .tasksList .task .title{
        font-weight: 600;
        line-height: 36px;
        border-bottom: 1px solid #ccc;
      }
      .list .tasksList .task input {
        width: 95%;
        border: 1px solid #ccc;
        font-size: 12px;
        line-height: 20px;
        height: 20px;
        border-radius: 5px;
        padding-left: 8px;
      }
      .list .tasksList .task .actions {
        text-align: right;
        padding-top: 8px;
      }
      .list .tasksList .task .actions button{
        border: 0;
        width: 60px;
        position: relative;
        height: 28px;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 3px;
      }
      .list .tasksList .task .actions button.add-task-submit{
        background-color: #2a9d8f;
        border: 1px solid #2a9d8f;
      }
      .list .tasksList .task .actions button.close-task-submit{
        background-color: #e76f51;
        border: 1px solid #e76f51;
      }
      .list .tasksList .task .actions button:hover{
        background-color: #fff;
      }
      .list .tasksList .task .actions button svg{
        width: 12px;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        fill: #fff;
      }
      .list .tasksList .task .actions button:hover svg{
        fill: #000;
      }
      .list .tasksList .task .description{
        margin-top: 8px
      }
        `];
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  onDragStart(event: any) {
    console.log(event)
    let draggedTask: TaskData = this.taskData.tasks.filter(item => item.id === event.target.id)[0];
    store.dispatch(storeDraggedTask(this.selectedBoard, this.taskType, draggedTask));
  }
  
  onDropStop(ev: any) {
    console.log(ev)
    store.dispatch(dropDraggedTask(this.selectedBoard, this.taskType));
  }

  addTaskStatusChange(e: any) {
    this.addTaskStatus = true;
    this.newTaskData = PageDataStateFactory.buildtaskData();
  }

  closeAddTaskData(e: any) {
    this.addTaskStatus = false;
    this.newTaskData = PageDataStateFactory.buildtaskData();
  }

  onChangeTaskData(e: any, type: string) {
    e.preventDefault();
    //@ts-ignore
    this.newTaskData[type] = e.target.value;
  }

  addTask(e: any) {
    e.preventDefault();
    if(this.newTaskData.heading && this.newTaskData.description) {
      store.dispatch(addBoardTask(this.selectedBoard, this.taskType, this.newTaskData));
      this.addTaskStatus = false;
      this.newTaskData = PageDataStateFactory.buildtaskData();
    }
  }

  render() {
    return html`
        <div class="list" @drop=${this.onDropStop} @dragover=${this.allowDrop}>
          <div class="task-header">${this.taskData.title}</div>
            <div class="tasksList">
              ${this.addTaskStatus
                    ? html`
                      <div class="task" draggable="false">
                        <div class="title">
                          <input type="text" .value="${this.newTaskData.heading}" @change=${(e: any) => this.onChangeTaskData(e, 'heading')} placeholder="Enter Title" />
                        </div>
                        <div class="description">
                        <input type="text" .value="${this.newTaskData.description}" @change=${(e: any) => this.onChangeTaskData(e, 'description')} placeholder="Enter Description" /></div>
                        <div class="actions">
                          <button @click=${this.closeAddTaskData} class="close-task-submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                            </svg>
                          </button>
                          <button @click=${this.addTask}" class="add-task-submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      `
                    : null}
              ${this.taskData.tasks && this.taskData.tasks.map((task, i) => {
                return html`
                        <div key=${i} id="${task.id}" class="task" draggable=${true} @dragstart=${this.onDragStart}>
                          <div class="title">${task.heading}</div>
                          <div class="description">${task.description}</div>
                        </div>
                      `
                })}
            </div>
            ${this.addTaskStatus ? null : html`
              <button @click=${this.addTaskStatusChange} class="add-task-btn">Add a card...</button>
            `}
        </div>
      `;
  }
  updated(changedProperties: any) {
    if(changedProperties.has('selectedBoard')){
      this.performUpdate();
    }
  }
  stateChanged(state: any) {
    const { reducer } = state;
    const {
      selectedBoard,
      boards
    } = reducer;
    this.selectedBoard = selectedBoard;
    this.boards = boards;
    this.taskData = boards.get(this.selectedBoard)[this.taskType];
  }
}