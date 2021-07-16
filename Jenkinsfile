// pipeline {
//     agent {
//         docker {
//             image 'node:6-alpine'
//             args '-p 3000:3000'
//         }
//     }

//     stages {
//         stage("build") {
//             steps {
//                  sh "chmod +x -R Jenkins/jenkinBuild.sh"
//                 sh 'Jenkins/jenkinBuild.sh'
//             }
//         }
//     }
// }

pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sudo apt-get update
            }
        }
    }
}