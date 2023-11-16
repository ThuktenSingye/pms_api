const { displayRecentProject , visualizeCollegeProjectByYear, visualizeCollegeProjectByCategory, visualizeProjectFund, visualizeDepartmentProject, fetchProjectById, fetchProjectByRouteId, addProject, fetchFundingId, deleteProject, updateProject, fetchAllProject} = require('./project.controller');


const router = require('express').Router();

router.get("/recent", displayRecentProject); /// fetchh all project
router.get("/", fetchAllProject); // fecth recent project
router.get('/:id',fetchProjectByRouteId); // fetch project based on id
router.delete('/delete/:id', deleteProject) // delete project based on id
router.post('/fetch', fetchFundingId) // 
router.post('/',fetchProjectById); // fetch project based on id
router.post('/add', addProject); // add project
router.patch('/update/:id', updateProject); // update project
router.get("/college/year", visualizeCollegeProjectByYear); // 
router.get("/college/category", visualizeCollegeProjectByCategory);
router.get('/department/funds', visualizeProjectFund);
router.get('/department/project', visualizeDepartmentProject);
module.exports = router;