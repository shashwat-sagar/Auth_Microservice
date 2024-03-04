import { Repository } from "typeorm";

import { User } from "../entity/User";
import { UserData } from "../types";
import { Roles } from "../contants";

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        return await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
            role: Roles.CUSTOMER,
        });
    }
    async getDetails() {
        return await this.userRepository.find();
    }
}
