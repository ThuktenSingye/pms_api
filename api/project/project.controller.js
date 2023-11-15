const { recentProject, collegeProjectByYear , collegeProjectByCategory, projectFund, departmentProject, fetchProjectById,fetchProjectByRouteId , addProject, fetchFundingId, deleteProject, updateProject, allProject} = require('./project.service');

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
    fetchAllProject: (req, res) =>{
    
        allProject((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                data: results
            })
        })
    },
    
    fetchProjectByRouteId: (req, res)=>{
        console.log("ID", req.params.id);
        const id = req.params.id;
        fetchProjectByRouteId(id, (err, results)=>{
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
    },
    addProject:(req, res)=>{
        const body = req.body;
        console.log(body);
        addProject(body, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            return res.status(200).json({
                success:1,
                message: "added succesfully"
            })
        })
        
    },
    updateProject: (req, res)=>{
        const body = req.body;
        const id = req.params.id;
        updateProject(body, id, (err, result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                message: "Updated Succesfully"
            })
        })
      
    },
    fetchFundingId: (req, res)=>{
        const body = req.body;

        fetchFundingId(body, (err,result)=>{
            if(err){
                console.log(err);
                return
            }
            return res.status(200).json({
                data: result.FA_Id
            })
        })
    },
    deleteProject: (req, res)=>{
        const id = req.params.id;
        console.log(id)
        deleteProject(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            return res.status(200).json({
                message: "deleted succesfully"
            })
        })
    }
}