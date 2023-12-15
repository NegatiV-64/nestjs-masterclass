import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { IsValidTaskDeadline } from "../decorators/is-valid-task-deadline.decorator";
import { day } from "src/shared/libs/day.lib";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    task_title: string;

    @IsOptional()
    @IsString()
    task_description?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    task_status?: string;

    @IsOptional()
    @IsString()
    @IsValidTaskDeadline(day().subtract(1, 'day').format('DD-MM-YYYY'), {
        message: 'Deadline must be greater than today'
    })
    task_deadline?: string;
}