const { displayRecentProject , visualizeCollegeProjectByYear, visualizeCollegeProjectByCategory, visualizeProjectFund, visualizeDepartmentProject, fetchProjectById, fetchProjectByRouteId} = require('./project.controller');


const router = require('express').Router();

router.get("/", displayRecentProject);
router.get('/:id',fetchProjectByRouteId);
router.post('/',fetchProjectById);
router.get("/college/year", visualizeCollegeProjectByYear);
router.get("/college/category", visualizeCollegeProjectByCategory);
router.get('/department/funds', visualizeProjectFund);
router.get('/department/project', visualizeDepartmentProject);
module.exports = router;