import { getRepository } from "typeorm";
import { User } from "../entities";
import UserInfo from "../@types/userinfo";

class AuthService {
  public async login(email: string): Promise<User | null> {
    try {
      const user: User | undefined = await getRepository<User>(User).findOne(
        email
      );

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      return Promise.reject("Internal error.");
    }
  }

  public async register(userData: UserInfo): Promise<User> {
    try {
      const user: User = getRepository<User>(User).create({
        name: userData.nickname,
        email: userData.email,
        avatar: userData.picture,
      });

      return user;
    } catch (error) {
      return Promise.reject("Internal error.");
    }
  }
}

export default new AuthService();
