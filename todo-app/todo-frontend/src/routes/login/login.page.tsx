import { Command } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { TextField } from "~/components/form/TextField"
import { Form } from "~/components/form/Form"
import { Heading } from "~/components/typography/Heading"
import { Text } from "~/components/typography/Text"
import { Button } from "~/components/ui/Button"
import { Container } from "~/components/ui/Container"
import { useForm } from "react-hook-form"
import { api } from "~/api"
import { notify } from "~/libs/notify.lib"
import { useAuth } from "~/providers/auth.provider"
import { Page } from "~/components/util/Page"

interface LoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const { onLogin } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm<LoginForm>();

    async function onSubmit(formData: LoginForm) {
        const { password, username } = formData;

        clearErrors();

        const response = await api.auth.login({
            name: username,
            password,
        });

        if (!response.ok) {
            notify(`Login failed: ${response.error}`, {
                type: 'error'
            })
            return null;
        }

        const { auth_token } = response.data;
        onLogin(auth_token, (user) => {
            notify({
                title: 'Login successful',
                message: `Welcome back, ${user.username}`,
            })
            navigate('/');
        });
    }

    return (
        <Page title="Login">
            <section className="grow flex justify-center items-center mb-16">
                <Container className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                    <header className="flex flex-col mb-4 items-center">
                        <Command className="mx-auto h-6 w-6 mb-1" />
                        <Heading as="h1" level={3} className="mb-2">
                            Welcome back!
                        </Heading>
                        <Text variant="muted">
                            Enter your credentials to login to your account
                        </Text>
                    </header>
                    <div>
                        <Form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Username"
                                type="text"
                                labelProps={{
                                    required: true,
                                }}
                                {...register('username', {
                                    minLength: {
                                        value: 4,
                                        message: 'Username must be at least 4 characters long',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Username must be at most 50 characters long',
                                    },
                                    required: {
                                        value: true,
                                        message: 'Username is required',
                                    }
                                })}
                                error={errors.username?.message}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                labelProps={{
                                    required: true,
                                }}
                                {...register('password', {
                                    minLength: {
                                        value: 5,
                                        message: 'Password must be at least 5 characters long',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Password must be at most 50 characters long',
                                    },
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    }
                                })}
                                error={errors.password?.message}
                            />
                            <Button type="submit" variant="contained" color="primary" className="w-full">
                                Login to your account
                            </Button>
                        </Form>
                        <Link to={'/register'} className="block mx-auto w-fit mt-4">
                            <Button variant="link" className="" asChild={true}>
                                <span>
                                    Don't have an account? Sign up
                                </span>
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </Page>
    )
}