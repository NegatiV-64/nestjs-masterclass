import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from "react";
import { Input } from "./Input";
import { FormField } from "./FormField";
import { Label } from "./Label";

type DateFieldRef = ElementRef<typeof Input>;
type DateFieldProps = Omit<ComponentPropsWithoutRef<typeof Input>, 'type'> & {
    label?: ReactNode;
    formFieldProps?: ComponentPropsWithoutRef<typeof FormField>;
    labelProps?: ComponentPropsWithoutRef<typeof Label>;
    type?: 'date' | 'datetime-local';
}

export const DateField = forwardRef<DateFieldRef, DateFieldProps>(({
    label, formFieldProps, type = 'date', required, labelProps, ...props
}, ref) => {
    return (
        <FormField variant="vertical" {...formFieldProps}>
            {
                label ? (
                    <Label required={required} {...labelProps}>
                        {label}
                    </Label>
                ) : null
            }
            <Input type={type} {...props} ref={ref} />
        </FormField>
    );
});


DateField.displayName = "DateField";