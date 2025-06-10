pipeline {
  agent any

  environment {
    IMAGE_NAME = "ghcr.io/khaelano/threading-fe"
    IMAGE_TAG = "main"
    DOCKER_CREDENTIALS_ID = "ghcr-token"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
        }
      }
    }

    stage('Login to GHCR') {
      steps {
        withCredentials([string(credentialsId: env.DOCKER_CREDENTIALS_ID, variable: 'GHCR_TOKEN')]) {
          sh "echo $GHCR_TOKEN | docker login ghcr.io -u khaelano --password-stdin"
        }
      }
    }

    stage('Push Image to GHCR') {
      steps {
        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
      }
    }
  }

  post {
    always {
      sh 'docker logout ghcr.io || true'
    }
  }
}
