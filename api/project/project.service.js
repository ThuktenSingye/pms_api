const pool = require('../../config/database');

module.exports = {
    // add project    
    // edit project
    // delete project

    // display recent 10 projects
    allProject: (callback) => {
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
                User ON UserProject.User_Id = User.User_Id
            JOIN 
                FundingAgency ON Project.FA_Id = FundingAgency.FA_Id 
            JOIN 
                FocalPerson ON FundingAgency.FP_Id = FocalPerson.FPerson_Id
            JOIN 
                Department on Project.D_Id = Department.Dept_Id
            ORDER BY 
                Project.End_Date DESC       
        `
        const currentDate = new Date(); // Get the current date and time
        pool.query(
            recentProject,
            [],
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
                User ON UserProject.User_Id = User.User_Id
            JOIN 
                FundingAgency ON Project.FA_Id = FundingAgency.FA_Id 
            JOIN 
                FocalPerson ON FundingAgency.FP_Id = FocalPerson.FPerson_Id
            JOIN 
                Department on Project.D_Id = Department.Dept_Id
            WHERE 
                Project.End_Date <= ?
            ORDER BY 
                Project.End_Date DESC
            LIMIT 6       
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
        const currentDate = new Date();
        
        const recentProject = `
            SELECT 
                Project.*,
                FundingAgency.*,
                Department.DName,
                CONCAT(FocalPerson.FName, ' ', FocalPerson.LName) AS FullName,
                CONCAT(User.FName,' ',User.LName) as ResearcherName,
                User.User_Id
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
    },
    addProject: (body, callback)=>{
        console.log("body", body)
        const fp_id = 2;
        pool.query(`INSERT INTO FundingAgency(OrganizationName,Country, Category, FP_Id) VALUES(?, ?, ?,${fp_id})`,
        [body.org_name, body.country, body.category],
        (error, result, fields) =>{
            if(error){
                callback(error);
            }
            const fa_id = result.insertId;
            var department_id = 0;
            // department selection
            if(body.department == "Information Technology"){
                department_id = 1;
            }
            else if(body.department == "Geology"){
                department_id = 2;

            }
            else if(body.department == "Civil Engineering"){
                department_id = 3;

            }
            else if(body.department == "Instrumentation & Control Engineering"){
                department_id = 4;

            }
            else if(body.department == "Electrical Engineering"){
                department_id = 5;

            }
            else if(body.department == "Architecture"){
                department_id = 6;

            }
            else if(body.department == "Mechanical Engineering"){
                department_id = 7;

            }
            else if(body.department == "Electronic & Communication Engineegin"){
                department_id = 8;


            }
            else if(body.department == "Water Resource Engineering"){
                department_id = 9;
                

            }
            else if(body.department == "Science and Humanities"){
                department_id = 11;

            }else{
                department_id = 10;
            }
            console.log("department",department_id)
            // project query 
            const projectQuery= `
                INSERT INTO Project(Title, Start_Date,End_Date,Area,Amount,InstitutionName,FA_Id, D_Id)
                VALUES(?,?,?,?,?,?,${fa_id},${department_id})
            `
            pool.query(projectQuery,
                [body.title,body.start_date, body.end_date,body.area, body.amount, body.institute_name],
                (error, results, fields) =>{
                    if(error){
                        callback(error);
                    }
                    console.log("added succesfully");
                    console.log("project Id", results.insertId);
                    const project_id = results.insertId;
                    const researcher_id = body.researcher_id;
                    pool.query(`
                        INSERT INTO UserProject(User_Id,P_Id)
                        VALUES(${researcher_id},${project_id})
                        `,
                        [],
                        (err, res, fields)=>{
                            if(err){
                                callback(err)
                            }
                            return callback(null, res)
                        }
                    
                    
                    )
                   
                }
            )
        }
        )

    },
    updateProject: (body, id, callback)=>{
        console.log("body", body);
        //
        var department_id = 0;
            // department selection
            if(body.department == "Information Technology"){
                department_id = 1;
            }
            else if(body.department == "Geology"){
                department_id = 2;

            }
            else if(body.department == "Civil Engineering"){
                department_id = 3;

            }
            else if(body.department == "Instrumentation & Control Engineering"){
                department_id = 4;

            }
            else if(body.department == "Electrical Engineering"){
                department_id = 5;

            }
            else if(body.department == "Architecture"){
                department_id = 6;

            }
            else if(body.department == "Mechanical Engineering"){
                department_id = 7;

            }
            else if(body.department == "Electronic & Communication Engineegin"){
                department_id = 8;


            }
            else if(body.department == "Water Resource Engineering"){
                department_id = 9;
                

            }
            else if(body.department == "Science and Humanities"){
                department_id = 11;

            }else{
                department_id = 10;
            }
            console.log("department",department_id)

        const projectUpdateQuery = `
            UPDATE Project SET Title = ?, Start_Date = ?,End_Date = ?, Area = ?,Amount = ?,InstitutionName = ?,D_Id= ? WHERE P_Id = ?
        `;
        pool.query(
            projectUpdateQuery,
            [body.title,body.start_date, body.end_date, body.area, body.amount, body.institute_name, department_id, id],
            (error, result, fields)=>{
                if(error){
                    callback(error)
                }
                pool.query('SELECT FA_Id from Project WHERE P_Id = ?',
                    [id],
                    (error, result, fields)=>{
                        if(error){
                            return callback(error)
                        }
                        console.log("Result", result)
                        const fa_res = result[0]
                        const fa_id = fa_res.FA_Id;
                        console.log(fa_id);
                        pool.query('UPDATE FundingAgency SET OrganizationName = ?, Country = ?, Category = ? , FP_Id = ? WHERE FA_Id = ?',
                            [body.org_name,body.country, body.category, 2, fa_id],
                            (error, result, fields)=>{
                                if(error){
                                    return callback(err);
                                }
                                // update user project
                                pool.query('UPDATE UserProject SET User_Id = ? WHERE UP_Id IN (SELECT UP_Id from UserProject WHERE P_Id = ?)',
                                    [body.researcher_id, id],
                                    (error, result, fields)=>{
                                        if(error){
                                            return callback(error)
                                        }
                                        console.log("Updated Succesfully");
                                        return callback(null, result);
                                    }

                                )
                            }
                        )
                    }
                )
            }    
        )
        
    },
   
    fetchFundingId: (body, callback)=>{
        pool.query(`select FA_Id from Project where P_Id = ?`,
            [body.id],
            (error, result, field)=>{
                if(error){
                    callback(error)
                }
                
                return callback(null, result[0])
            }
        )
    },
    deleteProject: (id, callback) => {
        let fa_id = 0;
        console.log('id', id);
    
        // First, delete the user project data
        const upQuery = `
            DELETE FROM UserProject 
            WHERE UP_Id IN (
                SELECT UserProject.UP_Id FROM UserProject
                WHERE UserProject.P_Id = ?
            )`;
    
        pool.query(upQuery, [id], (error, result, fields) => {
            if (error) {
                return callback(error);
            }
            console.log("user project deleted");
    
            // Next, fetch the FA_Id based on P_Id
            pool.query(`SELECT FA_Id FROM Project WHERE P_Id = ?`, [id], (err, res, field) => {
                if (err) {
                    return callback(err);
                }
    
                const value = res[0];
                fa_id = value.FA_Id;
               
                // Now, delete data from FundingAgency based on FA_Id
                pool.query(`DELETE FROM Project WHERE P_Id = ?`, [id], (error, results, field)=> {
                    if (err) {
                        return callback(err);
                    }

                    // Finally, delete the project
                    pool.query(`DELETE FROM FundingAgency WHERE FA_Id = ?`, [fa_id], (err, res, field)=> {
                        if (error) {
                            return callback(error);
                        }
    
                        console.log("project deleted successfully");
                        return callback(null, results);
                    });
                });
            });
        });
    },
    

};
