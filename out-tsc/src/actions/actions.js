import { actionTypes as at } from './constants';
export function changeBoard(boardId) {
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
export function addBoardTask(boardId, taskType, taskData) {
    return {
        type: at.ADD_TASK,
        boardId,
        taskType,
        taskData
    };
}
export function storeDraggedTask(boardId, taskType, taskData) {
    return {
        type: at.ADD_DRAGGED_TASK,
        boardId,
        taskType,
        taskData
    };
}
export function dropDraggedTask(boardId, taskType) {
    return {
        type: at.DROP_DRAGGED_TASK,
        boardId,
        taskType,
    };
}
//# sourceMappingURL=actions.js.map