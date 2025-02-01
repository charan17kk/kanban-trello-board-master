import { v4 as uuidv4 } from 'uuid';
const firstId = uuidv4();
const secondId = uuidv4();
export const BacklogListData = {
    title: "Backlog",
    tasks: []
};
export const BlockedListData = {
    title: "Blocked",
    tasks: []
};
export const InProgressListData = {
    title: "In Progress",
    tasks: []
};
export const TestingListData = {
    title: "Testing",
    tasks: []
};
export const CompletedListData = {
    title: "Completed",
    tasks: []
};
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
]);
export class kanbanBoardPageDataImpl {
    constructor() {
        this.boards = InitialBoardsData;
        this.selectedBoard = firstId;
        this.draggedTask = new kanbanBoardTaskDataImpl();
    }
}
export class kanbanBoardTaskDataImpl {
    constructor() {
        this.id = uuidv4();
        this.heading = "";
        this.description = "";
    }
}
export class PageDataStateFactory {
    static buildtaskData() {
        return new kanbanBoardTaskDataImpl();
    }
    static buildPageData() {
        return new kanbanBoardPageDataImpl();
    }
}
//# sourceMappingURL=index.js.map