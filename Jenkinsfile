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
        // Não conseguimos fazer pelo docker in a docker que estamos utilizando
        stage ("Deploy Kubernetes") {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'kubectl apply -f ./deployment.yaml'
                }
            }
        }
    }
}