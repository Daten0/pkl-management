import app from './app';

const port = Number(Bun.env.PORT ?? 3001);

export default {
  hostname: '0.0.0.0',
  port,
  fetch: app.fetch
};
