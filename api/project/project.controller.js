const { recentProject, collegeProjectByYear , collegeProjectByCategory, projectFund, departmentProject, fetchProjectById } = require('./project.service');

module.exports = {
    displayRecentProject: (req, res) =>{
    
        recentProject((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    fetchProjectById: (req, res) =>{
        const body = req.body;
        fetchProjectById(body, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },


    visualizeCollegeProjectByYear: (req, res)=>{
        collegeProjectByYear((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    visualizeCollegeProjectByCategory: (req, res) =>{
        collegeProjectByCategory((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    visualizeProjectFund: (req, res) =>{
        projectFund((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    visualizeDepartmentProject: (req,res) =>{
        departmentProject((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        })
    }

}