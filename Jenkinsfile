pipeline {
    agent any
    
    stages {
        stage("Setting server") {
            steps {
                echo "Building server..."
                nodejs('Node latest') {
                    sh 'npm install && npm run docker'
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