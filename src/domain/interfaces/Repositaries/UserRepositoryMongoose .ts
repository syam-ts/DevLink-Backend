import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../../entities/User';
import { UserRepositary } from '../../../application/usecases/user/signupUser';
import bcrypt from 'bcrypt';
 
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}
 
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  mobile: { type: Number, required: false },
});

 
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

export class UserRepositoryMongoose implements UserRepositary {
  async createUser(user: User | any): Promise<User> {

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new UserModel({
      name: user.name, 
      email: user.email,
      password: hashedPassword,
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
     const user = await UserModel.findOne({ email }).exec();
     console.log('the user ', user)
     if (!user) throw new Error('user not found');
   
     const isValidPassword = await bcrypt.compare(password, user.password);
      
     if(!isValidPassword) throw new Error('wrong password');
    

    return { 
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    } as User;
  }


  async findUserByOnlyEmail(email: string, name: string): Promise<User | null> {
     const user = await UserModel.findOne({ email }).exec();
     if (user) {
       console.log('the user ', user)

       return { 
        name: user.name,
        email: user.email
      } as User;
     } else {

       
       const createdUser = new UserModel({
         name: name, 
         email: email
        });
       

    const savedUser = await createdUser.save();

     
    return { 
      name: savedUser.name,
      email: savedUser.email
    } as User;
  }


     }
     
  }

