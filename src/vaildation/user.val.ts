import { Matches, MinLength, IsEmail} from "class-validator"

export class CreateUserDto {
    
    @Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/,)
    public password!: string;

    @IsEmail()
    public email!: string;

    @MinLength( 1, {
        message: "required nickname"
    }) 
    public nickname!: string;
}