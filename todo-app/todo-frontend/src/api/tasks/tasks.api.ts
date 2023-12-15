import { http } from "~/libs/http.lib";
import { ApiResponse } from "../types/types.api";
import { createApiUrl, generateApiError, generateApiSuccess } from "../utils/api.util";
import { AddTaskDto, ListTasksFilter, ListTasksResponse, TaskResponse, UpdateTaskDto } from "./tasks.types";

export const tasksApi = {
    create: async (dto: AddTaskDto): Promise<ApiResponse<TaskResponse>> => {
        try {
            const response = await http.post(createApiUrl('/tasks'), dto);
            return generateApiSuccess(response);
        } catch (error) {
            return generateApiError(error);
        }
    },
    list: async (filter?: ListTasksFilter): Promise<ApiResponse<ListTasksResponse>> => {
        const { search, status } = filter || {};

        try {
            const response = await http.get(createApiUrl('/tasks', { search, status }));
            return generateApiSuccess(response);
        } catch (error) {
            return generateApiError(error);
        }
    },
    update: async (taskId: string, data: UpdateTaskDto): Promise<ApiResponse<TaskResponse>> => {
        try {
            const response = await http.patch(createApiUrl(`/tasks/${taskId}`), data);
            return generateApiSuccess(response);
        } catch (error) {
            return generateApiError(error);
        }
    },
    delete: async (taskId: string): Promise<ApiResponse<TaskResponse>> => {
        try {
            const response = await http.delete(createApiUrl(`/tasks/${taskId}`));
            return generateApiSuccess(response);
        } catch (error) {
            return generateApiError(error);
        }
    }
}