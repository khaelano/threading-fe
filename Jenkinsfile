pipeline {
    agent any
    
    environment {
        GHCR_REGISTRY = "ghcr.io"
        GHCR_USERNAME = "khaelano"
        GHCR_REPO = "threading-fe"
        GHCR_TAG = "main"
        DOCKER_IMAGE = "${GHCR_REGISTRY}/${GHCR_USERNAME}/${GHCR_REPO}:${GHCR_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                     url: 'https://github.com/khaelano/threading-fe.git', 
                     credentialsId: 'fb540177-949b-4a58-aeaf-1a22cfd5e26c'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to GHCR') {
            steps {
                withDockerRegistry([credentialsId: "fb540177-949b-4a58-aeaf-1a22cfd5e26c", url: "https://${GHCR_REGISTRY}"])  {
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                sh 'docker service update --image $DOCKER_IMAGE jenkins_frontend'
            }
        }
    }
}