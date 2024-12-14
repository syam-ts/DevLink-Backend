import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../../domain/entities/User';
import { UserRepositary } from '../../application/usecases/user/signupUser';

 
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}
 
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
});

 
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

export class UserRepositoryMongoose implements UserRepositary {
  async createUser(user: User): Promise<User> {
    const createdUser = new UserModel({
      name: user.name, 
      email: user.email,
      password: user.password,
      mobile: user.mobile,
    });

    const savedUser = await createdUser.save();

    return { 
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      mobile: savedUser.mobile,
    } as User;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return null;

 
    return { 
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
    } as User;
  }


  async findUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ email, password }).exec();
    if (!user) return null;

    return { 
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
    } as User;
  }
}
