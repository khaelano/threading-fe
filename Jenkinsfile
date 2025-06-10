pipeline {
  agent any
  environment {
    IMAGE = "ghcr.io/khaelano/threading-fe"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage ('Build Image') {
        steps {
            script {
                dockerImage = docker.build('$IMAGE:$BUILD_NUMBER')
            }
        }
    }
  }
}
