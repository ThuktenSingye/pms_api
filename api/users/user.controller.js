
const { permission , role, create, getUsers,getUserByEmail, imageUpload, editProfile, deleteUser, getUserById, updateUser} = require('./user.service');
const {genSaltSync, hashSync, compareSync} = require('bcrypt') 

module.exports = {
    // setting permission controller
    setPermission:(req, res) =>{
        const body = req.body;
        permission(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    // setting role controller
    setRole: (req, res)=>{
        const body = req.body;
        role(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },
    // creating user controller
    createUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Cannot add user"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },
    deleteUser: (req, res)=>{
        const id = req.params.id
        // console.log(body)
        deleteUser(id, (err, result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                message: "deleted succesful"
            })
        })
        
    },
    updateUser: (req, res) =>{
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
    
        updateUser(body, id, (err, resulst)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                message: "Updated Succesfully"
            })
        })
    },
    getUsers: (req, res)=>{
        getUsers((err, result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: result
            });
        })
    },
    getUserById: (req, res)=>{
        const id = req.params.id
        console.log(id);
        getUserById(id, (err, result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: result
            });
        })
    },
    login: (req, res) =>{
        const {email, password} = req.body;
        getUserByEmail(email, (err, results)=>{
            if(err){
                console.log('Error querying the database:',err);
                res.status(500).json({error: "Database error"});
            }
            else if(results.length === 0){
                res.status(401).json({error: "Email not found"});
            }else{
                if(email !== results['Email']){
                    return res.status(401).json({error: 'ie'})
                }
                const result = compareSync(password, results['Password']);
                if(result){
                    result.password = undefined;
                    // const jsontoken = sign({result: result},"pms123",{expiresIn: "1h"});
                    return res.status(200).json({
                        message: "login Succesfully",
                        user_id: results.User_Id,
                        first_name: results.FName,
                        last_name: results.LName,
                        email: results.Email,
                        password: results.Password,
                        username: results.FName+' '+results.LName,
                        profile_imgSrc: results.Profile_Img,
                        // token: jsontoken
                    })
                }
                else{
                    return res.status(401).json({
                        error: 'ip',
                        data: "Invalid password"
                    })
                }
            }
            // return res.status(200).json({
            //     data: results
            // })
          
           
        })
    },
    imageUpload: (req, res)=>{
        const user_id = req.body.user_id;
        
        if(!req.file){
            console.log('No File Upload');
        }else{
            console.log("File Name:",req.file.filename)
            var imgsrc = "https://pms-node-api.onrender.com/public/images/"+ req.file.filename
            const body = {
                'user_id': user_id,
                'imgsrc': imgsrc
            }
            imageUpload(body, (err, results)=>{
                if(err){
                    console.log('Could no upload profile',err);
                }
                return res.status(200).json({
                    message: "Image Uploaded succesfully",
                    imgUrl: imgsrc
                })
               
            })
        }
    },
    editProfile: (req, res)=>{

        const body  = req.body;
        console.log("Body",body)
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        editProfile(body, (err,results)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Cannot update user" });
            }
            return res.status(200).json({ message: "Updated Successfully" });
        })
    },
    

}

