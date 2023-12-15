import { Command } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';
import { api } from '~/api';
import { TextField } from '~/components/form/TextField';
import { Heading } from '~/components/typography/Heading';
import { Text } from '~/components/typography/Text';
import { Button } from '~/components/ui/Button';
import { Container } from '~/components/ui/Container';
import { Page } from '~/components/util/Page';
import { useAuth } from '~/providers/auth.provider';
import { notify } from '~/libs/notify.lib';

interface RegisterForm {
    username: string;
    password: string;
    password_confirmation: string;
}

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { onLogin } = useAuth();

    const { register, handleSubmit, clearErrors, watch, setError, setFocus, formState: { errors } } = useForm<RegisterForm>();
    const passwordValue = watch('password');

    async function onRegister(formData: RegisterForm) {
        const { password, username, password_confirmation } = formData;

        if (password !== password_confirmation) {
            setError('password_confirmation', {
                message: 'Passwords do not match',
            });
            setFocus('password_confirmation');
            return null;
        }

        clearErrors();

        const registerResponse = await api.auth.register({
            name: username,
            password,
        });

        if (!registerResponse.ok) {
            notify(`Register failed: ${registerResponse.error}`, {
                type: 'error'
            })
            return null;
        }

        const loginResponse = await api.auth.login({
            name: username,
            password,
        });

        if (!loginResponse.ok) {
            notify(`Login failed: ${loginResponse.error}`, {
                type: 'error'
            })
            return null;
        }

        const { auth_token } = loginResponse.data;
        onLogin(auth_token, (user) => {
            notify({
                title: 'Register successful',
                message: `Welcome, ${user.username}`,
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
                            Create an account
                        </Heading>
                        <Text variant="muted" className='text-center'>
                            Enter your credentials below to create an account
                        </Text>
                    </header>
                    <div>
                        <Form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onRegister)}>
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
                            <TextField
                                label="Password confirmation"
                                type="password"
                                labelProps={{
                                    required: true,
                                }}
                                {...register('password_confirmation', {
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
                                    },
                                    onBlur: (e) => {
                                        const value = e?.target?.value;

                                        if (value === passwordValue) {
                                            clearErrors('password_confirmation');
                                        }

                                        if (value && value !== passwordValue) {
                                            setError('password_confirmation', {
                                                message: 'Passwords do not match',
                                            });
                                        }
                                    }
                                })}
                                error={errors.password_confirmation?.message}
                            />
                            <Button type="submit" variant="contained" color="primary" className="w-full">
                                Register your account
                            </Button>
                        </Form>
                        <Link to={'/login'} className="block mx-auto w-fit mt-4">
                            <Button variant="link" className="" asChild={true}>
                                <span>
                                    Have an account? Login instead
                                </span>
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>
        </Page>
    );
}
