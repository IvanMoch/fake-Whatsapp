import { pool } from "../database.js";
import { validateUser, validateUpdateUser } from "../schemas/user.schema.js";
import bcrypt from "bcryptjs";


export class UserModel {

    static async createUser(user) {
        try {
            const validatedUser = await validateUser(user);
            const hashedPassword = await bcrypt.hash(validatedUser.passWord_hash, 10);
            const [result] = await pool.query('INSERT INTO users (user_id, username, email, passWord_hash, avatar_url, status) VALUES (?, ?, ?, ?, ?, ?)', [
                validatedUser.user_id, validateUser.username, validatedUser.email, hashedPassword, validatedUser.avatar_url, validatedUser.status
            ]);
        }catch(error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async getUserById(userId) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    static async findUserByEmail(email) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    static async findUserByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    }

    static async updateUser(userId, userData) {
        const validatedUser = validateUpdateUser(userData);
        try {
            const updates = [];
            const values = [];

            if (validatedUser.username) {
                updates.push('username = ?');
                values.push(validatedUser.username);
            }
            if (validatedUser.email) {
                updates.push('email = ?');
                values.push(validatedUser.email);
            }
            if (validatedUser.passWord_hash) {
                const hashedPassword = await bcrypt.hash(validatedUser.passWord_hash, 10);
                updates.push('passWord_hash = ?');
                values.push(hashedPassword);
            }
            if (validatedUser.avatar_url) {
                updates.push('avatar_url = ?');
                values.push(validatedUser.avatar_url);
            }
            if (validatedUser.status) {
                updates.push('status = ?');
                values.push(validatedUser.status);
            }

            values.push(userId);

            const query = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;
            await pool.query(query, values);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async deleteUser(userId) {
        try {
            await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    static async updateUserStatus(userId, status) {
        try {
            await pool.query('UPDATE users SET status = ? WHERE user_id = ?', [status, userId]);
        } catch (error) {
            throw new Error(`Error updating user status: ${error.message}`);
        }
    }

    static async updateUserAvatar(userId, avatarUrl) {
        try {
            await pool.query('UPDATE users SET avatar_url = ? WHERE user_id = ?', [avatarUrl, userId]);
        } catch (error) {
            throw new Error(`Error updating user avatar: ${error.message}`);
        }
    }

    static async updateLastSeen(userId, lastSeen) {
        try {
            await pool.query('UPDATE users SET last_seen = ? WHERE user_id = ?', [lastSeen, userId]);
        } catch (error) {
            throw new Error(`Error updating user's last seen: ${error.message}`);
        }
    }
}