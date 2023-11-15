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
       
        let role_id = 0;
        switch(data.role_name){
            case 'student': role_id = 1;
                break;
            case 'researcher': role_id = 2;
                break;
            case 'non-researcher': role_id = 3;
                break;
            case 'admin': role_id = 4;
                break;
        }
        console.log(role_id)
        pool.query(
            `INSERT INTO User(User_Id,FName,LName,Email,Password,Role_Id)
            VALUES(?,?,?,?,?, ${role_id})
            `,
            [
                data.user_id,
                data.first_name,
                data.last_name,
                data.email,
                data.password,
            ],
            (error, result, fields)=>{
                if(error){
                    return callback(error)
                }
                return callback(null, result)
            }
        );
    },
    updateUser: (data, id,  callback) =>{
        pool.query(
            `UPDATE User SET User_Id = ?, FName=?,LName=?, Email=?, Password=?, Role_Id = ? WHERE User_Id=?`,
            [
                data.user_id,
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.role_id,
                id
            ],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                return callback(null, result[0]);
            }
            );
    },

    deleteUser:(id, callback) =>{
        pool.query(
            `DELETE FROM User WHERE User_Id = ?`,
            [id],
            (error, results, fields) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUsers: callback =>{
        pool.query(
            `SELECT * from User`,
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
            `select User_Id,FName,LName,Email,Password, Role_Id from User where User_Id = ?`,
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
