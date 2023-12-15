import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from "react";
import { Input } from "./Input";
import { FormField } from "./FormField";
import { Label } from "./Label";

type TextFieldRef = ElementRef<typeof Input>;
type TextFieldProps = Omit<ComponentPropsWithoutRef<typeof Input>, 'type'> & {
    label?: ReactNode;
    formFieldProps?: ComponentPropsWithoutRef<typeof FormField>;
    labelProps?: ComponentPropsWithoutRef<typeof Label>;
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
}

export const TextField = forwardRef<TextFieldRef, TextFieldProps>(({
    label, formFieldProps, required, labelProps, ...props
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
            <Input {...props} ref={ref} />
        </FormField>
    );
});


TextField.displayName = "TextField";