import { sendToN8nWebhook, sendToN8nWebhookWithRetry } from './webhook';

/**
 * Test function to validate n8n webhook integration
 * Run this in your browser console or as a standalone test
 */
export async function testN8nWebhook() {
  console.log('🧪 Starting n8n webhook tests...');
  
  // Test 1: Basic webhook call
  console.log('\n📝 Test 1: Basic webhook call');
  const testData = {
    identity: 'Test User',
    communication_channel: 'test@example.com',
    message_content: 'This is a test message from the webhook integration. Timestamp: ' + new Date().toISOString()
  };
  
  const result1 = await sendToN8nWebhook(testData);
  console.log('Result 1:', result1);
  
  // Test 2: Test with longer message
  console.log('\n📝 Test 2: Long message test');
  const longMessage = 'This is a longer test message that contains more content to test how the webhook handles larger payloads. '.repeat(10);
  
  const result2 = await sendToN8nWebhook({
    identity: 'Long Message Tester',
    communication_channel: 'longtest@example.com',
    message_content: longMessage
  });
  console.log('Result 2:', result2);
  
  // Test 3: Test with special characters
  console.log('\n📝 Test 3: Special characters test');
  const result3 = await sendToN8nWebhook({
    identity: 'Special Char Tester',
    communication_channel: 'special@test.com',
    message_content: 'Testing special chars: äöü ß € "quotes" \'apostrophe\' & <html> {json: "value"} 🚀 💻'
  });
  console.log('Result 3:', result3);
  
  // Test 4: Test with retry logic
  console.log('\n📝 Test 4: Retry logic test');
  const result4 = await sendToN8nWebhookWithRetry({
    identity: 'Retry Tester',
    communication_channel: 'retry@test.com',
    message_content: 'Testing retry functionality with backup attempts'
  });
  console.log('Result 4:', result4);
  
  // Summary
  const tests = [result1, result2, result3, result4];
  const successful = tests.filter(r => r.success).length;
  const failed = tests.filter(r => !r.success).length;
  
  console.log('\n📊 Test Summary:');
  console.log(`✅ Successful: ${successful}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed tests:');
    tests.forEach((result, index) => {
      if (!result.success) {
        console.log(`Test ${index + 1}: ${result.error}`);
      }
    });
  }
  
  return {
    totalTests: tests.length,
    successful,
    failed,
    results: tests
  };
}

/**
 * Simple test function for quick validation
 */
export async function quickWebhookTest() {
  console.log('🚀 Quick webhook test...');
  
  const result = await sendToN8nWebhook({
    identity: 'Quick Test',
    communication_channel: 'quicktest@example.com', 
    message_content: 'Quick test message - ' + new Date().toLocaleString()
  });
  
  if (result.success) {
    console.log('✅ Quick test passed!');
  } else {
    console.error('❌ Quick test failed:', result.error);
  }
  
  return result;
}

/**
 * Function to test from browser console
 * Usage: Open browser console and type:
 * import('./lib/webhook-test.js').then(m => m.testN8nWebhook())
 */
export function runBrowserTest() {
  return testN8nWebhook().then(result => {
    console.log('🎯 Browser test completed:', result);
    return result;
  });
} 