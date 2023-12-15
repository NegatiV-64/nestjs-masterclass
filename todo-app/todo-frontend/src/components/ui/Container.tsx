import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '~/libs/cn.lib';

type ContainerRef = HTMLDivElement;
type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const Container = forwardRef<ContainerRef, ContainerProps>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn('container px-8 mx-auto', className)}
            {...props}
            ref={ref}
        />
    )
})

Container.displayName = 'Container';