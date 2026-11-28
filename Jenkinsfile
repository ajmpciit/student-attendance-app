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

        stage('SonarQube Analysis') {
            tools {
        // Fill in the JDK name you configured in Global Tool Configuration
        jdk 'JDK21' 
         }
            environment {`
                scannerHome = tool 'SonarQube Scanner'
        }
             
        }
            // ONLY run on the main branch
            when { branch 'main' }
            steps {
                withSonarQubeEnv('SonarQube') {
                     // Assuming npx is available
                     sh 'npx sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            // ONLY run on the main branch
            when { branch 'main' }
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    // If the gate fails, stop the pipeline here. Do not build/archive.
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build') {
            // Run on develop and main
            when { anyOf { branch 'main'; branch 'develop' } }
            steps {
               withEnv(['NODE_ENV=production']) {
                sh 'npm run build'
            }
        }
    }

        stage('Archive Artifact') {
            // ONLY run on the main branch
            when { branch 'main' }
            steps {
                // Package the Dockerfile and the dist folder into a tarball named after the build number
                sh 'tar -czf react-app-${BUILD_NUMBER}.tar.gz Dockerfile dist'
                archiveArtifacts artifacts: "react-app-${BUILD_NUMBER}.tar.gz", fingerprint: true
            }
        }
    }
}