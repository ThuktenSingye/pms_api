const {setPermission ,setRole, createUser, getUsers, login,imageUpload, editProfile, deleteUser, getUserById, updateUser} = require('./user.controller');
const middleware =require('../../api/users/user.middleware');
const router = require('express').Router();

router.post("/permission",setPermission);
router.post("/role", setRole);
router.post('/add', createUser); // adding user
router.get("/", getUsers); // get all user
router.get("/:id", getUserById); // get all users
router.patch('/edit/:id', updateUser) // update user
router.delete("/:id", deleteUser) /// detele user
router.post("/upload/profileImg/",middleware.upload.single('image'), imageUpload);
router.patch("/editProfile", editProfile);
router.post("/login", login);
module.exports = router;