import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import dayjs, { isDayjs } from 'dayjs';

/**
 * Checks if provided string is Dayjs compliant.
 */
export function IsDayjsString(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types,@typescript-eslint/explicit-function-return-type
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [], // Constraints can be passed here if needed by the validator
      validator: IsDayjsStringConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isDayjsString', async: false })
class IsDayjsStringConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _args?: ValidationArguments): boolean {
    if (typeof value === 'string') {
      return dayjs(value).isValid();
    }
    // If dayjs value somehow is passed here, mark as valid
    return isDayjs(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Property ${args.property} must be a valid date string.`;
  }
}
