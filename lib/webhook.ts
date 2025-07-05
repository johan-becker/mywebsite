interface WebhookData {
  identity: string;
  communication_channel: string;
  message_content: string;
}

interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Sends form data to n8n webhook endpoint
 * @param data - The webhook data containing identity, communication_channel, and message_content
 * @returns Promise with success status and optional message
 */
export async function sendToN8nWebhook(data: WebhookData): Promise<WebhookResponse> {
  const webhookUrl = 'https://formypage88.app.n8n.cloud/webhook-test/transmission';
  
  try {
    console.log('🚀 Sending data to n8n webhook:', {
      url: webhookUrl,
      data: {
        identity: data.identity,
        communication_channel: data.communication_channel,
        message_content: data.message_content.substring(0, 50) + '...' // Log first 50 chars for privacy
      }
    });

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: data.identity,
        communication_channel: data.communication_channel,
        message_content: data.message_content,
        timestamp: new Date().toISOString(),
        source: 'johanbecker.de'
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json().catch(() => ({})); // Handle non-JSON responses gracefully
    
    console.log('✅ Successfully sent data to n8n webhook:', {
      status: response.status,
      statusText: response.statusText,
      response: result
    });

    return {
      success: true,
      message: 'Data successfully sent to webhook'
    };

  } catch (error) {
    console.error('❌ Error sending data to n8n webhook:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: webhookUrl,
      data: {
        identity: data.identity,
        communication_channel: data.communication_channel
        // Don't log message_content in error cases for privacy
      }
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Alternative function with retry logic
 * @param data - The webhook data
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @returns Promise with success status and optional message
 */
export async function sendToN8nWebhookWithRetry(
  data: WebhookData, 
  maxRetries: number = 3
): Promise<WebhookResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} - Sending to n8n webhook`);
      
      const result = await sendToN8nWebhook(data);
      
      if (result.success) {
        if (attempt > 1) {
          console.log(`✅ Success on attempt ${attempt}/${maxRetries}`);
        }
        return result;
      }
      
      throw new Error(result.error || 'Webhook request failed');
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.log(`⏳ Retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`❌ All ${maxRetries} attempts failed. Last error:`, lastError?.message);
  
  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`
  };
} 