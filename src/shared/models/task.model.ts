import { FilterValuesType } from "./filter.model";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
  }

  export type PropsType = {
    title: string;
    tasks: TasksType[];
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType

  }
