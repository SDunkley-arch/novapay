Write-Host "Running NovaPay API Verification..." -ForegroundColor Cyan

node verify-api.js --name "NovaPay Full API & CORS Validation" `
--target "http://localhost:8080" `
--paths "/auth/login" "/auth/register" "/wallet/balances" "/wallet/transactions" "/transfers/p2p" "/bills/pay" "/health" "/debug" `
--methods "POST" "GET" `
--headers "Content-Type:application/json" `
--origins "http://localhost:8081" "http://10.0.2.2:8081" `
--assert "status==200 || status==400 || status==401 || status==409" `
--assert "hasHeader('Access-Control-Allow-Origin')" `
--assert "contentType.startsWith('application/json')" `
--timeout 5000ms `
--save-report "novapay_cors_auth_report.json"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Verification completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Verification failed with exit code $LASTEXITCODE" -ForegroundColor Red
}
