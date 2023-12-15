import { authApi } from "./auth/auth.api";
import { tasksApi } from "./tasks/tasks.api";

export const api = {
    auth: authApi,
    tasks: tasksApi,
}