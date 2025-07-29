pipeline {
    agent any  

    environment {
        GIT_REPO_URL = 'https://github.com/Zvnazar00/flask_api_devops.git'
        RUNNER_CONTAINER = 'test_runner'
    }

    stages {

        stage('SCM Checkout') {
            steps {
                git branch: 'main',
                    url: GIT_REPO_URL
            }
        }

        // 2. Run Docker Compose Tests
        stage('Docker Compose Build') {
            steps {
                script {
                    sh """
                        echo "Running docker compose tests for node api"
                        echo "--------------------------------------------"
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
}