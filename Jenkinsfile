pipeline {
    agent any
    
    stages {
        stage("build") {
            steps {
                echo "Building server..."
                nodejs('Node') {
                    sh 'npm install'
                }
            }
        }
        stage("test") {
            steps {
                echo "Runing tests..."
            }
        }
    }
}