export async function readInputFromStdin(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let jsonString = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      jsonString += chunk;
    });
    process.stdin.on('error', reject);
    process.stdin.on('end', () => {
      resolve(jsonString);
      process.exit();
    });
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
