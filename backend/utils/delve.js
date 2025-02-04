// Use dynamic import for node-fetch (ESM module)
async function sendEvidenceToDelve(evidence) {
  const { default: fetch } = await import('node-fetch');

  // Replace with your actual Delve API endpoint and credentials
  const DELVE_API_URL = process.env.DELVE_API_URL || 'https://thmeomrrktizgdvxyuoe.supabase.co';
  const DELVE_API_KEY = process.env.DELVE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWVvbXJya3Rpemdkdnh5dW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NjkyNjYsImV4cCI6MjA1NDE0NTI2Nn0.fXz_D5LOeerVf8ybKml_QIuJjPVQ9umZHcJRuzxA-XQ';

  try {
    const response = await fetch(DELVE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DELVE_API_KEY}`,
      },
      body: JSON.stringify(evidence),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error sending evidence to Delve:', text);
      return { success: false, error: text };
    }
    return { success: true };
  } catch (err) {
    console.error('Unexpected error sending evidence to Delve:', err);
    return { success: false, error: err.message };
  }
}

module.exports = sendEvidenceToDelve;
