module.exports = {
  resolver: async (api, ctx) => {
    switch (api) {
      case 'sample':
        ctx.body = {
          success: true,
        };
        break;
      default:
        ctx.status(404);
    }
  },
};
