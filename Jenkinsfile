pipeline {
  agent {
    docker { image 'node:22.16.0-alpine3.22' }
  }
  environment {
    IMAGE = "ghcr.io/khaelano/threading-fe"
  }
  stages {
    stage('Test') {
      steps {
        sh 'node --eval "console.log(process.platform,process.env.CI)"'
      }
    }
  }
}
