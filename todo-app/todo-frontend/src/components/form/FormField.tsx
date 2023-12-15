import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/libs/cn.lib";

type FormFieldRef = HTMLDivElement;
type FormFieldProps = ComponentPropsWithoutRef<'div'> & {
    variant?: 'vertical' | 'horizontal';
}

export const FormField = forwardRef<FormFieldRef, FormFieldProps>(({
    className, variant = 'vertical', children, ...props
}, ref) => {
    return (
        <div
            className={cn('flex', {
                'flex-col gap-y-2': variant === 'vertical',
                'flex-row gap-x-2': variant === 'horizontal',
            }, className)}
            {...props}
            ref={ref}
        >
            {children}
        </div>
    );
});

FormField.displayName = "FormField";