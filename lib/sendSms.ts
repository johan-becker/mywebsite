// General SMS sending function for Seven.io
export async function sendSMS(to: string, text: string) {
  const apiKey = process.env.SEVEN_API_KEY;

  if (!apiKey) {
    throw new Error('SEVEN_API_KEY is not configured');
  }

  const res = await fetch('https://gateway.seven.io/api/sms', {
    method: 'POST',
    headers: {
      Authorization: `basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      to,
      text,
      from: 'Portfolio', // optional, wenn bei Seven.io hinterlegt
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`SMS failed: ${data.message}`);
  }

  return data;
} 