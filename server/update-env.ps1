$envContent = @"
DATABASE_URL=postgresql://postgres:RegalGold@@123@localhost/NovaPay
JWT_SECRET=11d73c9d9149c1b82fe1e2047d34b8e7a112040b2658d5e20e5bb62a04084baad90c83ce2114ac98bbcacd82d4dfd0cd02ed8ecd4f11cbab8668598c4bc35be4
NODE_ENV=production
PORT=8080
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
