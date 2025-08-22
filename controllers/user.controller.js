/*
TODO: CRUD, update status, change avatar, update last seem
*/

import { UserModel } from "../models/user.model.js";
import { validateUser, validateUpdateUser } from "../schemas/user.schema.js";


export class UserController {

    static async createUser(req, res) {
        try {
            const userData = req.body;
            const validatedData = await validateUser(userData);
            await UserModel.createUser(validatedData);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await UserModel.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const user = await UserModel.findUserByUsername(username);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const validatedData = await validateUpdateUser(userData);
            await UserModel.updateUser(userId, validatedData);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUserStatus(req, res) {
        try {
            const userId = req.params.id;
            const { status } = req.body;
            if (!['active', 'inactive'].includes(status)) {
                return res.status(400).json({ error: 'Invalid status value' });
            }
            await UserModel.updateUser(userId, { status });
            res.status(200).json({ message: 'User status updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async changeAvatar(req, res) {
        try {
            const userId = req.params.id;
            const { avatar_url } = req.body;
            await UserModel.updateUser(userId, { avatar_url });
            res.status(200).json({ message: 'User avatar updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateLastSeen(req, res) {
        try {
            const userId = req.params.id;
            const last_seen = new Date();
            await UserModel.updateUser(userId, { last_seen });
            res.status(200).json({ message: 'User last seen updated successfully' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }


    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserModel.deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}