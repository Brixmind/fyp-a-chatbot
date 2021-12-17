import mongoose from 'mongoose'

let connection:any|null = null

const User = new mongoose.Schema({
    id: {type:Number, required:true, unique:true, index:true},
    username: {type:String, required:true},
    name: {type:String},
    date_added: Date,
    raw_obj: Object
})

const mUser = mongoose.model('user',User)
mUser.createIndexes()
export const addUser=(userObj:any)=>{
    return new Promise((resolve,reject)=>{
        let newUser:any = {}
        newUser['id'] = userObj['id']
        newUser['username'] = userObj['username']
        newUser['name'] = userObj['first_name'] + ' ' + userObj['last_name']
        newUser['raw_obj'] = userObj
        newUser['date_added'] = new Date()

        const newData:any = new mUser(newUser)

        mUser.findOneAndUpdate({id:newUser['id']},newUser,{upsert:true}).then((data:any)=>{
            console.log('saved',data)
            resolve(data)
        }).catch((err:any)=>{
            console.log('error',err)
            reject(err)
        })
    })
}

export const DBConnect = () =>{
    return new Promise((resolve,reject)=>{
        if (connection==null) {
            mongoose.connect(process.env.MONGOSTR as string).then((c:any)=>{
                connection = c
                resolve(c)
            }).catch((e:any)=>{
                reject(e)
            })
        } else {
            resolve(connection)
        }
    })
}

