pipeline {
    agent any
    
    stages {
        stage("Dockerizing") {
            steps {
                echo "Building server..."
                script {
                    sh "curl -fsSL https://get.docker.com -o get-docker.sh"
                    sh "sh get-docker.sh"
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