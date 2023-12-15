import { ComponentPropsWithoutRef, Fragment, ReactNode, forwardRef } from 'react';
import { cn } from '~/libs/cn.lib';
import { FormFieldError } from './FormFieldError';

type InputRef = HTMLInputElement;
type InputProps = ComponentPropsWithoutRef<'input'> & {
    error?: ReactNode;
};

export const Input = forwardRef<InputRef, InputProps>(({
    className,  error, ...props
}, ref) => {
    return (
        <Fragment>
            <input
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm ring-offset-gray-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
                ref={ref}
            />
            <FormFieldError>
                {error}
            </FormFieldError>
        </Fragment>
    );
});


Input.displayName = "Input";