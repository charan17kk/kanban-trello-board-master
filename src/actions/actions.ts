import { TaskData } from 'kanban-board-types';
import { actionTypes as at } from './constants';


export function changeBoard(boardId: string) {
  return {
    type: at.CHANGE_BOARD,
    boardId
  };
}

export function createBoard() {
  return {
    type: at.CREATE_BOARD
  };
}

export function addBoardTask(boardId: string, taskType: string, taskData: TaskData) {
  return {
    type: at.ADD_TASK,
    boardId,
    taskType,
    taskData
  };
}

export function storeDraggedTask(boardId: string, taskType: string, taskData: TaskData) {
  return {
    type: at.ADD_DRAGGED_TASK,
    boardId,
    taskType,
    taskData
  };
}

export function dropDraggedTask(boardId: string, taskType: string) {
  return {
    type: at.DROP_DRAGGED_TASK,
    boardId,
    taskType,
  };
}