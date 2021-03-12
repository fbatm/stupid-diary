/* eslint-disable no-console, @typescript-eslint/no-require-imports */
const winston = require('winston');
const Koa = require('koa');
const bodyParser = require('koa-body');
const proxy = require('koa-proxy');
const send = require('koa-send');
const compress = require('koa-compress');
const Router = require('koa-router');
const helmet = require('koa-helmet');

const apiResolver = require('./apis').resolver;

const app = new Koa({ proxy: true });
const router = new Router();

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
const staticDirectoryReg = /^\/(?:css|js|assets)\/.+|(?:favicon\.ico)/;
const PROXY_HOSTS = {
  proxy1: `real1`,
};

app.use(compress());
app.use(helmet({ contentSecurityPolicy: false }));

// 接口代理：约定以/proxy/开头走代理
router.use('/proxy/:service', async (ctx, next) => {
  const targetService = ctx.params.service;
  await proxy({
    host: PROXY_HOSTS[targetService],
    jar: true,
    map: (pathname) => {
      return pathname.replace(new RegExp(`^/proxy/${targetService}/`), '');
    },
  })(ctx, next);
});

/**
 * 自定义接口：约定以/api/开头当作web开发人员自定义的接口
 * 此接口预期解决一下问题：
 * 1、根据需要自定义接口，获取/设置内容;
 * 2、需要浏览器并发发起多个request时，放到此处通过promise.all汇集为一个接口；
 * 3、有需要顺序调用多个接口，但是放在浏览器中发起觉得不爽，也可以走这里；
 * 4、接口返回字段当时无法满足需求，可在此处做一些兼容的处理;
 * 5、想要直接访问redis或数据库
 */
router.use('/api/:apiname', bodyParser(), async (ctx) => {
  const targetAPI = ctx.params.apiname;
  await apiResolver(targetAPI, ctx).catch((e) =>
    logger.error(`error occur in [${targetAPI}]`)
  );
});

router.get(staticDirectoryReg, async (ctx) => {
  await send(ctx, ctx.request.url);
});

router.get(async (ctx) => {
  await send(ctx, 'index.html');
});

router.use((ctx) => {
  ctx.status = 404;
});

app.use(router.routes());

const port = process.env.APP_PORT || '3333';
app.listen(port, () => {
  logger.info('server started');
});
