import { FieldErrors, FieldValues, UseFormSetError } from "react-hook-form";

export const handleErrors = <T extends FieldValues>(cb: UseFormSetError<T>) => (errors: FieldErrors<T>) => {
    const errorValues = Object.entries(errors);

    for (const error of errorValues) {
        const [key, value] = error;

        if (value && key !== 'root' && value.message) {
            cb(key as 'root', {
                message: value.message as string,
                type: (value.type ?? 'manual') as string
            })
        }
    }
}