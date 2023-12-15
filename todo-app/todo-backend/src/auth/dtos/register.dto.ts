import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  NotContains,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  @Matches(/^[a-z0-9_.-]{4,50}$/, {
    message: 'Username must be alphanumeric, underscore, dot or dash',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @Length(8, 50)
  password: string;
}
