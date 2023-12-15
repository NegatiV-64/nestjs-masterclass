import { Command, LogOut, User } from "lucide-react";
import { Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger } from "~/components/feedback/Dropdown";
import { Text } from "~/components/typography/Text";
import { Container } from "~/components/ui/Container";
import { NestJSIcon, ReactJSIcon } from "~/components/ui/Icons";
import { useAuth } from "~/providers/auth.provider";
import { notify } from "~/libs/notify.lib";

export const RootLayout = () => {
    return (
        <Fragment>
            <header className="sticky top-0 z-10 border-b bg-white py-4">
                <Container className="flex items-center justify-between">
                    <Link to={'/'} className="flex flex-row items-center gap-x-2">
                        <Command className="h-7 w-7" />
                        <span className="hidden font-bold sm:inline-block">
                            Todo App
                        </span>
                    </Link>
                    <Profile />
                </Container>
            </header>
            <Outlet />
            <footer className="mt-auto py-6 border-t border-t-gray-200">
                <Container>
                    <Text className="text-center">
                        &copy; {new Date().getFullYear()} Developed for {' '} <NestJSIcon /> {' '} Masterclass with {' '} <ReactJSIcon className="animate-react-logo" />
                    </Text>
                </Container>
            </footer>
        </Fragment>
    );
}

const Profile = () => {
    const { user, onLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <Dropdown>
            <DropdownTrigger>
                <User />
            </DropdownTrigger>
            <DropdownContent>
                <DropdownLabel>
                    Hello, {user?.user_name}
                </DropdownLabel>
                <DropdownSeparator />
                <DropdownItem
                    onClick={onLogout.bind(null, () => {
                        navigate('/login');
                        notify('Goodbye, have a nice day!')
                    })}
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    );
}