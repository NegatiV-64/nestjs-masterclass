import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react';
import { Root } from '@radix-ui/react-label';
import { cn } from '~/libs/cn.lib';

type LabelRef = ElementRef<typeof Root>;
type LabelProps = ComponentPropsWithoutRef<typeof Root> & {
    required?: boolean;
};

export const Label = forwardRef<LabelRef, LabelProps>(({
    className, children, hidden, required, ...props
}, ref) => {
    return (
        <Root
            className={cn('text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', { 'sr-only': hidden, }, className)}
            {...props}
            ref={ref}
        >
            {children}
            {required ? <span className="text-red-500">*</span> : null}
        </Root>
    );
});


Label.displayName = "Label";