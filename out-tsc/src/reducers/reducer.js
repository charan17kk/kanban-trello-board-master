import { BacklogListData, BlockedListData, kanbanBoardTaskDataImpl, CompletedListData, InProgressListData, PageDataStateFactory, TestingListData } from '../models';
import { actionTypes as at } from '../actions/constants';
import { v4 as uuidv4 } from 'uuid';
const startState = PageDataStateFactory.buildPageData();
export function reducer(state = startState, action) {
    switch (action.type) {
        case at.CHANGE_BOARD: {
            const { boardId } = action;
            return {
                ...state,
                selectedBoard: boardId
            };
        }
        case at.CREATE_BOARD: {
            const len = state.boards.size + 1;
            const allBoards = state.boards.set(uuidv4(), {
                title: "Board " + len,
                backlogList: BacklogListData,
                blockedList: BlockedListData,
                inProgressList: InProgressListData,
                testingList: TestingListData,
                completedList: CompletedListData
            });
            return {
                ...state,
                boards: allBoards
            };
        }
        case at.ADD_TASK: {
            const { boardId, taskType, taskData } = action;
            const originalBoard = state.boards.get(boardId);
            if (!originalBoard) {
                return state;
            }
            const updatedBoard = {
                ...originalBoard,
                [taskType]: {
                    //@ts-ignore
                    ...originalBoard[taskType],
                    //@ts-ignore
                    tasks: originalBoard[taskType] ? [...originalBoard[taskType].tasks, taskData] : [taskData]
                }
            };
            const allBoards = new Map(state.boards).set(boardId, updatedBoard);
            return {
                ...state,
                boards: allBoards
            };
        }
        case at.ADD_DRAGGED_TASK: {
            const { taskData } = action;
            return {
                ...state,
                draggedTask: taskData
            };
        }
        case at.DROP_DRAGGED_TASK: {
            const { boardId, taskType } = action;
            const { draggedTask: taskData } = state;
            let updatedBoard = state.boards.get(boardId);
            const boardListTypes = ['backlogList', 'blockedList', 'completedList', 'inProgressList', 'testingList'];
            //@ts-ignore
            Object.keys(updatedBoard).map(key => {
                if (boardListTypes.includes(key)) {
                    updatedBoard = Object.assign({}, updatedBoard, {
                        [key]: {
                            //@ts-ignore
                            ...updatedBoard[key],
                            //@ts-ignore
                            tasks: updatedBoard[key].tasks.filter(item => item.id !== taskData.id)
                        }
                    });
                }
            });
            //@ts-ignore
            updatedBoard[taskType].tasks.push(taskData);
            //@ts-ignore
            const allBoards = state.boards.set(boardId, updatedBoard);
            return {
                ...state,
                boards: allBoards,
                draggedTask: new kanbanBoardTaskDataImpl()
            };
        }
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map