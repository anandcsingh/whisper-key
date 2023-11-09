import path from "path";
import { CredentialMetadata } from "../CredentialMetadata.js";
import { Storage } from "@google-cloud/storage"

export class ContractCloudStorage {
    
  storeContractFile(creds: CredentialMetadata) {
    
    const credentialPath = path.resolve(`public/credentials/${creds.name}Contract.js`);
    this.uploadFile(credentialPath, `credentials/${creds.name}Contract.js`);
  
    }
  
    storeContractBundle(creds: CredentialMetadata) {
      
      const bundledPath = path.resolve(`public/credentials/bundled/${creds.name}Contract.js`);
      this.uploadFile(bundledPath, `credentials/bundled/${creds.name}Contract.js`);    
    
      }
  
  
    uploadFile(path: string, destination: string) {
      const storage = new Storage({
        projectId: "whisper-key",
        credentials: {
            client_email: "firebase-adminsdk-9t58g@whisper-key.iam.gserviceaccount.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCsOOnuecrf2gNK\nx8XFBJ/sos5KuIBd2cuvFyNDyQCkWAQi91GLnZs+EKlJv5IeTbSKhdwxBHk8oJk6\nUqyMmDmsdoXG+SQ2CezRDU1aVoVAaEbMc50jBl1fA42sJBgW8B9x+LfZrDPeEArd\nypc86yo/DnDphQ4fK5qNAFreT/p2B8zGQDzG/PvIJpFP44jjiGYApNgQHSJkgmZ1\nt5vJlYEYl0enFEZPL1fmt9ap62E3Vb7KwIasq8ct07FSiGL+H/Xt7q4r20Px5/j+\nDHnFCVJc74aOMpdO/J+w7icxhsuFdxP5stpi9cwM6bRwe2dSCKDpay6StXDx3lN2\nmoTOCPMjAgMBAAECggEACGiiT1ul9/uyiR5WPdIwfBgk317BHGlLucmflf8vPKxJ\neMA/kdleS4+lBwNHVJscU150IPaOyX2D4xDx+M6z6Njum4eYPi/fiVjPa+I+kPr7\nvfQaeivPjO86UGsrZpn5xxGgPwyv3vSZ5eNZiAa+t3kdMoxQY12N0brwijCN0jZn\nGln8BhO2JXkOdOLTsT2iR/51bcRYfOtCNnGBc5GGtt1VywQe28aq5ikVCAt6gG6V\n+sWVE7J+z2PpyG8uMZJQUNayJ6eIajc8ts0hXQqtc8ZE5pv5wTWB0sCtOadkw7P0\noGoUSSwkfzHSK9uWOINFRbUhlcUwaTYJcY3hnKWkLQKBgQDXsD+buQGgFqfUQ+OW\nCxOEmGnpvEWjMY9WOqbYf6iIaL039nqlw1xUEW5B0H/4c43OP7Lipf3J1WjY/tOH\ns1tIJTwcvm78BZkoWB6Ltk0JP7vr99qsHbIDMXYXueYxbujD4eoTUkkkP774o4SH\nJdDQsmSegkaTL1yfuJnT588zdwKBgQDMaP/yG3UDaEZoaDVmAZDhVIsWhl5/MPFm\nQlCnkyGa2cv0YVzmkkoIqRYtP0Awn1GbcYbpmBFvKRO4T5Nq/9gCRP8USUXR7+Hv\nWnU6/pWvH4tC1Rpu3VicBhbe1pwFgzy/uPMVcvccyzwXhkKRETsLReoEkkxDZlUq\n3HHpCIbwtQKBgQDPgA7huE2Y/tK9AgcMDWHcmWijZe40vvQfx9NFyyKPAPywvx5l\nJJpJgm9pP7YthrWw61UkeP68UuRIhndoQKObt76qBIbvTE95IbVZQavBLyCSNeOY\n3ASqz8XFs6GCgynJcSjpJ6uYBP+rYlyYTEgkzsrAN6K/7LuWKVlMJOIQpwKBgQDK\nBJO/sUcqAOpk0WjE0ZNgPu/faRkHV1WcnLmdhBnYMpwRgBASiE3G1WVnfnVwGGTM\n3ZxaTMIePFiS9YJaY1QWmh4G7Iumeg+vQJVPosBIfUJi4L3pB7VFLfd4cF1uTU/C\no4UKk76JpIpVLYmoWYEjGQu5TOU2T3Kok4m4p4bFaQKBgQCFSElPxKwVREFMB37Y\nBe1RcYRCxrO3kuFxmROH74HAJUpaR7u49Sfi6Q40yXfWqN7Pd1zruocT97KqEshX\nvQWTn3QusraJuJLGBLpSwy//JtmUhlTwcTuzdu3K5XdS7jZwvXjH7d6gBJuJti9s\nK/l2HZobx9lovxvtqM0vw1YXfw==\n-----END PRIVATE KEY-----\n"?.split(String.raw`\n`).join("\n"),
        },
    });
    const bucket = storage.bucket("gs://whisper-key.appspot.com");
    bucket.upload(path, { destination: destination });
    }
}