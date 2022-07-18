import { defineConfig } from 'umi';
import routes from '../src/configs/routes';

export default defineConfig({
  fastRefresh: {},
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  publicPath: './',
});
