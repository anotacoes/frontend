pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run lint'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
                echo 'Pipeline finalizado!'
            }
        }
    }
}
