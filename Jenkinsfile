pipeline {
    agent any
    
    environment {
        GHCR_REGISTRY = "ghcr.io"
        GHCR_USERNAME = "khaelano"
        GHCR_REPO = "threading-fe"
        GHCR_TAG = "main"
        DOCKER_IMAGE = "${GHCR_REGISTRY}/${GHCR_USERNAME}/${GHCR_REPO}:${GHCR_TAG}"
    }

    trigger {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                     url: 'https://github.com/khaelano/threading-fe.git', 
                     credentialsId: '2f59037e-d768-4781-aa33-a1d449812732'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to GHCR') {
            steps {
                withDockerRegistry([credentialsId: "f53ceb0d-433a-4b1a-a70f-819044804db2", url: "https://${GHCR_REGISTRY}"])  {
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