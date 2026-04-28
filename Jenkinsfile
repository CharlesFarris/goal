pipeline {
    agent none
    stages {
        stage('Build & Test') {
            agent {
                docker {
                    image 'oven/bun:1.3.13'
                }
            }
            steps {
                script {
                    sh 'bun install --frozen-lockfile'
                    sh 'bun run test:apps'
                    sh 'bun run typecheck'
                    sh 'bun run biome:ci'
                }
            }
        }
    }
}
