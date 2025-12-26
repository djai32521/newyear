import { obfuscate } from '../utils/crypto';
import fs from 'fs';
import path from 'path';

// Manual simple dotenv parser to avoid dependency issues if dotenv not installed
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        const key = match[1].trim();
        console.log("OBFUSCATED_KEY=" + obfuscate(key));
    } else {
        console.error("GEMINI_API_KEY not found in .env");
    }
} else {
    console.error(".env file not found");
}
