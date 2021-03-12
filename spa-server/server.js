/* eslint-disable no-console, @typescript-eslint/no-require-imports */
const winston = require('winston');
const Koa = require('koa');
const proxy = require('koa-proxy');
const send = require('koa-send');
const compress = require('koa-compress');
const helmet = require('koa-helmet');

const app = new Koa({ proxy: true });

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', err);
  process.exit(1);
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { printBy: 'server.js' },
  transports: [new winston.transports.Console()],
});

const isDebug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const staticDirectoryReg = /^\/(?:css|js|public|assets)\/.+|(?:favicon\.ico)/;
const PROXY_HOSTS = {
  proxy1: `real1`,
};

app.use(compress());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(async (ctx, next) => {
  if (ctx.request.url.startsWith('/proxy/')) {
    // 以/proxy/boss/为例，proxy表明走代理，boss表明代理到boss的服务
    const targetService = ctx.request.url.split('/')[2];
    await proxy({
      host: PROXY_HOSTS[targetService],
      jar: true,
      map: (pathname) => {
        return pathname.replace(new RegExp(`^/proxy/${targetService}/`), '');
      },
    })(ctx, next);
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.method === 'GET') {
    if (staticDirectoryReg.test(ctx.request.url)) {
      await send(ctx, ctx.request.path);
    } else {
      await send(ctx, 'index.html');
    }
  } else {
    next();
  }
});

// 404 fallback
app.use((ctx) => {
  ctx.status = 404;
});

const port = process.env.APP_PORT || '3333';
app.listen(port, () => {
  logger.info('server started');
});
