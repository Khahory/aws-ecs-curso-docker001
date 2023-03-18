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
![img_3.png](docs%2Fimg_3.png)
![img_4.png](docs%2Fimg_4.png)

Configure environment, storage, monitoring, and tags for your task.
App environment: variables de entorno
Container size: si queremos que el contenedor tenga un tamaño específico ram, cpu, etc.
Task roles, network mode: define un rol que va asumir para poder conectarse a otros servicios de AWS (como S3, DynamoDB, etc.)
![img_5.png](docs%2Fimg_5.png)
![img_6.png](docs%2Fimg_6.png)
