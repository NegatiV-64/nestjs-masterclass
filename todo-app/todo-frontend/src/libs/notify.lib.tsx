import { Fragment, type ReactNode } from 'react';
import { toast } from 'sonner';
import { ToastAction, Toast, ToastDescription, ToastTitle } from '~/components/feedback/Toast';

type ToastMessage = ReactNode | {
    title?: ReactNode;
    message: ReactNode;
    action?: {
        label: ReactNode;
        onClick?: () => void;
    } | {
        label: ReactNode;
        onClick?: () => void;
    }[];
};
type ToastType = 'success' | 'error' | 'info' | 'loading' | 'warning';
type ToastOptions = {
    type?: ToastType;
    duration?: number;
    hasCloseButton?: boolean;
};

export const notify = (message: ToastMessage, options?: ToastOptions) => {
    const { type = 'info', duration = 5000, hasCloseButton = true } = options ?? {};

    // ==== Checking type of message ==== //
    const isStringMessage = typeof message === 'string';
    const isObjectMessage = message !== null && typeof message === 'object' && 'message' in message;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isReactNodeMessage = !isStringMessage && !isObjectMessage;

    toast.custom((id) => {
        const closeButton = hasCloseButton
            ?
            <ToastAction onClick={() => toast.dismiss(id)}>
                Close
            </ToastAction>
            : null;

        return (
            <Toast
                type={type}
                style={{
                    width: 'var(--width)',
                }}
            >
                {
                    isStringMessage
                        ?
                        <Fragment>
                            <ToastDescription>
                                {message}
                            </ToastDescription>
                            {closeButton}
                        </Fragment>
                        :
                        null
                }
                {
                    isObjectMessage
                        ?
                        <Fragment>
                            <div className='grid gap-1'>
                                {
                                    message.title
                                        ?
                                        <ToastTitle>
                                            {message.title}
                                        </ToastTitle>
                                        :
                                        null
                                }
                                {
                                    message.message
                                        ?
                                        <ToastDescription>
                                            {message.message}
                                        </ToastDescription>
                                        :
                                        null
                                }
                            </div>
                            {
                                ('action' in message || hasCloseButton)
                                    ?
                                    <div className='flex flex-row gap-x-1'>
                                        {
                                            'action' in message
                                                ?
                                                Array.isArray(message.action)
                                                    ?
                                                    message.action.map((action, index) => (
                                                        <ToastAction key={index} onClick={action.onClick}>
                                                            {action.label}
                                                        </ToastAction>
                                                    ))
                                                    :
                                                    <ToastAction onClick={message.action?.onClick}>
                                                        {message.action?.label}
                                                    </ToastAction>
                                                : null
                                        }
                                        {closeButton}
                                    </div>
                                    :
                                    null
                            }
                        </Fragment>
                        :
                        null
                }
                {
                    isReactNodeMessage
                        ?
                        <Fragment>
                            {message}
                            {closeButton}
                        </Fragment>
                        :
                        null
                }
            </Toast>
        );
    }, {
        duration: duration,
    });
};