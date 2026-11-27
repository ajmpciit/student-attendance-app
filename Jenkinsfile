pipeline {
    agent any

    tools {
        // This must match the NodeJS tool name configured in Jenkins (e.g., 'node20')
        nodejs 'nodejs' 
    }

    environment {
        // Ensure the app uses the CI environment
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins pulls the specific branch it is currently running
                checkout scm
            }
        }

        stage('Install and Test') {
            steps {
                // Using npm install instead of npm ci to bypass the peer dependency issues
                sh 'npm install --legacy-peer-deps'
                sh 'npm run test:coverage'
                sh 'npm install --include=dev'
            }
        }

        stage('Generate Coverage') {
            steps {
                // Save the coverage report so it can be seen in Jenkins
                archiveArtifacts artifacts: 'coverage/lcov.info', allowEmptyArchive: false
            }
        }
    }
}