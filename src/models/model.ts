declare module "kanban-board-types" {
    export interface TaskData {
        id: string;
        heading: string;
        description: string;
    }
    export interface TaskList {
        title: string;
        tasks: TaskData[];
    }

    export interface BoardsData {
        title?: string;
        backlogList?: TaskList;
        blockedList?: TaskList;
        inProgressList?: TaskList;
        testingList?: TaskList;
        completedList?: TaskList;
    }

    export interface PageData {
        boards: Map<any, BoardsData>;
        selectedBoard: string;
        draggedTask: TaskData;
    }
}