import { Plugin } from 'vue';
import { LyIcon } from '@/components';

const icons: Plugin = {
  install(app) {
    requireIcons();
    app.component(LyIcon.name, LyIcon);
  },
};

export default icons;

/** 导入所有的 svg 图标文件 */
function requireIcons() {
  const requireSvg = require.context('./', false, /\.svg$/);
  requireSvg.keys().map(requireSvg);
}
