import { ComponentPropsWithoutRef, forwardRef } from 'react';

type FormFieldErrorRef = HTMLDivElement;
type FormFieldErrorProps = ComponentPropsWithoutRef<'div'>;

export const FormFieldError = forwardRef<FormFieldErrorRef, FormFieldErrorProps>(({
    className, children, ...props
}, ref) => {
    if (!children) return null;

    return (
        <div
            className={`text-red-500 text-sm mt-1 ${className}`}
            {...props}
            ref={ref}
        >
            {children}
        </div>
    );
});


FormFieldError.displayName = "FormFieldError";