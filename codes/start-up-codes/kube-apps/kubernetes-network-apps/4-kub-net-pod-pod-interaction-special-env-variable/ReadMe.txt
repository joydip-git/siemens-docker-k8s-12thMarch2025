In case of pod to pod interaction, you can find out the internal IP address used by auth-service by running: kubectl get services
NAME            TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
-------------------------------------------------------------------------
auth-service    ClusterIP      10.104.230.91    <none>        3000/TCP         17m
---------------------------------------------------------------------------
kubernetes      ClusterIP      10.96.0.1        <none>        443/TCP          43h
---------------------------------------------------------------------------
users-service   LoadBalancer   10.104.252.195   <pending>     3001:30216/TCP   4m37s
---------------------------------------------------------------------------

Now you can supply the auth-service exposed IP address (10.104.230.91) as the value for "AUTH_ADDRESS" environment variable in users-deployment.yaml file.

the container running the users-api application in the "users-api" pod, will be able to connect using "10.104.230.91:3000" with the container running the auth-api application in the "auth-api" pod

also the kubernetes provides an auto-generated environment variable for every pod which holds the internal IP address of the pod. the naming convention of the environment variable is <SERVICE-NAME>_SERVICE_HOST.
if the SERVICE-NAME contains an hyphen (-), then that will be changed to underscore (_). such as, "auth-service" (name of the service in the auth-service.yaml file) will become AUTH_SERVICE and the name of environment variable will be theh AUTH_SERVICE_SERVICE_HOST (SERVICE_HOST suffix will be always added)
you can directly access this particular environment variable in your code 
process.env.AUTH_SERVICE_SERVICE_HOST => will give you the same IP address: 10.104.230.91 