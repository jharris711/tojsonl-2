export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File;

    const readableStream = file
      .stream()
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let completeData = '';

    while (true) {
      const { done, value } = await readableStream.read();
      if (done) break;
      completeData += value;
    }

    if (!completeData) {
      throw new Error('Unable to parse file');
    }

    const jsonified = JSON.parse(completeData);

    const jsonl =
      [...jsonified].map((x: any) => JSON.stringify(x)).join('\n') + '\n';

    const response = new Response(JSON.stringify({ jsonl }));
    response.headers.set('Content-Type', 'text/jsonl');

    return response;
  } catch (error) {
    const err = error as Error;
    return new Response(JSON.stringify({ message: err.message }), {
      status: 200
    });
  }
}
