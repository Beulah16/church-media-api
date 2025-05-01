import { Request, Response } from 'express';
import { User } from '../models/User';
import { Password } from '../helpers/password';
import { JWT } from '../helpers/jwt';
import { UserRegisteredNotification } from '../notifications/UserRegisteredNotification';

export const register = async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        userData.password = await Password.hash(userData.password);
        const user = new User();
        Object.assign(user, userData);
        await user.save();

        await user.notify(new UserRegisteredNotification())

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: 'Error registering user', error });
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOneBy({ email });

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });

            return;
        }

        const isPasswordValid = await Password.verify(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });

            return;
        }

        res.status(200).json({
            message: 'Login successful',
            user,
            token: JWT.generateToken(user)
        });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: 'Error logging in', error });
    }
}
