import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { unstable_dev, type UnstableDevWorker } from 'wrangler';

let worker: UnstableDevWorker;

describe('worker', () => {
  beforeAll(async () => {
    // Start a Worker instance using wrangler's unstable_dev helper
    worker = await unstable_dev('src/worker.ts', {
      experimental: { disableExperimentalWarning: true }
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('GET /sse streams SSE events', async () => {
    const res = await worker.fetch('http://localhost/sse?address=mc.hypixel.net');
    expect(res.status).toBe(200);

    const reader = res.body!.getReader();
    let received = '';
    let done = false;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      if (value) received += Buffer.from(value).toString('utf8');
      done = streamDone || received.includes('data:');
    }
    expect(received).toMatch(/data:/);
  });

  it('GET /unknown returns 404', async () => {
    const res = await worker.fetch('http://localhost/unknown');
    expect(res.status).toBe(404);
  });
});