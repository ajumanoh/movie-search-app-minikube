# movie-search-app-minikube

Implemented the application movie-search-app-local using kubernetes. Tested using minikube

Docker image for the applicaiton is present in https://hub.docker.com/repository/docker/ajumanoh/movie-search-app. 
PostgreSQL DB is deployed using public postgres image.

Features of the application -

1. Users would be able to search any movie name. List of movies of movies would be diaplayed as image.
2. Users can click the image to pull videos related to the movie.
3. If API - https://www.themoviedb.org/ returns a movie id. Related youtube video would be embedded in the page.
4. Users can sign up. Can sign in if already registered.
5. If an already registered user tries to sign up again. User would be asked to sign in.
6. Password and form validations are handled in HTML code.
7. Password/ Confirm password should match. Else user would be alerted.
8. Hashed password is stored in postgres DB for security. Implemented using bcrypt.

Technologies used - HTML, CSS, Javascript, node js and postgreSQL DB.

Steps to create App usig Kubernetes -

1. Clone repository
2. Install - minikube. As minikube runs in a VM requires hypervisor like hyperkit. 
3. Execute - minikube start.
4. To run docker demon in minikube run - eval $(minikube docker-env) 
5. Now you can execute all docker commands in pointing to minikube.
6. Create configmap by executing - kubectl create -f postgres-configmap.yaml 
7. Deploy database container first. use pgdeployment.yaml. Command - minikube kubectl -- apply -f deployment.yaml
8. Deploy app container next. Use deployment.yaml. Command - minikube kubectl -- apply -f pgdeployment.yaml
9. Check if all pods are up by executing "kubectl get pods".
10. To delete pods and services execute kubectl delete --all deployments and kubectl delete --all svc
