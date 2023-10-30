pipeline{
    agent any

    stages {
        stage ('Inicial'){
            steps {
                echo "Iniciando a pipeline"
            }
        }

        stage ('Build Image'){
            steps {
                script {
                    dockerapp = docker.build("matheusmprado/simpleproject:v${env.BUILD_ID}","-f ./dockerfile ./")
                }
            }
        }

        stage ('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push('lts')
                        dockerapp.push("v${env.BUILD_ID}")
                        /* Remove docker image*/
                        sh "docker rmi -f matheusmprado/simpleproject:v${env.BUILD_ID}"
                    }
                }
            }
        }

        stage ("Deploy Kubernetes") {
            steps {
                
                    sh 'kubectl apply -f ./deployment.yaml'
                
            }
        }
    }
}