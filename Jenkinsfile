pipeline {
    agent any
    
    stages {
        stage("Dockerizing") {
            steps {
                echo "Building server..."
                script {
                    sh "curl https://stackoverflow.com/questions/51492967/how-catch-curl-response-into-variable-in-jenkinsfile"
                }
            }
        }
        stage("Setting server") {
            steps {
                echo "Building server..."
                nodejs('Node') {
                    sh 'npm install'
                }
            }
        }
        stage("Testing server") {
            steps {
                echo "Runing tests..."
            }
        }
    }
}