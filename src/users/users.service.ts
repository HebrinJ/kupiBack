import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    create(user: User): User {
        return user;
    }

    findOne(): string {
        return 'user';
    }

    updateOne() {}

    removeOne() {}
    
}
