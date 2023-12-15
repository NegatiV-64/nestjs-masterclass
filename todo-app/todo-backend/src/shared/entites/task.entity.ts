export class Task {
  task_id: string;
  task_title: string;
  task_description: string | null;
  task_status: string;
  task_deadline: string | null;
  task_deleted: 1 | 0;
  task_created_at: string;
  task_user_id: number;
}
