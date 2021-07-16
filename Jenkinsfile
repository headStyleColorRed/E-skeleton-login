pipeline {
    agent any
    tools {
        nodejs "node"
    }
    stages {
        stage("build") {
            steps {
                npm install
            }
        }
        stage("test") {
            steps {
                npm test
            }
        }
    }
}