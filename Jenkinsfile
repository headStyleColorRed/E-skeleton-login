pipeline {
    agent any
    
    stages {
        stage("Setting Database") {
            steps {
                echo "Building database..."
                sh "docker ps"
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