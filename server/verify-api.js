import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const parsedArgs = {};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    
    // Handle array arguments
    if (['paths', 'methods', 'headers', 'origins', 'assert'].includes(key)) {
      parsedArgs[key] = [];
      i++;
      while (i < args.length && !args[i].startsWith('--')) {
        parsedArgs[key].push(args[i]);
        i++;
      }
      i--; // Adjust for the outer loop increment
    } else {
      // Handle simple key-value arguments
      parsedArgs[key] = args[i + 1];
      i++;
    }
  }
}

// Default values
const config = {
  name: parsedArgs.name || 'API Verification',
  target: parsedArgs.target || 'http://localhost:8080',
  paths: parsedArgs.paths || ['/health'],
  methods: parsedArgs.methods || ['GET', 'POST'],
  headers: parsedArgs.headers || ['Content-Type:application/json'],
  origins: parsedArgs.origins || ['http://localhost:8081'],
  assertions: parsedArgs.assert || [],
  timeout: parsedArgs.timeout || '10s',
  saveReport: parsedArgs['save-report'] || 'api_verification_report.json'
};

// Convert timeout to milliseconds
const timeoutMs = (() => {
  if (typeof config.timeout === 'number') return config.timeout;
  if (typeof config.timeout !== 'string') return 10000;
  
  const match = config.timeout.match(/(\d+)([a-z]+)?/i);
  if (!match) return 10000;
  
  const value = parseInt(match[1]);
  const unit = match[2]?.toLowerCase() || '';
  
  if (unit === 's') return value * 1000;
  if (unit === 'ms') return value;
  return value * 1000; // Default to seconds if no unit specified
})();

console.log(`Using timeout: ${timeoutMs}ms`);

// Parse headers into an object
const headersObj = {};
config.headers.forEach(header => {
  const [key, value] = header.split(':');
  headersObj[key] = value;
});

// Function to check if a response meets the assertions
function checkAssertions(response, origin) {
  const results = [];
  
  for (const assertion of config.assertions) {
    let result = { assertion, passed: false, details: '' };
    
    try {
      if (assertion.includes('status')) {
        const condition = assertion.replace('status', response.status);
        result.passed = eval(condition);
        result.details = `Status: ${response.status}`;
      } 
      else if (assertion.includes('hasHeader')) {
        const headerName = assertion.match(/hasHeader\('(.+?)'\)/)[1];
        const headerValue = response.headers[headerName.toLowerCase()];
        result.passed = headerValue !== undefined;
        
        // Special check for CORS headers
        if (headerName.toLowerCase() === 'access-control-allow-origin') {
          if (headerValue === '*') {
            result.details = `Header ${headerName} found: * (allows all origins)`;
          } else if (headerValue === origin) {
            result.details = `Header ${headerName} found: ${headerValue} (matches request origin)`;
          } else {
            result.passed = false;
            result.details = `Header ${headerName} found: ${headerValue} (does not match request origin: ${origin})`;
          }
        } else {
          result.details = result.passed 
            ? `Header ${headerName} found: ${headerValue}` 
            : `Header ${headerName} not found`;
        }
      }
      else if (assertion.includes('contentType')) {
        const contentType = response.headers['content-type'] || '';
        const condition = assertion.replace('contentType', `"${contentType}"`);
        result.passed = eval(condition);
        result.details = `Content-Type: ${contentType}`;
      }
    } catch (error) {
      result.passed = false;
      result.details = `Error evaluating assertion: ${error.message}`;
    }
    
    results.push(result);
  }
  
  return results;
}

// Sample request bodies for POST endpoints
const sampleRequestBodies = {
  '/auth/login': { email: 'test@example.com', password: 'password123' },
  '/auth/register': { email: 'newuser@example.com', password: 'password123' },
  '/transfers/p2p': { toEmail: 'recipient@example.com', amount: 100, currency: 'JMD', note: 'Test transfer' },
  '/bills/pay': { billerId: 'JPS', accountRef: '1234567890', amount: 50, currency: 'JMD' },
  // Add default body for any POST request not specifically defined
  'default': { test: true }
};

// Main verification function
async function verifyEndpoints() {
  console.log(`🔍 Starting API verification: ${config.name}`);
  console.log(`🎯 Target: ${config.target}`);
  
  const results = {
    name: config.name,
    timestamp: new Date().toISOString(),
    target: config.target,
    summary: {
      total: 0,
      passed: 0,
      failed: 0
    },
    endpoints: []
  };

  // Test each combination of path, method and origin
  for (const path of config.paths) {
    for (const method of config.methods) {
      for (const origin of config.origins) {
        const endpointResult = {
          path,
          method,
          origin,
          status: null,
          duration: null,
          assertions: [],
          error: null,
          passed: false
        };
        
        results.summary.total++;
        
        try {
          console.log(`🌐 Testing ${method} ${path} from origin ${origin}`);
          
          // Prepare request config
          const requestConfig = {
            method: method.toLowerCase(),
            url: `${config.target}${path}`,
            headers: {
              ...headersObj,
              'Origin': origin
            },
            timeout: timeoutMs,
            validateStatus: () => true // Don't throw on any status code
          };
          
          // Add request body for POST requests
          if (method === 'POST') {
            requestConfig.data = sampleRequestBodies[path] || sampleRequestBodies.default;
            console.log(`  With body: ${JSON.stringify(requestConfig.data)}`);
          }
          
          const startTime = Date.now();
          const response = await axios(requestConfig);
          const endTime = Date.now();
          
          endpointResult.status = response.status;
          endpointResult.duration = `${endTime - startTime}ms`;
          
          // Check assertions
          const assertionResults = checkAssertions(response, origin);
          endpointResult.assertions = assertionResults;
          
          // Endpoint passes if all assertions pass
          const allAssertionsPassed = assertionResults.every(a => a.passed);
          endpointResult.passed = allAssertionsPassed;
          
          if (allAssertionsPassed) {
            results.summary.passed++;
            console.log(`✅ ${method} ${path} from ${origin}: PASSED`);
          } else {
            results.summary.failed++;
            console.log(`❌ ${method} ${path} from ${origin}: FAILED`);
            
            // Log failed assertions
            assertionResults
              .filter(a => !a.passed)
              .forEach(a => console.log(`   - Failed: ${a.assertion} (${a.details})`));
          }
        } catch (error) {
          results.summary.failed++;
          endpointResult.error = error.message;
          endpointResult.passed = false;
          console.log(`❌ ${method} ${path} from ${origin}: ERROR - ${error.message}`);
        }
        
        results.endpoints.push(endpointResult);
      }
    }
  }
  
  // Save report
  const reportPath = path.resolve(__dirname, config.saveReport);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('\n📊 Verification Summary:');
  console.log(`Total: ${results.summary.total}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  console.log(`\n📝 Report saved to: ${reportPath}`);
  
  return results;
}

// Run verification
verifyEndpoints().catch(error => {
  console.error('Verification failed:', error);
  process.exit(1);
});
