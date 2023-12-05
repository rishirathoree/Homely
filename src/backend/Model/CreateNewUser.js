import { Schema, model } from "mongoose";

const CreateUserSchema = new Schema({
    FullName:{type:String,required:true},
    UserName:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
      },
    
})

const Users = new model('Users',CreateUserSchema)
export default Users;