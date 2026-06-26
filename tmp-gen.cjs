const fs = require('fs');

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .map(f => {
      const rel = dir.replace('E:/claude code E/镜像我/个人作品集网站/public/assets', '').replace(/\\/g, '/');
      return '/assets' + rel + '/' + f;
    });
}

const base = 'E:/claude code E/镜像我/个人作品集网站/public/assets';

const images = {
  letter: listImages(base + '/作品/社会设计/第一周：信/扫描件').concat(listImages(base + '/作品/社会设计/第一周：信/纸质感 原图')),
  engine: listImages(base + '/作品/社会设计/第二周：claude 聊天记录'),
  weak: listImages(base + '/作品/社会设计/第一周：信/纸质感 原图').slice(0, 8),
  market: listImages(base + '/作品/社会设计/第四周：产品与集市/产品').concat(listImages(base + '/作品/社会设计/第四周：产品与集市/摊位').filter(f => /\.jpg$/i.test(f))),
  tangshan: listImages(base + '/作品/社会设计/唐山之行').filter(f => /\.jpg$/i.test(f)),
  ants: listImages(base + '/作品/艺术与科技'),
  graphic: listImages(base + '/作品/平面设计'),
  product: listImages(base + '/作品/产品').concat(listImages(base + '/作品/产品2')),
  field: listImages(base + '/轨迹/外出实践').filter(f => /\.jpg$/i.test(f)),
};

console.log(JSON.stringify(images, null, 2));
