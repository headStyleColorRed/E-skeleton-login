pipeline {
    agent {
        docker {
            image 'mongo:latest'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    
    stages {
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