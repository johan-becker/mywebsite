import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string;
  code: string;
  expiresAt: Date;
}

export async function sendVerificationEmail({ to, code, expiresAt }: SendEmailOptions): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const expirationTime = expiresAt.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Auth <noreply@johanbecker.de>', // Replace with your domain
      to: [to],
      subject: 'Ihr Anmeldecode',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Anmeldecode</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-align: center;
              padding: 2rem;
            }
            .content {
              padding: 2rem;
            }
            .code-container {
              background-color: #f8f9fa;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              padding: 2rem;
              text-align: center;
              margin: 2rem 0;
            }
            .code {
              font-size: 2.5rem;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 0.5rem;
              font-family: 'Courier New', monospace;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 1rem 2rem;
              text-align: center;
              color: #6c757d;
              font-size: 0.875rem;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 4px;
              padding: 1rem;
              margin: 1rem 0;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Ihr Anmeldecode</h1>
            </div>
            
            <div class="content">
              <p>Hallo!</p>
              
              <p>Sie haben einen Anmeldecode für Ihr Konto angefordert. Verwenden Sie den folgenden Code, um sich anzumelden:</p>
              
              <div class="code-container">
                <div class="code">${code}</div>
                <p style="margin-top: 1rem; color: #6c757d;">
                  Dieser Code ist bis <strong>${expirationTime}</strong> gültig
                </p>
              </div>
              
              <div class="warning">
                <strong>⚠️ Sicherheitshinweis:</strong> Teilen Sie diesen Code niemals mit anderen. 
                Unser Team wird Sie niemals nach diesem Code fragen.
              </div>
              
              <p>Falls Sie diesen Code nicht angefordert haben, können Sie diese E-Mail ignorieren.</p>
            </div>
            
            <div class="footer">
              <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
              <p>&copy; ${new Date().getFullYear()} Johan Becker Portfolio</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Ihr Anmeldecode: ${code}

Verwenden Sie diesen Code, um sich in Ihr Konto einzuloggen.
Der Code ist bis ${expirationTime} gültig.

Falls Sie diesen Code nicht angefordert haben, können Sie diese E-Mail ignorieren.

⚠️ Teilen Sie diesen Code niemals mit anderen.
      `.trim()
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Verification email sent successfully:', data?.id);
  } catch (error: any) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
} 