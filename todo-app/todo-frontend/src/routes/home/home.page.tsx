import { Task, api } from "~/api";
import { Container } from "~/components/ui/Container";
import { Page } from "~/components/util/Page";
import { usePageData } from "~/hooks/usePageData";
import { TaskItem } from "./task-item";
import { Heading } from "~/components/typography/Heading";
import { AddTask } from "./add-task";

export const homePageLoader = async () => {
    const data = await api.tasks.list();

    if (data.ok === false) {
        throw new Error(`Failed to load tasks: ${data.error}`);
    }

    return data.data.tasks;
}

export const HomePage = () => {
    const data = usePageData<Task[]>();

    return (
        <Page title="Home">
            <section className="py-10">
                <Container>
                    <header className="w-3/6 mx-auto flex justify-between items-start mb-5">
                        <Heading level={2} as='h2'>
                            Your tasks
                        </Heading>
                        <AddTask />
                    </header>
                    <ul className="w-3/6 mx-auto flex flex-col gap-y-4">
                        {
                            data.map(task => (
                                <TaskItem key={task.task_id} task={task} />
                            ))
                        }
                    </ul>
                </Container>
            </section>
        </Page>
    );
}
