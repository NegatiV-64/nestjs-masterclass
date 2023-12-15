import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef, ElementRef} from 'react';
import { forwardRef } from 'react';
import { cn } from '~/libs/cn.lib';
import { Button } from '../ui/Button';

type ToastRef = HTMLDivElement;
type ToastProps = ComponentPropsWithoutRef<'div'> & {
    type?: 'success' | 'error' | 'info' | 'loading' | 'warning';
};
const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-5 pr-8 shadow-lg transition-all',
    {
        variants: {
            type: {
                success: 'border-green-600 bg-[#F5FBF8] !text-emerald-700',
                error: 'border-red-600 bg-red-50 !text-red-700',
                info: 'bg-white',
                loading: 'bg-white',
                warning: 'border-[#FFB020] bg-[#FFFAF2] !text-amber-600',
            }
        },
    }
);
export const Toast = forwardRef<ToastRef, ToastProps>(({
    type = 'info', className, children, ...props
}, ref) => {
    return (
        <div
            className={cn(toastVariants({ type }), className)}
            {...props}
            ref={ref}
        >
            {children}
        </div>
    );
});
Toast.displayName = 'Toast';


type ToastTitleRef = HTMLHeadingElement;
type ToastTitleProps = ComponentPropsWithoutRef<'h3'> & {
    asChild?: boolean;
};
export const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>(({
    className, children, asChild = false, ...props
}, ref) => {
    const Rendered = asChild ? Slot : 'h3';

    return (
        <Rendered
            className={cn('text-sm font-semibold', className)}
            {...props}
            ref={ref}
        >
            {children}
        </Rendered>
    );
});
ToastTitle.displayName = 'ToastTitle';


type ToastDescriptionRef = HTMLDivElement;
type ToastDescriptionProps = ComponentPropsWithoutRef<'p'> & {
    asChild?: boolean;
};
export const ToastDescription = forwardRef<ToastDescriptionRef, ToastDescriptionProps>(({
    className, children, asChild = false, ...props
}, ref) => {
    const Rendered = asChild ? Slot : 'p';

    return (
        <Rendered
            className={cn('text-sm opacity-90', className)}
            {...props}
            ref={ref}
        >
            {children}
        </Rendered>
    );
});
ToastDescription.displayName = 'ToastDescription';


type ToastActionRef = ElementRef<typeof Button>;
type ToastActionProps = ComponentPropsWithoutRef<typeof Button>;
export const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(({
    className, children, ...props
}, ref) => {
    return (
        <Button
            className={cn('text-sm', className)}
            size='xs'
            variant='outlined'
            {...props}
            ref={ref}
        >
            {children}
        </Button>
    );
});
ToastAction.displayName = 'ToastAction';