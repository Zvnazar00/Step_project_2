pipeline {
    agent { label 'worker' }

    environment {
        GIT_REPO_URL     = 'https://github.com/Zvnazar00/Step_project_2.git'
        RUNNER_CONTAINER = 'test_runner'
        IMAGE_NAME       = 'zvnazar/my_node_app'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: GIT_REPO_URL
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        sh """
                            echo "Running tests in container"
                            docker compose up --abort-on-container-exit --exit-code-from ${RUNNER_CONTAINER}
                            docker compose stop || true
                        """
                    }
                }
            }
        }

        stage('Push Image to DockerHub') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
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
                expression { currentBuild.currentResult == 'FAILURE' }
            }
            steps {
                echo 'Tests failed'
            }
        }
    }
}
