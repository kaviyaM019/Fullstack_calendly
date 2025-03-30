import {nylas, nylasConfig} from '@/libs/nylas'
import { session } from "@/libs/session";
import { NextApiRequest } from 'next';
import { redirect } from 'next/navigation';
export async function GET(req: NextApiRequest) {
    console.log("Received callback from Nylas");
    const url = new URL (req.url as string);
    const code = url.searchParams.get("code");

    

    if(!code) {
        return Response.json("No authorization code returned from Nyles",{status: 400});
        
    }

    const codeExchangePayload = {
        clientSecret: nylasConfig.apiKey,
        clientId: nylasConfig.clientId,
        redirectUri: nylasConfig.callbackUri,
        code,

    };

    
    const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
    const { grantId ,email} = response;

    await session().set('grantId', grantId);
    await session().set('email', email);

    redirect('/');

    

}

// import { nylas, nylasConfig } from '@/libs/nylas'
// import { session } from "@/libs/session";
// import { NextRequest } from 'next/server';  // Change this import
// import { redirect } from 'next/navigation';  // Add this import

// export async function GET(req: NextRequest) {  // Change to NextRequest
//     console.log("Received callback from Nylas");
//     const url = new URL(req.url);
//     const code = url.searchParams.get("code");

//     if(!code) {
//         return Response.json("No authorization code returned from Nyles",{status: 400});
//     }

//     const codeExchangePayload = {
//         clientSecret: nylasConfig.apiKey,
//         clientId: nylasConfig.clientId,
//         redirectUri: nylasConfig.callbackUri,
//         code,
//     };

//     const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
//     const { grantId, email } = response;

//     await session().set('grantId', grantId);
//     await session().set('email', email);

//     return redirect('/');  // Add return statement
// }

    


// import {nylas, nylasConfig} from "@/libs/nylas";
// import {session} from "@/libs/session";
// import {ProfileModel} from "@/models/Profile";
// import mongoose from "mongoose";
// import {redirect} from "next/navigation";
// import {NextRequest} from "next/server";

// export async function GET(req: NextRequest) {
//   console.log("Received callback from Nylas");
//   const url = new URL(req.url as string);
//   const code = url.searchParams.get('code');

//   if (!code) {
//     return Response.json("No authorization code returned from Nylas", {status: 400});
//   }

//   const codeExchangePayload = {
//     clientSecret: nylasConfig.apiKey,
//     clientId: nylasConfig.clientId as string,
//     redirectUri: nylasConfig.callbackUri,
//     code,
//   };

//   const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
//   const { grantId, email } = response;

//   await mongoose.connect(process.env.MONGODB_URI as string);

//   const profileDoc = await ProfileModel.findOne({email});
//   if (profileDoc) {
//     profileDoc.grantId = grantId;
//     await profileDoc.save();
//   } else {
//     await ProfileModel.create({email, grantId});
//   }

//   await session().set('email', email);

//   redirect('/');
// }