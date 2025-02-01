import { BoardsData, PageData, TaskData, TaskList } from "kanban-board-types";
import { v4 as uuidv4 } from 'uuid';

const firstId = uuidv4();
const secondId = uuidv4();

export const BacklogListData: TaskList = {
    title: "Backlog",
    tasks: []
}

export const BlockedListData: TaskList = {
    title: "Blocked",
    tasks: []
}

export const InProgressListData: TaskList = {
    title: "In Progress",
    tasks: []
}

export const TestingListData: TaskList = {
    title: "Testing",
    tasks: []
}

export const CompletedListData: TaskList = {
    title: "Completed",
    tasks: []
}

const InitialBoardsData = new Map([
    [
        firstId, {
            title: "Board 1",
            backlogList: BacklogListData,
            blockedList: BlockedListData,
            inProgressList: InProgressListData,
            testingList: TestingListData,
            completedList: CompletedListData
        },
    ]
])

export class kanbanBoardPageDataImpl implements PageData {
    boards: Map<any, BoardsData>;
    selectedBoard: string;
    draggedTask: TaskData;

    constructor() {
        this.boards = InitialBoardsData;
        this.selectedBoard = firstId;
        this.draggedTask = new kanbanBoardTaskDataImpl();
    }
}

export class kanbanBoardTaskDataImpl implements TaskData {
    id: string;
    description: string;
    heading: string;

    constructor() {
        this.id = uuidv4();
        this.heading = "";
        this.description = "";
    }
}
export class PageDataStateFactory {
    public static buildtaskData(): TaskData{
        return new kanbanBoardTaskDataImpl();
    }
    public static buildPageData(): PageData{
        return new kanbanBoardPageDataImpl();
    }

}