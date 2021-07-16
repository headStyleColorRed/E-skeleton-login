pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage("build") {
            steps {
                 sh "chmod +x -R Jenkins/jenkinBuild.sh"
                sh 'Jenkins/jenkinBuild.sh'
            }
        }
    }
}