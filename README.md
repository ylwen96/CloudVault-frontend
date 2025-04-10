# CloudVault-frontend

CloudVault front-end app

## Authors

- [@Yuelin Wen](https://www.github.com/yuelin-wen)

## Project Description

Introducing a cutting-edge cloud-based microservice meticulously designed to cater to the needs of both companies and users seeking a robust system for efficient fragment data management. This sophisticated service empowers users with the essential functionalities of creating, reading, updating, and deleting fragments, thereby facilitating a comprehensive approach to handling fragmented data.

All of the data are stored and secured by AWS S3. The user pool is protected by AWS Cognito. The service is deployed in the AWS cloud.

## Fragment supported type

A fragment is defined in the following formats:

| Name          | Type                | Extension |
| ------------- | ------------------- | --------- |
| Text Plain    | `text/plain`        | `.txt`    |
| Text Markdown | `text/markdown`     | `.md`     |
| Text HTML     | `text/html`         | `.html`   |
| JSON data     | `application/json`  | `.json`   |
| PNG Image     | `image/png`         | `.png`    |
| JPEG Image    | `image/jpeg`        | `.jpg`    |
| WebP Image    | `image/webp`        | `.webp`   |
| GIF Image     | `image/gif`         | `.gif`    |

## App Demo

Youtube Link: https://youtu.be/gQXxX0mSVQc

(Hint: The user has to follow the AWS Cognito user authentication process, Please sign up with a real email to receive a verification code. You are also welcome to watch my demo presentation on YouTube)

## API URL
 (Note: Due to AWS ec2 fees, not available currently)
 
Backend API: [https://github.com/yuelin-wen/fragments-backend](https://github.com/yuelinwen/CloudVault-backend)

## Installation
Install npm dependencies
 
 ```bash
   npm init
 ```
 Create .env file, paste environment variables info and place it under root folder
 ```bash
   touch .env
 ```
 Start project
 ```bash
   npm start
 ```

## Preview

File list

![image](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/59961b03-f4ce-437a-9c01-53d25bf2ca72)

Create File

![WX20230913-122350](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/c9e39091-11e3-41ae-b77a-c2b8349dbc2c)

Read file (Update/Delete)

![WX20230913-122407](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/dfe87dab-50c0-49df-84d8-2906b21c036e)

## Contact

If you have any questions, please feel free to email weny36@mcmaster.ca






