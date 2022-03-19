import { Project } from "../db";

class projectService{
    static async addProject({user_id,title,description,from_data,to_data}){
        const newProject ={ user_id, title, description, from_data, to_data};

        const createdNewProject =  await Project.create({newProject});
        createdNewProject.errorMessage=null;
        
        return createdNewProject;
    }

    static async getProject({projectId}){

        const projectName = await Project.findById({projectId});
        return projectName;
         }

    
         static async putProject({id, update}){
            let project = await Project.findById({id});

            if(!project){
                return "project가 존재하지 않습니다.";
            }

            if (update.title){
                const fieldtoUpdate="title";
                const newValue = update.title;
                project = await Project.update({id,fieldtoUpdate,newValue});
            }

            if (update.description){
                const fieldtoUpdate="description";
                const newValue = update.description;
                project = await Project.update({id,fieldtoUpdate,newValue});
            }

            if (update.from_data){
                const fieldtoUpdate="from_data";
                const newValue = update.from_data;
                project = await Project.update({id,fieldtoUpdate,newValue});
            }

            if (update.to_data){
                const fieldtoUpdate="to_data";
                const newValue = update.to_data;
                project = await Project.update({id,fieldtoUpdate,newValue});
            }

            return project;
        }


    }



export {projectService}