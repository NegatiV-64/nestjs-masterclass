import { ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "~/libs/cn.lib";

type FormRef = HTMLFormElement;
type FormProps = ComponentPropsWithoutRef<'form'>;

export const Form = forwardRef<FormRef, FormProps>(({
    className, onSubmit, ...props
}, ref) => {
    const formId = useId();

    return (
        <form
            id={formId}
            ref={ref}
            className={cn(className)}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
            {...props}
        />
    );
});

Form.displayName = "Form";