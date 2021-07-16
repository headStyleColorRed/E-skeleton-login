pipeline {
    agent any
    
    stages {
        stage("Setting Database") {
            steps {
                echo "Building database..."
                sh "docker container run -d --rm -p 27017:27017 mongo"
            }
        }
        stage("Setting server") {
            steps {
                echo "Building server..."
                nodejs('Node latest') {
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