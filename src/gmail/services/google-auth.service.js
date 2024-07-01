// import { Injectable } from '@nestjs/common';
// import { google, Auth } from 'googleapis';
// import { ConfigService } from '@nestjs/config';
// import * as path from 'path';
// import * as fs from 'fs/promises';
// import { authenticate } from '@google-cloud/local-auth';

// @Injectable()
// export class GoogleAuthService {
//     private oauth2Client;
//     private readonly SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
//     public readonly CREDENTIALS_PATH = path.join(process.cwd(), 'src/common/credentials.json');
//     public readonly TOKEN_PATH = path.join(process.cwd(), 'src/common/token.json');

//     constructor(private readonly configService: ConfigService) {
//         this.authorize().then(this.listLabels.bind(this)).catch(console.error);
//     }

//     private async loadSavedCredentialsIfExist() {
//         console.log("CREDENTIALS_PATH ===> ", this.CREDENTIALS_PATH);

//         // // const content = JSON.parse(await fs.readFile(this.CREDENTIALS_PATH, 'utf-8'));
//         // const content = await fs.readFile(this.TOKEN_PATH);
//         // console.log(" Credentials : ====> ", content)

//         // const credentials = JSON.parse(content);

//         // let resp = google.auth.fromJSON(credentials);
//         // console.log("Loaded Credentials : ====> ", resp)
//         // return resp;

//         try {
//             const content = await fs.readFile(this.TOKEN_PATH, 'utf-8');
//             const credentials = JSON.parse(content);
//             return google.auth.fromJSON(credentials);
//         } catch (err) {
//             return null;
//         }

//     }

//     private async saveCredentials(client) {
//         const content = await fs.readFile(this.CREDENTIALS_PATH);
//         //@ts-ignore
//         const keys = JSON.parse(content);
//         const key = keys.installed || keys.web;
//         const payload = JSON.stringify({
//             type: 'authorized_user',
//             client_id: key.client_id,
//             client_secret: key.client_secret,
//             refresh_token: client.credentials.refresh_token,
//         });
//         await fs.writeFile(this.TOKEN_PATH, payload);
//     }

//     public async authorize() {
//         let client = await this.loadSavedCredentialsIfExist();
//         if (client) {
//             return client;
//         }
//         client = await authenticate({
//             scopes: this.SCOPES,
//             keyfilePath: this.CREDENTIALS_PATH,
//         }) as unknown as Auth.OAuth2Client; // Cast to OAuth2Client

//         if (client.credentials) {
//             await this.saveCredentials(client);
//         }
//         return client;
//     }

//     public async listLabels(auth) {
//         const gmail = google.gmail({ version: 'v1', auth });
//         const res = await gmail.users.labels.list({
//             userId: 'me',
//         });
//         const labels = res.data.labels;
//         if (!labels || labels.length === 0) {
//             console.log('No labels found.');
//             return;
//         }
//         console.log('Labels:');
//         labels.forEach((label) => {
//             console.log(`- ${label.name}`);
//         });
//     }
// }


// // @Injectable()
// // export class GoogleAuthService {
// //   private oauth2Client;

// //   constructor(private readonly configService: ConfigService) {

// //     //  const content = JSON.parse(fs.readFile(path.join(process.cwd(), 'src/common/credentials.json'), 'utf-8'));

// //     const credentials = JSON.parse(
// //       fs.readFile(path.join(process.cwd(), 'src/common/credentials.json'), 'utf-8')
// //     );

// //     this.oauth2Client = new google.auth.OAuth2(
// //       credentials.web.client_id,
// //       credentials.web.client_secret,
// //       this.configService.get<string>('GMAIL_REDIRECT_URI')
// //     );
// //   }

// //   getAuthUrl() {
// //     const authUrl = this.oauth2Client.generateAuthUrl({
// //       access_type: 'offline',
// //       scope: ['email', 'profile', 'https://mail.google.com/'],
// //     });
// //     return authUrl;
// //   }

// //   async getToken(code: string) {
// //     const { tokens } = await this.oauth2Client.getToken(code);
// //     this.oauth2Client.setCredentials(tokens);
// //     return tokens;
// //   }

// //   setCredentials(tokens) {
// //     this.oauth2Client.setCredentials(tokens);
// //   }

// //   getOAuth2Client() {
// //     return this.oauth2Client;
// //   }
// // }
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://mail.google.com/'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '../../common/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '../../common/credentials.json');
//     public readonly TOKEN_PATH = path.join(process.cwd(), 'src/common/token.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        //     public readonly CREDENTIALS_PATH = path.join(process.cwd(), 'src/common/credentials.json');

        // console.log("Token Path ===> ", TOKEN_PATH)
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
    // console.log("Inside label ===> ", auth)
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
        console.log(`- ${label.name}`);
    });
}

//  authorize().then(listLabels).catch(console.error);

async function sendEmail(auth,) {
    let msg = 'TO:vysakhrbz@gmail.com\n' +
        'Subject: Test email functionality\n' +
        'Content-Type:text/html;charset=utf-8\n\n' +
        'Test gmail sended';
    const gmail = google.gmail({ version: 'v1', auth });
    const encodedMessage = Buffer.from(msg).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMessage
        }
    });
    console.log(res.data);
    return res.data;
}
// authorize().then(sendEmail).catch(console.error);

async function listMessages(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
    })
    console.log(res?.data.messages.length);

    res?.data?.messages.forEach(async (message) => {
        // let body = JSON.stringify(message?.payload?.body?.data)
        // let mailBody = new Buffer.from(body, "base64").toString();
        console.log("Inside loop ========> ", message)

        // const message =  await gmail.users.messages.get({
        //     userId: 'me',
        //     id: message.payload?.,
        // });
    })

    let latestMessageId = res.data.messages[0].id;
    console.log(latestMessageId);
    const message = await gmail.users.messages.get({
        userId: 'me',
        id: "latestMessageId",
    });
    console.log("Single Messafe : ", message);

    const body = JSON.stringify(message.data.payload.body.data);
    console.log("Parsed Body ====> ", body);
    let mailBody = new Buffer.from(body, "base64").toString();
    console.log("Mail body : ===>", mailBody);
    return mailBody;
}

authorize().then(listMessages).catch(console.error);



