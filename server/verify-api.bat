@echo off
echo Running NovaPay API Verification...
node verify-api.js --name "NovaPay Full API & CORS Validation" ^
--target "http://localhost:8080" ^
--paths "/auth/login" "/auth/register" "/wallet/balances" "/wallet/transactions" "/transfers/p2p" "/bills/pay" "/health" "/debug" ^
--methods "POST" "GET" ^
--headers "Content-Type:application/json" ^
--origins "http://localhost:8081" "http://10.0.2.2:8081" ^
--assert "status==200 || status==400 || status==401 || status==409" ^
--assert "hasHeader('Access-Control-Allow-Origin')" ^
--assert "contentType.startsWith('application/json')" ^
--timeout 5000ms ^
--save-report "novapay_cors_auth_report.json"

if %ERRORLEVEL% EQU 0 (
  echo Verification completed successfully!
) else (
  echo Verification failed with exit code %ERRORLEVEL%
)
