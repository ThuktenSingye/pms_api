const {setPermission ,setRole, createUser, getUsers, login,imageUpload, editProfile} = require('./user.controller');
const middleware =require('../../api/users/user.middleware');
const router = require('express').Router();

router.post("/permission",setPermission);
router.post("/role", setRole);
router.post('/', createUser);
router.get("/", getUsers);
router.post("/upload/profileImg/",middleware.upload.single('image'), imageUpload);
router.patch("/editProfile", editProfile);
router.post("/login", login);
module.exports = router;