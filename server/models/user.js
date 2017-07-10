import yapi from '../yapi.js'
import mongoose  from 'mongoose'
import baseModel from './base.js'

class userModel extends baseModel{
    getName(){
        return 'user'
    }

    getSchema(){
        return{
           username: {
               type: String,
               required: true
           },
           password:{
               type:String,
               required: true
          },
           email: {
               type: String,
               required: true
           },
           token: String,
           passsalt: String,
           role: String,
           add_time: Number,
           up_time: Number 
        }
    }
    save(data){
        let user = new this.model(data);
        return user.save();
    }
    checkRepeat(name){
        return this.model.count({
            username: name
        })
    }
    list(){
        return this.model.find().select("username_id username email role  add_time up_time").exec()  //显示id name email role 
    }
    findByName(username){
        return this.model.findOne({username})
    }
    findById(id){
        return this.model.findById({
            _id: id
        })
    }
    del (id) {
        return this.model.deleteOne({
            _id: id
        })
    }
    update(id,data){
        return this.model.update({
            _id: id,
        },{
            username: data.username,
            password: data.password,
            email: data.email,
            role: data.role,
            up_time: yapi.commons.time()
        })
    }

}

module.exports = userModel
