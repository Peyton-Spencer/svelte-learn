import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import {
  client_email,
  private_key,
  project_id,
} from "$lib/server/service-account.json";
import pkg from "firebase-admin";

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: project_id,
      clientEmail: client_email,
      privateKey: private_key,
    }),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error("Firebase Admin Error: ", err.stack);
  }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
