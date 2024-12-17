import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client } from '../../entities/Client';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface ClientDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }
});


export const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>('Client', ClientSchema);

export class ClientRepositoryMongoose implements ClientRepositary {
  async createClient(client: Client | any): Promise<Client> {


     if (!client.name || !client.email || !client.password) {
          throw new Error('Name, email, and password are required');
      }
    
      if(client.name.length < 4 || client.name.length > 20) {
         throw new Error('Name should be between 4 to 20 characters');
      }
    
      
      if (!validator.isEmail(client.email)) {
          throw new Error('Invalid email format');
      }
    
      if (!validator.isStrongPassword(client.password)) {
          throw new Error('Please enter a strong password');
      }


    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      name: client.name,
      email: client.email,
      password: hashedPassword,
      mobile: client.mobile,
    });

    const savedClient = await createdClient.save();

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password
    } as Client;
  }

  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (!client) return null;

    return {
      name: client.name,
      email: client.email,
      password: client.password
    } as Client;
  }


  async findClientByEmailAndPassword(email: string, password: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    console.log('the Client ', client)
    if (!client) throw new Error('Client not found');

    const isValidPassword = await bcrypt.compare(password, client.password);

    if (!isValidPassword) throw new Error('wrong password');
    console.log('success Client login')

    return {
      name: client.name,
      email: client.email
    } as Client;
  }


  async findClientByOnlyEmail(email: string, name: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) {
      console.log('the Client ', client)

      return {
        name: client.name,
        email: client.email
      } as Client;
    } else {


      const createdClient = new ClientModel({
        name: name,
        email: email
      });


      const savedClient = await createdClient.save();


      return {
        name: savedClient.name,
        email: savedClient.email
      } as Client;
    }


  }

}

