import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    @Post()
    createTask(
        @CurrentUser('user_id') userId: number,
        @Body() dto: CreateTaskDto
    ) {
        return {
            userId,
            message: 'Create task',
        }
    }

    // Update specific task
    updateTask() {
        // TODO
    }

    // Delete specific task
    deleteTask() {
        // TODO
    }

    // Get specific task
    getTask() {
        // TODO
    }

    // Get all tasks of user
    getTasks() {
        // TODO
    }
}
