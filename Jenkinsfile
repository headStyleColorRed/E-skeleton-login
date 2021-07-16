pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                sh "chmod +x -R Jenkins/jenkinBuild.sh"
                sh 'Jenkins/jenkinBuild.sh'
            }
        }
    }
}