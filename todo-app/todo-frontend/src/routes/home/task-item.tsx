import { MoreHorizontal, Trash2, Pencil, Check, Save } from 'lucide-react';
import { FC, Fragment, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useRevalidator } from 'react-router-dom';
import { Task, TaskStatus, api } from '~/api';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '~/components/feedback/Dropdown';
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '~/components/feedback/Sheet';
import { DateField } from '~/components/form/DateField';
import { Form } from '~/components/form/Form';
import { TextField } from '~/components/form/TextField';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { Button } from '~/components/ui/Button';
import { useModal } from '~/hooks/useModal';
import { cn } from '~/libs/cn.lib';
import { notify } from '~/libs/notify.lib';
import { time } from '~/libs/time.lib';

interface TaskItemProps {
    task: Task;
}

interface TaskItemForm {
    task_title: string;
    task_description: string;
    task_deadline: string;
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
    const { revalidate } = useRevalidator();

    const { close, open, visible } = useModal();

    const { register, formState: { errors }, handleSubmit, reset } = useForm<TaskItemForm>();

    function onSheetClose() {
        reset();
        close();
    }

    async function onMarkCheck(value: boolean) {
        await api.tasks.update(task.task_id, {
            task_status: value ? 'done' : 'open'
        });

        revalidate();
    }

    async function onSave(formData: TaskItemForm) {
        const { task_title, task_description } = formData;
        const tast_deadline = formData.task_deadline ? time(formData.task_deadline).format('DD-MM-YYYY') : undefined;

        await api.tasks.update(task.task_id, {
            task_title,
            task_description: task_description || undefined,
            task_deadline: tast_deadline,
        });

        close();
        revalidate();
        notify('Task updated successfully')
    }

    return (
        <Sheet onClose={onSheetClose} open={visible}>
            <li className='grid grid-cols-[minmax(100px,auto),1fr,minmax(150px,auto),auto] gap-5 items-center border border-gray-200 rounded-md py-2 px-3'>
                <span>
                    <input
                        onChange={(e) => onMarkCheck(e.target.checked)}
                        type="checkbox"
                        checked={task.task_status === 'done'}
                    />
                </span>
                <Heading
                    onClick={open}
                    level={6} as='h3'
                    className={cn('cursor-pointer', {
                        'line-through': task.task_status === 'done'
                    })}
                >
                    {task.task_title}
                </Heading>
                <Text className={task.task_status === 'done' ? 'line-through' : ''}>
                    Due: {task.task_deadline ?? 'No deadline'}
                </Text>
                <MoreTaskOptions
                    onEdit={() => open()}
                    onDelete={() => {
                        console.log('delete');
                    }}
                    onMark={onMarkCheck}
                    status={task.task_status}
                />
            </li>
            <SheetContent onClose={onSheetClose}>
                <SheetHeader>
                    <SheetTitle>
                        Edit Task #{task.task_id}
                    </SheetTitle>
                </SheetHeader>
                <SheetBody>
                    <SheetDescription className='mb-5'>
                        You can view and edit the task here. If you want to delete the task, click the delete button below.
                    </SheetDescription>
                    <Form
                        className='flex flex-col gap-y-3'
                        onSubmit={handleSubmit(onSave)}
                    >
                        <TextField
                            label='Task title'
                            labelProps={{
                                required: true,
                            }}
                            defaultValue={task.task_title}
                            error={errors.task_title?.message}
                            {...register('task_title',
                                {
                                    required: {
                                        value: true,
                                        message: 'Task title is required'
                                    },
                                    minLength: {
                                        value: 5,
                                        message: 'Task title must be at least 5 characters long'
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Task title must be at most 255 characters long'
                                    },
                                    validate: (value) => value.trim().length > 0 || 'Task title cannot be empty'
                                }
                            )}
                        />
                        <TextField
                            label='Task description'
                            error={errors.task_description?.message}
                            defaultValue={task.task_description ?? ''}
                            {...register('task_description')}
                        />
                        <DateField
                            label='Task deadline'
                            defaultValue={task.task_deadline ? time(task.task_deadline, 'DD-MM-YYYY').format('YYYY-MM-DD') : undefined}
                            error={errors.task_deadline?.message}
                            {...register('task_deadline', {
                                value: task.task_deadline ? time(task.task_deadline, 'DD-MM-YYYY').format('YYYY-MM-DD') : undefined,
                            })}
                        />
                        <SheetFooter className='flex justify-between'>
                            <Button startIcon={Save} type='submit'>
                                Update task
                            </Button>
                            <div className='flex gap-x-3'>
                                <Button color='danger' startIcon={Trash2}>
                                    Delete task
                                </Button>
                                <Button variant='outlined'>
                                    Cancel
                                </Button>
                            </div>
                        </SheetFooter>
                    </Form>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
}

interface MoreTaskOptionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onMark: (value: boolean) => void;
    status: TaskStatus;
}

const MoreTaskOptions: FC<MoreTaskOptionsProps> = ({ onDelete, onEdit, onMark, status }) => {
    function handleAction(action: () => void, e: MouseEvent<HTMLElement>) {
        e.stopPropagation();

        action();
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <MoreHorizontal />
            </DropdownTrigger>
            <DropdownContent>
                <DropdownItem onClick={handleAction.bind(null, () => { onMark(status === 'done' ? false : true) })}>
                    {
                        status === 'done' ?
                            <Fragment>
                                <Check className='w-4 h-4 mr-1' />
                                Mark as undone
                            </Fragment>
                            :
                            <Fragment>
                                <Check className='w-4 h-4 mr-1' />
                                Mark as done
                            </Fragment>
                    }
                </DropdownItem>
                <DropdownItem onClick={handleAction.bind(null, onEdit)}>
                    <Pencil className='w-4 h-4 mr-1' />
                    Edit
                </DropdownItem>
                <DropdownItem onClick={handleAction.bind(null, onDelete)} className='hover:!bg-red-600 hover:!text-white text-red-600'>
                    <Trash2 className='w-4 h-4 mr-1' />
                    Delete
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    )
}