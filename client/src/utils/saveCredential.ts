export const saveCredential = async (data: any): Promise<void> => {
  const response = await fetch('http://localhost:4040/api/save-credential', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save credential');
  }
};
