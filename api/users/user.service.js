const pool = require('../../config/database'); // importing pool

// api for user
module.exports = {
    // for setting permission
    permission:(data, callback) =>{
        pool.query(
            `insert into Permission(CanView,CanEdit,CanDelete,CanAdd) VALUES(?,?,?,?)`,
            [
                data.can_view,
                data.can_edit,
                data.can_delete,
                data.can_add
            ],
            (error, result, fields) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            }
        )
    },
    // setting role
    role: (data, callback) =>{
        pool.query(
            `insert into Role(Role,Perm_Id) VALUES(?,?)`,
            [
                data.role,
                data.perm_id
            ],
            (error, result, fields) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
            }
        );
    },
    // creating user
    create :(data, callback) =>{
        // pool.query(
        //     `insert into Users(FName,LName,email,password,Role_Id)
        //     VALUES(?,?,?,?,?)
        //     `,
        //     [
        //         data.first_name,
        //         data.last_name,
        //         data.email,
        //         data.password,
        //         data.role_id
        //     ],
        //     (error, result, fields)=>{
        //         if(error){
        //             return callback(error)
        //         }
        //         return callback(null, result)
        //     }
        // );
        pool.query(
            `insert into User(User_Id,FName,LName,Email,Password,Role_Id)
            VALUES(?,?,?,?,?,?)
            `,
            [
                data.user_id,
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.role_id
            ],
            (error, result, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, result)
            }
        );
    },
    getUsers: callback =>{
        pool.query(
            `select * from Users`,
            [],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        );
    },
    getUserById: (id, callback) =>{
        pool.query(
            `select Users_Id,FName,LName,Email,Password from Users where id = ?`,
            [id],
            (error, results, fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callback)=>{
        pool.query(
            `select * from User where Email = ?`,
            [email],
            (error, results, fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, results[0])
            }
        )
    },
    imageUpload:(data, callback)=>{

        pool.query(
            'UPDATE User SET Profile_Img = ? WHERE User_Id = ?',
            [data.imgsrc, data.user_id],
            (error, result, fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null, result);
            }
        )
    },
    editProfile:(data, callback)=>{
        console.log("data",data)
        pool.query(`UPDATE User SET FName = ?,LName = ?, Password = ?, Profile_Img = ? WHERE User_Id = ?`,
            [data.first_name, data.last_name,data.password, data.profile_src, data.user_id],
            (error, result, fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        )
    }
   
};
