const { displayRecentProject , visualizeCollegeProjectByYear, visualizeCollegeProjectByCategory, visualizeProjectFund, visualizeDepartmentProject, fetchProjectById} = require('./project.controller');

const router = require('express').Router();

router.get("/", displayRecentProject);
router.post('/',fetchProjectById);
router.get("/college/year", visualizeCollegeProjectByYear);
router.get("/college/category", visualizeCollegeProjectByCategory);
router.get('/department/funds', visualizeProjectFund);
router.get('/department/project', visualizeDepartmentProject);
module.exports = router;