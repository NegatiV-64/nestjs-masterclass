import { ValidationOptions, registerDecorator } from "class-validator";
import { day } from "src/shared/libs/day.lib";

export function IsValidTaskDeadline(
    max: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "isValidTaskDeadline",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [max],
            options: validationOptions,
            validator: {
                validate(value: unknown, validationArgs) {
                    if (typeof value !== "string") {
                        return false;
                    }

                    const [maxValue] = validationArgs.constraints;
                    const maxDate = day(maxValue, 'DD-MM-YYYY');
                    const valueDate = day(value, 'DD-MM-YYYY');

                    if (!maxDate.isValid()) {
                        return false;
                    }
                    if (!valueDate.isValid()) {
                        return false;
                    }

                    const isBefore = valueDate.isBefore(maxDate);

                    if (isBefore) {
                        return false;
                    }

                    return true;
                },
            },
        })
    }
}