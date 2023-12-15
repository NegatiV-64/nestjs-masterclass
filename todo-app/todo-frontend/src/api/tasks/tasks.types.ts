export interface ListTasksFilter {
    search?: string;
    status?: TaskStatus;
}

export type TaskStatus = 'open' | 'done';

export interface Task {
    task_id: string;
    task_title: string;
    task_description: string | null;
    task_status: TaskStatus;
    task_deadline: string | null;
    task_deleted: boolean;
    task_created_at: string;
    task_updated_at: string;
    task_user_id: number;
}

export interface ListTasksResponse {
    tasks: Task[];
}

export interface TaskResponse {
    task: Task;
}

export type AddTaskDto = Pick<Task, 'task_title'> & Partial<Pick<Task, 'task_description' | 'task_deadline' | 'task_status'>>;

export type UpdateTaskDto = Partial<Pick<Task, 'task_deadline' | 'task_description' | 'task_status' | 'task_title'>>;