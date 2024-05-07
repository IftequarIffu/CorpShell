'use server'
import {exec} from 'child_process'

export const createDockerImage = async() => {

    // Check if an image named "codedamn-project-image" exists
    const dockerImageCheckCommand = `docker images codedamn-project-image --format "{{.Repository}}"`;

    exec("ls -al; pwd", (error, stdout, stderr) => {
      if (error) {
          console.error(`Error checking Docker images: ${error}`);
          return;
      }
  
      console.log(`Output: ${stdout}`);
        if (stderr) {
          console.error(`Error: ${stderr}`);
        }
      })


    // If it doesn't exist create one
    exec(dockerImageCheckCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error checking Docker images: ${error}`);
        return;
    }
    console.log("Check if docker image is present -------------------------", stdout)
    if (stdout.trim() === 'codedamn-project-image') {
        console.log('Docker image already exists. Skipping build.');
        return;
    }
    })



    let createDockerImagecommand = "docker build -t codedamn-project-image -f ./Dockerfile ."


    exec(createDockerImagecommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
      
        console.log(`Create docker image ----------------------------------: ${stdout}`);
        if (stderr) {
          console.error(`Error: ${stderr}`);
        }
      });

}


export const createContainer = async(projectId: string) => {

    let createDockerContainerCommand = `docker run -v /tmp/${projectId}:/codedamn-workspace --workdir /codedamn-workspace --name ${projectId} --network my_network codedamn-project-image`


    exec(createDockerContainerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
      
        console.log(`Output: ${stdout}`);
        if (stderr) {
          console.error(`Error: ${stderr}`);
        }
      });

}
