pipeline {
  agent any
  triggers {
    githubPush() // Use this if you configure webhook manually
  }
  environment {
    GH_USER = credentials('ghcr-credentials').username
    GH_TOKEN = credentials('ghcr-credentials').password
    IMAGE = "ghcr.io/${GH_USER}/threading-fe"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build & Push') {
      steps {
        sh '''
          echo "${GH_TOKEN}" | docker login ghcr.io -u "${GH_USER}" --password-stdin
          docker build -t $IMAGE:$BUILD_NUMBER .
          docker tag $IMAGE:$BUILD_NUMBER $IMAGE:latest
          docker push $IMAGE:$BUILD_NUMBER
          docker push $IMAGE:latest
        '''
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          echo "${GH_TOKEN}" | docker login ghcr.io -u "${GH_USER}" --password-stdin
          docker stack deploy -c docker-stack.yml threading --with-registry-auth
        '''
      }
    }
  }
}
