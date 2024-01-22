# Examen Tecnico Backend

## Demo

[Live Demo](https://culqi-tech-frontend-test-nedddp1jf-renzott.vercel.app/)

[Codigo Fuente](https://github.com/Renzott/culqi-tech-frontend-test)
# Endpoints

Recomedable usar los valores de cada endpoint en el demo.

Entorno Actual: **Dev**

```bash
# POST /dev/login
{
    "username": "culqi",
    "password": "strongpassword"
}
```

```bash
# GET /dev/tokenization
Headers
{
    Authorization: token 
}

Body
{
    "card_number": 4513404738291604,
    "ccv": 123,
    "expiration_month": "01",
    "expiration_year": "2025",
    "email": "usuario@gmail.com"
}
```

```bash
# GET /dev/getCard
Headers
{
    Authorization: token_card
}
```

## Tecnologías utilizadas

### Backend
- Node.js
- Typescript
- Serverless Framework
- AWS Lambda
- AWS DynamoDB

### Frontend
- Next
- Vercel
- TailwindCSS
- Typescript
- Zustand
- shadcn/ui

## Instalación

```bash
$ pnpm install
or
$ npm install

```

## Ejecución

```bash
# Al correr el proyecto, va a pedirte las credeneciales de AWS para poder generar el proyecto.
$ serverless deploy

# Offline, se debe tener Java instalado. para correr DynamoDB localmente. Revisar src/libs/dynamo.ts para ver la configuración local.
$ serverless offline start
```
