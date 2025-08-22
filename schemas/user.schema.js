import z, { email } from 'zod';


const userSchema = z.object({
    user_id: z.uuid(),
    username: z.string().min(8).max(50),
    email: z.string().email().max(100),
    passWord_hash: z.string().max(255),
    avatar_url: z.string().max(255),
    status: z.enum(['active', 'inactive']),
})


export function validateUser(user) {
    try {
        return userSchema.parse(user);
    } catch (error) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
    }
}


export function validateUpdateUser(user) {
    try {
        return userSchema.partial().parse(user);
    } catch (error) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
    }
}