pipeline {
  agent any

  environment {
    IMAGE_NAME = "ghcr.io/khaelano/threading-fe"
    IMAGE_TAG = "main"
    DOCKER_CREDENTIALS_ID = "github-token"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/khaelano/threading-fe.git', branch: 'main'
        sh 'pwd && ls -al && git rev-parse --is-inside-work-tree'
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
    
    stage('Redeploy stack') {
      steps {
        sh "docker image rm ghcr.io/khaelano/threading-fe:main || true"
        sh "docker stack deploy -c docker-compose.yml threading-jenkins"
      }
    }
  }

  post {
    always {
      sh 'docker logout ghcr.io || true'
    }
  }
}
