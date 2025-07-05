import { sendToN8nWebhook, sendToN8nWebhookWithRetry } from './webhook';

/**
 * Example usage of the n8n webhook function
 */
export async function exampleUsage() {
  // Basic usage
  const result = await sendToN8nWebhook({
    identity: 'John Doe',
    communication_channel: 'john.doe@example.com',
    message_content: 'Hello, I am interested in your services!'
  });

  if (result.success) {
    console.log('✅ Message sent successfully');
  } else {
    console.error('❌ Failed to send message:', result.error);
  }
}

/**
 * Example with retry logic
 */
export async function exampleWithRetry() {
  const result = await sendToN8nWebhookWithRetry({
    identity: 'Jane Smith',
    communication_channel: 'jane.smith@company.com',
    message_content: 'I would like to discuss a potential collaboration.'
  }, 3); // Retry up to 3 times

  return result;
}

/**
 * Example for React component usage
 */
export async function handleFormSubmission(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const webhookResult = await sendToN8nWebhook({
      identity: formData.name,
      communication_channel: formData.email,
      message_content: formData.message
    });

    if (webhookResult.success) {
      // Handle success - show success message to user
      return {
        success: true,
        message: 'Your message has been sent successfully!'
      };
    } else {
      // Handle webhook failure
      throw new Error(webhookResult.error || 'Failed to send message');
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    };
  }
}

/**
 * Batch sending example (for multiple submissions)
 */
export async function sendBatchMessages(messages: Array<{
  identity: string;
  communication_channel: string;
  message_content: string;
}>) {
  const results = [];
  
  for (const message of messages) {
    const result = await sendToN8nWebhook(message);
    results.push({
      ...message,
      success: result.success,
      error: result.error
    });
    
    // Add small delay between requests to avoid overwhelming the webhook
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`📊 Batch sending complete: ${successful} successful, ${failed} failed`);
  
  return results;
} 