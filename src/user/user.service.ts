import { Injectable } from '@nestjs/common';
import { User } from '../entity/User.entity';

@Injectable()
export class UserService {
  async getUser() {
    const user = await User.createQueryBuilder('user').getOne();
    return user.profile[0].token;
  }
  async createUser(dto) {
    const user = User.create(dto);
    return User.save(user);
  }
}
