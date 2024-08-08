import { Expose, plainToClass, plainToInstance } from "class-transformer"
import { IsOptional, IsString, validate } from "class-validator"

const source = {
    id: 123,
    name: 'toto',
    password: 'sensitive',
    retypepassword: 'sensitive',
    roles: ['user']
}

class User {
    @Expose() 
    id!: number

    @Expose() 
    name!: string

    @Expose() 
    password!: string
    
    @Expose()
    roles!: string[]
}

class UserLiteDto {
    @Expose()
    id!: number

    @Expose()
    name!: string
    
    @Expose()
    @IsString()
    @IsOptional()
    fooo?: string
}


type Constructor<T> = {
    new(...args: any[]): T;
};
function doMagic<T> (dto: Constructor<T>, source: any): T {
    return plainToInstance(dto , source, { excludeExtraneousValues: true})
}

const user: User = doMagic(User, source)
console.log(typeof user, user)

const userDto: UserLiteDto = doMagic(UserLiteDto, user)
console.log(typeof userDto, userDto)




validate(userDto, {
    forbidNonWhitelisted: true
}).then(e => console.log(e))