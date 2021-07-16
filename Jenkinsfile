pipeline {
    agent any
    tools {
        nodejs "node"
    }
    stages {
        stage("build") {
            steps {
                npm -v
            }
        }
        stage("test") {
            steps {
                echo "Testing"
            }
        }
    }
}