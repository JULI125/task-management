import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../firebase/Service-Account-key.json";  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export default admin;