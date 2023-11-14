const pool = require('../../config/database');

module.exports = {
    // add project    
    // edit project
    // delete project

    // display recent 10 projects
    recentProject: (callback) => {
        const recentProject = `
            SELECT 
                Project.*,
                FundingAgency.*,
                Department.DName,
                CONCAT(FocalPerson.FName, ' ', FocalPerson.LName) AS FullName,
                CONCAT(User.FName,' ',User.LName) as ResearcherName
            FROM 
                Project
            JOIN 
                UserProject ON Project.P_Id = UserProject.P_Id
            JOIN 
                User  ON UserProject.User_Id = User.User_Id
            JOIN 
                FundingAgency ON Project.FA_Id = FundingAgency.FA_Id 
            JOIN 
                FocalPerson ON FundingAgency.FP_Id = FocalPerson.FPerson_Id
            JOIN 
                Department on Project.D_Id = Department.Dept_Id
            WHERE
               Project.End_Date <=?
            ORDER BY 
                Project.End_Date DESC
            LIMIT 6;           
        `
        const currentDate = new Date(); // Get the current date and time
        pool.query(
            recentProject,
            [currentDate],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                    return;
                }

                // Create a map to group data by project id
                const projectMap = new Map();

                result.forEach((row) => {
                    const projectId = row.P_Id;
                    // console.log(row)

                    // If the project doesn't exist in the map, create a new entry
                    if (!projectMap.has(projectId)) {
                        projectMap.set(projectId, {
                            P_Id: projectId,
                            Title: row.Title,
                            Start_Date: row.Start_Date,
                            End_Date: row.End_Date,
                            Area: row.Area,
                            Department: row.DName,
                            Amount: row.Amount,
                            InstitutionName: row.InstitutionName,
                            OrganizationName: row.OrganizationName,
                            Country: row.Country,
                            Category: row.Category,
                            FocalPerson: row.FullName,
                            Researchers: [],
                            Status: row.End_Date <= currentDate ? "Completed!": "Progress..." 
                        });
                    }
                    // Add the researcher to the Researchers array
                    projectMap.get(projectId).Researchers.push({
                        Name: row.ResearcherName
                    });
                });

                // Convert the map values to an array
                const combinedData = Array.from(projectMap.values());

                return callback(null, combinedData);
            }
        );
    },
    fetchProjectById: (body, callback) => {
        
        const recentProject = `
            SELECT 
                Project.*,
                FundingAgency.*,
                Department.DName,
                CONCAT(FocalPerson.FName, ' ', FocalPerson.LName) AS FullName,
                CONCAT(User.FName,' ',User.LName) as ResearcherName
            FROM 
                Project
            JOIN 
                UserProject ON Project.P_Id = UserProject.P_Id
            JOIN 
                User  ON UserProject.User_Id = User.User_Id
            JOIN 
                FundingAgency ON Project.FA_Id = FundingAgency.FA_Id 
            JOIN 
                FocalPerson ON FundingAgency.FP_Id = FocalPerson.FPerson_Id
            JOIN 
                Department on Project.D_Id = Department.Dept_Id
            WHERE User.User_Id = ?
        `

        const currentDate = new Date(); // Get the current date and time
        pool.query(
            recentProject,
            [body.user_id],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                    return;
                }

                // Create a map to group data by project id
                const projectMap = new Map();

                result.forEach((row) => {
                    const projectId = row.P_Id;
                    // console.log(row)

                    // If the project doesn't exist in the map, create a new entry
                    if (!projectMap.has(projectId)) {
                        projectMap.set(projectId, {
                            P_Id: projectId,
                            Title: row.Title,
                            Start_Date: row.Start_Date,
                            End_Date: row.End_Date,
                            Area: row.Area,
                            Department: row.DName,
                            Amount: row.Amount,
                            InstitutionName: row.InstitutionName,
                            OrganizationName: row.OrganizationName,
                            Country: row.Country,
                            Category: row.Category,
                            FocalPerson: row.FullName,
                            Researchers: [],
                            Status: row.End_Date <= currentDate ? "Completed!": "Progress..." 
                        });
                    }
                    // Add the researcher to the Researchers array
                    projectMap.get(projectId).Researchers.push({
                        Name: row.ResearcherName
                    });
                });

                // Convert the map values to an array
                const combinedData = Array.from(projectMap.values());

                return callback(null, combinedData);
            }
        );
    },
    fetchProjectByRouteId: (id, callback) => {
        
        const recentProject = `
            SELECT 
                Project.*,
                FundingAgency.*,
                Department.DName,
                CONCAT(FocalPerson.FName, ' ', FocalPerson.LName) AS FullName,
                CONCAT(User.FName,' ',User.LName) as ResearcherName
            FROM 
                Project
            JOIN 
                UserProject ON Project.P_Id = UserProject.P_Id
            JOIN 
                User  ON UserProject.User_Id = User.User_Id
            JOIN 
                FundingAgency ON Project.FA_Id = FundingAgency.FA_Id 
            JOIN 
                FocalPerson ON FundingAgency.FP_Id = FocalPerson.FPerson_Id
            JOIN 
                Department on Project.D_Id = Department.Dept_Id
            WHERE Project.P_Id = ?
        `
        pool.query(
            recentProject,
            [id],
            (error, result, fields) => {
                if (error) {
                    callback(error);
                    return;
                }

                return callback(null, result);
            }
        );
    },
    
    
    // project visualization
    // college : numberofproject over the years
    collegeProjectByYear: (callback)=>{
        const currentDate = new Date();
        pool.query(
            `SELECT YEAR(End_Date) AS Year, COUNT(*) AS NumberOfProject FROM Project WHERE End_Date <= ? GROUP BY YEAR(End_Date)`,
            [currentDate],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        );
    },
    collegeProjectByCategory: (callback) =>{
        const categoryProjectDetails = `
            SELECT
                FundingCategory.Category,
                COUNT(Project.P_Id) AS NumberOfProjects
            FROM 
                FundingCategory
            LEFT JOIN 
                FundingAgency ON FundingCategory.FundCat_Id = FundingAgency.FC_Id
            LEFT JOIN 
                Project ON FundingAgency.FA_Id = Project.FA_Id
            GROUP BY
                FundingCategory.Category;
        `
        pool.query(
            categoryProjectDetails,
            [],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                
                return callback(null, result);
            }
        );
    },
    // departmental fund comparision
    projectFund: (callback) =>{
        const combinedData = {};
        const fundQuery = `
            SELECT
                Department.DName,
                IFNULL(SUM(Project.Amount),0) AS TotalFunds,
                IFNULL(SUM(Project.Amount)/TotalFunds.Total * 100,0) as Percentage
            FROM
                Department
            LEFT JOIN
                Project on Department.Dept_Id = Project.D_Id
            CROSS JOIN (
                SELECT IFNULL(SUM(Project.Amount),0) AS Total FROM Project
            ) AS TotalFunds
            GROUP BY
                Department.DName,TotalFunds.Total;
        `
        pool.query(
            fundQuery,
            [],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                result.forEach((row)=>{
                    combinedData[row.DName] = row.Percentage;
                })
                console.log(combinedData)
                return callback(null, combinedData);
            }
        );
    },
    //deparment project status till 2023
    departmentProject: (callback) =>{
        const combinedData = {};
        const departmentProjectQuery = `
            SELECT 
                Department.DName,
                IFNULL(COUNT(Project.P_Id), 0) AS NumberOfProjects
            FROM 
                Department
            LEFT JOIN
                Project ON Department.Dept_Id = Project.D_Id 
            GROUP BY
                Department.DName;
        `
        pool.query(
            departmentProjectQuery,
            [],
            (error, result, fields) =>{
                if(error){
                    callback(error);
                }
                result.forEach((row)=>{
                    combinedData[row.DName] = row.NumberOfProjects;
                })
               return callback(null, combinedData);
            }
        );
    }

};
