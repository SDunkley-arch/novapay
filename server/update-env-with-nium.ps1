$envContent = @"
DATABASE_URL=postgresql://postgres:RegalGold@@123@localhost/NovaPay
JWT_SECRET=11d73c9d9149c1b82fe1e2047d34b8e7a112040b2658d5e20e5bb62a04084baad90c83ce2114ac98bbcacd82d4dfd0cd02ed8ecd4f11cbab8668598c4bc35be4
NODE_ENV=production
PORT=8080
NIUM_CLIENT_ID=6cf64e73-e35f-469b-93db-3f860a2b1c0d
NIUM_API_KEY=Mf4JwffXR32y8rOsrtVva8uI8g7p6iJW40UA2KLu
NIUM_BASE_URL=https://gateway.nium.com/api
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
