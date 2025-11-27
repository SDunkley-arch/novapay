# NovaPay API Verification Tool

This tool allows you to verify that the NovaPay API endpoints are working correctly and properly configured for CORS.

## Prerequisites

- Node.js installed
- NovaPay API server running (default: http://localhost:8080)

## Usage

### Using the provided scripts

#### Windows Command Prompt
```
verify-api.bat
```

#### PowerShell
```
.\verify-api.ps1
```

### Manual execution
```
node verify-api.js --name "NovaPay Full API & CORS Validation" \
--target "http://localhost:8080" \
--paths "/auth/login" "/auth/register" "/wallet/balances" "/wallet/transactions" "/transfers/p2p" "/bills/pay" "/health" "/debug" \
--methods "POST" "GET" \
--headers "Content-Type:application/json" \
--origins "http://localhost:8081" "http://10.0.2.2:8081" \
--assert "status==200 || status==400 || status==401 || status==409" \
--assert "hasHeader('Access-Control-Allow-Origin')" \
--assert "contentType.startsWith('application/json')" \
--timeout 10s \
--save-report "novapay_cors_auth_report.json"
```

## Parameters

- `--name`: Name of the verification test
- `--target`: Base URL of the API server
- `--paths`: List of API endpoints to test
- `--methods`: HTTP methods to test (GET, POST, etc.)
- `--headers`: Request headers to include
- `--origins`: Origins to test CORS with
- `--assert`: Assertions to validate responses
- `--timeout`: Request timeout (default: 10s)
- `--save-report`: Filename to save the JSON report

## Assertions

The tool supports the following assertion types:

1. Status code: `status==200 || status==400`
2. Headers: `hasHeader('Access-Control-Allow-Origin')`
3. Content type: `contentType.startsWith('application/json')`

## Report

The verification results are saved to the specified JSON file, containing:

- Test name and timestamp
- Target API server
- Summary of passed/failed tests
- Detailed results for each endpoint/method/origin combination
- Assertion results
- Error details (if any)

## Example Report Structure

```json
{
  "name": "NovaPay Full API & CORS Validation",
  "timestamp": "2025-10-22T16:30:00.000Z",
  "target": "http://localhost:8080",
  "summary": {
    "total": 32,
    "passed": 30,
    "failed": 2
  },
  "endpoints": [
    {
      "path": "/health",
      "method": "GET",
      "origin": "http://localhost:8081",
      "status": 200,
      "duration": "42ms",
      "assertions": [
        {
          "assertion": "status==200 || status==400 || status==401 || status==409",
          "passed": true,
          "details": "Status: 200"
        },
        {
          "assertion": "hasHeader('Access-Control-Allow-Origin')",
          "passed": true,
          "details": "Header Access-Control-Allow-Origin found: http://localhost:8081"
        }
      ],
      "error": null,
      "passed": true
    }
  ]
}
```
