https://www.youtube.com/watch?v=TRLK6ZNpjB8&t=85s

## 🚀 [CURSO AWS] - Tutorial AWS ECS 🐳 Docker en la nube - Parte 1

1 - Crear un repositorio de Docker en AWS ECR

Nos permite tener control de los usuarios que pueden acceder a nuestro repositorio de Docker, y también nos permite
tener un control de versiones de las imágenes que vamos a subir a nuestro repositorio.
![img.png](docs%2Fimg.png)


2 - Instalar CLI de AWS
    * crear un usuario en AWS IAM
    * asignarle permisos de administrador
    * descargar el archivo de credenciales
    * instalar AWS CLI
    * configurar AWS CLI con las credenciales descargadas
https://stackoverflow.com/questions/70393195/get-ecrlogincommand-is-not-recognized-as-the-name-of-a-cmdlet-function-scrip
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html


3 - Push commands for test-ecs

Comandos para subir la la imagen de Docker a nuestro repositorio de AWS ECR
(docker pull nginx:latest)

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com
docker build -t test-ecs .
docker tag nginx:latest xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/test-ecs:1
docker push xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/test-ecs:1
```

4 - Crear un cluster de ECS
NOTA:
El cluster de ECS es un grupo de instancias EC2 que van a ejecutar nuestros contenedores de Docker.
Podemos crear tareas, cada tarea es un conjunto de contenedores que se ejecutan en un cluster de ECS.
Tenemos 2 formas de crear un cluster de ECS:
    * Crear un cluster de ECS con instancias EC2 (servicio de AWS que nos permite crear instancias virtuales)
    * Crear un cluster de ECS con instancias Fargate (servicio de AWS que nos permite ejecutar contenedores 
        sin tener que crear instancias EC2) (recomendado)
VPC: Virtual Private Cloud
![img_1.png](docs%2Fimg_1.png)
![img_2.png](docs%2Fimg_2.png)

5 - Crear una tarea en ECS y ponerla en nuestro cluster
NOTA: tenemos que crear un task definition, que es un conjunto de contenedores que se ejecutan en un cluster de ECS. 
(fijate que la URI tenga el mismo nombre que el repositorio de ECR)
![img_3.png](docs%2Fimg_3.png)
![img_4.png](docs%2Fimg_4.png)

Configure environment, storage, monitoring, and tags for your task.
App environment: variables de entorno
Container size: si queremos que el contenedor tenga un tamaño específico ram, cpu, etc.
Task roles, network mode: define un rol que va asumir para poder conectarse a otros servicios de AWS (como S3, DynamoDB, etc.)
![img_5.png](docs%2Fimg_5.png)
![img_6.png](docs%2Fimg_6.png)

6 - Crear un servicio en ECS
NOTA:
**ENI** son las siglas de Elastic Network Interface, que se traduce como Interfaz de Red Elástica en español. 
En Amazon Web Services (AWS), una ENI es una interfaz de red virtual que puede asociarse con una instancia de 
Amazon Elastic Compute Cloud (EC2).

Una ENI se puede pensar como una tarjeta de red virtual que se puede configurar con una dirección IP privada, 
una dirección IP pública y otras características de red. Se pueden crear varias ENI en una instancia EC2 y cada ENI 
puede estar conectada a una subnet de una VPC (Virtual Private Cloud) diferente.

Las ENI ofrecen una gran flexibilidad en la configuración de red de las instancias EC2 en AWS. Por ejemplo, se pueden 
configurar múltiples ENI con diferentes direcciones IP y asignarles diferentes roles y permisos de seguridad. También 
se pueden utilizar para implementar soluciones de alta disponibilidad y balanceo de carga de red, entre 
otras funcionalidades.
![img_8.png](docs%2Fimg_8.png)
![img_7.png](docs%2Fimg_7.png)


7 - En security groups, agregar reglas para poder acceder a nuestro servicio
![img_9.png](docs%2Fimg_9.png)
![img_10.png](docs%2Fimg_10.png)


8 - Vamos a crear nueva versión de nuestra imagen de Docker
```bash
docker build -t test-ecs .
docker tag nginx:latest xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/test-ecs:2
docker push xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/test-ecs:2
```

9 - Actualizar la tarea en ECS
NOTA: agregar nuevo URI de la nueva versión de la imagen de Docker
![img_11.png](docs%2Fimg_11.png)

## 🚀 [CURSO AWS] - Tutorial AWS ECS 🐳 Docker en la nube - Parte 2
NOTA:
Vamos a crear servicios que **AUTOESCLANE** en AWS ECS
CLuster: es donde reside nuestro servicio
Repository: es donde se encuentra la imagen de Docker
Task definition: es donde se encuentra la configuración de nuestro servicio

Lo que hice:
Push de la imagen de Docker a AWS ECR
Crear nueva tarea definición en ECS
Crear nuevo servicio en ECS

1 - Creando el servicio en ECS con load balancer (ALB)
NOTA:
Creamos 2 replicas (Desired tasks)
Load balancer: Application Load Balancer
    Port mapping: 80:80 (hacerle saber al ALB como conectrase a nuestro contenedor)
Health check path: / (ruta para hacer el health check, o sea, para saber si el contenedor está vivo)
Health check grace period: 30 (tiempo que va a esperar el ALB para hacer el health check)

2 - Crear los security groups para el ALB y el servicio
    security groups para el servicio: todo lo que venga por el ALB, podra acceder al servicio
    ![img_13.png](docs%2Fimg_13.png)

    security groups para el ALB: todo lo que venga por el internet, podra acceder al ALB
    ![img_12.png](docs%2Fimg_12.png)

3 - Crear un nuevo servicio en ECS (no podemos actualizar el servicio anterior, porque no podemos cambiar 
el SG de la tarea definición)
NOTA:
Todo igual, 2 replica y eso, pero ahora usamos nuestro nuevo security group para el servicio y el ALB
![img_14.png](docs%2Fimg_14.png)
![img_15.png](docs%2Fimg_15.png)
Podemos cambiar el security group del ALB en EC2->loadbalancer, pero no podemos cambiar el security group de la tarea definición
