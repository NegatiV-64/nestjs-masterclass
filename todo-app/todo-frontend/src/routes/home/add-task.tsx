import { Plus, Save } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useRevalidator } from 'react-router-dom';
import { TaskStatus, api } from '~/api';
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '~/components/feedback/Sheet';
import { DateField } from '~/components/form/DateField';
import { Form } from '~/components/form/Form';
import { FormField } from '~/components/form/FormField';
import { Input } from '~/components/form/Input';
import { Label } from '~/components/form/Label';
import { TextField } from '~/components/form/TextField';
import { Button } from '~/components/ui/Button';
import { useModal } from '~/hooks/useModal';
import { notify } from '~/libs/notify.lib';
import { time } from '~/libs/time.lib';

interface AddTaskForm {
    task_title: string;
    task_description: string;
    task_status: TaskStatus;
    task_deadline: string;
}

export const AddTask: FC = () => {
    const { revalidate } = useRevalidator();

    const { register, clearErrors, handleSubmit, reset, formState: { errors } } = useForm<AddTaskForm>();

    const { close, open, visible } = useModal();

    function onSheetClose() {
        close();
        reset();
    }

    async function onSave(formData: AddTaskForm) {
        const { task_title, task_description, task_status } = formData;
        const tast_deadline = formData.task_deadline ? time(formData.task_deadline).format('DD-MM-YYYY') : undefined;

        clearErrors();

        const request = await api.tasks.create({
            task_title,
            task_description: task_description || undefined,
            task_status,
            task_deadline: tast_deadline,
        })

        if (request.ok === false) {
            notify(`Error while creating task: ${request.error}`, {
                type: 'error'
            });
            return null;
        }

        close();
        reset();
        notify('Task created successfully');
        revalidate();
    }

    return (
        <Sheet onClose={onSheetClose} open={visible}>
            <Button
                onClick={open}
                startIcon={Plus}
            >
                Add Task
            </Button>
            <SheetContent onClose={onSheetClose}>
                <SheetHeader>
                    <SheetTitle>
                        Add New Task
                    </SheetTitle>
                </SheetHeader>
                <SheetBody>
                    <SheetDescription className='mb-5'>
                        You can add new task here. All required fields are marked with an asterisk (*).
                    </SheetDescription>
                    <Form onSubmit={handleSubmit(onSave)} className='flex flex-col gap-y-3'>
                        <TextField
                            label='Task Title'
                            labelProps={{
                                required: true,
                            }}
                            placeholder='Type task title here...'
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
                            label='Task Description'
                            placeholder='Type task description here...'
                            error={errors.task_description?.message}
                            {...register('task_description')}
                        />
                        <DateField
                            label='Task Deadline'
                            error={errors.task_deadline?.message}
                            {...register('task_deadline')}
                        />
                        <FormField>
                            <Label>
                                Task Status
                            </Label>
                            <div className='flex items-center gap-x-4'>
                                <div className='flex items-center gap-x-2'>
                                    <Input defaultChecked={true} type='radio' className='h-5 w-5' value={'open'} {...register('task_status')} />
                                    <Label className='font-normal'>Open</Label>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <Input className='h-5 w-5' type='radio' value={'done'} {...register('task_status')} />
                                    <Label className='font-normal'>Done</Label>
                                </div>
                            </div>
                        </FormField>
                        <SheetFooter className='flex gap-x-5 items-center'>
                            <Button
                                type='submit'
                                startIcon={Save}
                            >
                                Save
                            </Button>
                            <Button variant='outlined'>
                                Cancel
                            </Button>
                        </SheetFooter>
                    </Form>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
}
