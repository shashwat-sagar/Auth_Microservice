import { Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";

export class AuthController {
    constructor(private userService: UserService) {
        this.userService = userService;
    }

    register = async (req: RegisterUserRequest, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const response = await this.userService.create({
            firstName,
            lastName,
            email,
            password,
        });

        res.status(201).json(response.id);
    };
}
