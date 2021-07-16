pipeline {
    agent any
    
    stages {
        stage("Dockerizing") {
            steps {
                echo "Building server..."
                script {
                    sh "apt-get update"
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