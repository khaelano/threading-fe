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
    stage('Build & Push Image') {
      steps {
        withCredentials([string(credentialsId: 'ghcr-token', variable: 'GH_TOKEN')]) {
          sh '''
            echo "$GH_TOKEN" | docker login ghcr.io -u khaelano --password-stdin
            docker build -t $IMAGE:$BUILD_NUMBER .
            docker tag $IMAGE:$BUILD_NUMBER $IMAGE:latest
            docker push $IMAGE:$BUILD_NUMBER
            docker push $IMAGE:latest
          '''
        }
      }
    }
    stage('Deploy to Swarm') {
      steps {
        withCredentials([string(credentialsId: 'ghcr-token', variable: 'GH_TOKEN')]) {
          sh '''
            echo "$GH_TOKEN" | docker login ghcr.io -u khaelano --password-stdin
            docker stack deploy -c docker-stack.yml your_stack_name --with-registry-auth
          '''
        }
      }
    }
  }
}
