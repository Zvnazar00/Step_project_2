pipeline {
    
    agent { label 'worker' }

    environment {
        GIT_REPO_URL     = 'https://github.com/Zvnazar00/Step_project_2.git'
        RUNNER_CONTAINER = 'test_runner'
        IMAGE_NAME       = 'zvnazar/my_node_app'
    }

    stages {

        stage('SCM Checkout') {
            steps {
                git branch: 'main', url: GIT_REPO_URL
            }
        }

        stage('Docker Compose Build & Test') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        sh """
                            echo "Running docker compose tests for node api"
                            docker compose stop || true
                            docker compose build --no-cache
                            docker compose up --abort-on-container-exit --exit-code-from ${RUNNER_CONTAINER}
                            echo "Tests finished"
                            docker compose stop || true
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag my_node_app ${IMAGE_NAME}
                        docker push ${IMAGE_NAME}
                    '''
                }
            }
        }

        stage('Handle Failed Tests') {
            when {
                expression { currentBuild.result == 'FAILURE' }
            }
            steps {
                echo 'Tests failed'
            }
        }
    }
}
