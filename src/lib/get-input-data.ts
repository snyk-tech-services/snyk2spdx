export async function readInputFromStdin(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => reject(new Error('No input detected')), 100);
    let jsonString = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        jsonString += chunk;
      }
    });
    process.stdin.on('error', reject);
    process.stdin.on('end', () => resolve(jsonString));
  });
}

export async function getInputData<InputType>(): Promise<InputType> {
  try {
    const inputData = await readInputFromStdin();
    return JSON.parse(inputData);
  } catch (e) {
    throw new Error(`Failed to parse input. ERROR: ${e.message}`);
  }
}
