import { SignupUser } from '../../../application/usecases/client/signupUser';
import { UserRepositoryMongoose } from '../../repositories/userRepositoryMongoose';


export const SignupController = () => {
    const userRepository = new UserRepositoryMongoose();
    const signupUseCase = new SignupUser(userRepository);

    return async (req: any, res: any) => {
        try {
            console.log('req.body', req.body)
            const user = await signupUseCase.execute(req.body);
            res.status(201).json(user);
        } catch (err: any) {
            res.status(400).json({error: err.message});
        }
    }
}