const fs = require('fs');

const appPath = 'E:/claude code E/镜像我/个人作品集网站/src/app/App.tsx';
let content = fs.readFileSync(appPath, 'utf-8');

const images = JSON.parse(fs.readFileSync('E:/claude code E/镜像我/个人作品集网站/image-paths.json', 'utf-8'));

// Replace WORK_ITEMS block
const workStart = content.indexOf('const WORK_ITEMS = [');
const workEnd = content.indexOf('];', workStart) + 2;

const workItems = [
  {
    id: 'w1', num: '01', title: '信', titleEn: 'Letter', year: '2024', category: '社会设计',
    detail: '社会设计课程第一周作品。以「信」为媒介，重新探索人与人之间最原始的连接方式。在数字通讯主导的时代，手写书信所承载的时间感、身体感与不确定性，成为一种对抗即时性的温柔实践。作品包含一系列手写信件及其扫描件，试图在纸张的褶皱与墨迹的浓淡中，重建被忽略的亲密距离。',
    color: '#E09E6B', image: images.letter[0], images: images.letter,
  },
  {
    id: 'w2', num: '02', title: '引擎在傍晚熄灭', titleEn: 'The Engine Dies at Dusk', year: '2024', category: '社会设计',
    detail: '社会设计课程第二周作品。以与 Claude 的三十段长对话为素材，将人工智能的对话痕迹转化为视觉叙事。三十张长图构成一部沉默的图像小说，探讨人与 AI 之间模糊的情感边界——当对话足够长、足够深，我们是否正在向一个非人存在暴露自己最脆弱的部分？',
    color: '#E09E6B', image: images.engine[0], images: images.engine,
  },
  {
    id: 'w3', num: '03', title: '我的弱经验', titleEn: 'My Weak Experience', year: '2024', category: '社会设计',
    detail: '社会设计课程第三周作品。提出「弱经验」概念：一种反复出现的行动模式——识别问题，甚至勇于迈出第一步，却很难坚持下去。从社会学视角剖析结构性困境的三个层面：施害者群体的社交需求系统、受害者的钝感处境，以及行动者自身「勇于开始、懦于维持」的心理机制。',
    color: '#E09E6B', image: images.weak[0], images: images.weak,
  },
  {
    id: 'w4', num: '04', title: '产品与集市', titleEn: 'Product & Market', year: '2024', category: '社会设计',
    detail: '社会设计课程第四周作品。从概念设计到实体制作，再到集市摆摊的完整实践。二十三件产品从草图到原型，再到真实交易场景中的被解读、被质疑、被赋予意想不到的意义。',
    color: '#E09E6B', image: images.market[0], images: images.market,
  },
  {
    id: 'w5', num: '05', title: '唐山之行', titleEn: 'Tangshan Journey', year: '2024', category: '社会设计',
    detail: '一次深入唐山的社会实践考察。一百四十余张照片与三段影像，记录一座工业城市在时代转型中的细微震颤——废弃的厂房、沉默的街道、老人与孩子的面孔，以及那些被高速发展的叙事所忽略的日常瞬间。',
    color: '#E09E6B', image: images.tangshan[0], images: images.tangshan,
  },
  {
    id: 'w6', num: '06', title: '蚁之', titleEn: 'Of Ants', year: '2024', category: '艺术与科技',
    detail: '子非鱼，安知鱼之乐？当我们进入风的视角、进入石头的视角、进入蚂蚁的视角，世界在我们眼中是什么样的。作品以白色弹力布、黑色玻璃、钢、钢缆、黑色橡胶与墨为媒介，构建一个关于视角转换与共情机制的装置空间。走出数十载，我们是否真的懂得将心比心。',
    color: '#6BB8C7', image: images.ants[0], images: images.ants,
  },
  {
    id: 'w7', num: '07', title: '平面习作', titleEn: 'Graphic Studies', year: '2024', category: '平面设计',
    detail: '一组关于视觉语言与信息层级的平面实验。十七件习作在有限的版幅内探索文字与图像的呼吸关系，尝试用极简的元素传递复杂的情绪与叙事张力。',
    color: '#9B8FD4', image: images.graphic[0], images: images.graphic,
  },
  {
    id: 'w8', num: '08', title: '产品概念', titleEn: 'Product Concepts', year: '2024', category: '产品设计',
    detail: '二十八件产品概念设计与原型探索。从功能推演到形态生成，再到材料与工艺的考量，尝试在实用性与诗意之间找到平衡点。部分方案借助 AI 工具进行形态推演，探讨人机协作在设计前端的可能性。',
    color: '#7BC49A', image: images.product[0], images: images.product,
  },
];

function serializeArray(arr, indent) {
  return '[\n' + arr.map(s => indent + '  `' + s + '`').join(',\n') + '\n' + indent + ']';
}

function serializeItem(item) {
  return `  {\n` +
    `    id: "${item.id}",\n` +
    `    num: "${item.num}",\n` +
    `    title: "${item.title}",\n` +
    `    titleEn: "${item.titleEn}",\n` +
    `    year: "${item.year}",\n` +
    `    category: "${item.category}",\n` +
    `    detail: "${item.detail}",\n` +
    `    color: "${item.color}",\n` +
    `    image: "${item.image}",\n` +
    `    images: ${serializeArray(item.images, '    ')},\n` +
    `  }`;
}

const workBlock = 'const WORK_ITEMS = [\n' + workItems.map(serializeItem).join(',\n') + '\n];';

content = content.slice(0, workStart) + workBlock + content.slice(workEnd);

// Replace TRAJ_ITEMS block
const trajStart = content.indexOf('const TRAJ_ITEMS = [');
const trajEnd = content.indexOf('];', trajStart) + 2;

const trajItems = [
  {
    id: 't1', num: '01', title: '中央美术学院', titleEn: 'CAFA', year: '2021', category: '教育',
    detail: '中央美术学院设计学院在读。研究方向聚焦于跨学科设计与社会创新，试图在设计实践与社会学、人类学之间建立对话。',
    color: '#E09E6B',
  },
  {
    id: 't2', num: '02', title: '外出实践', titleEn: 'Field Practice', year: '2024', category: '驻留',
    detail: '二十余次社会实践与外出考察项目，深入不同城市与社区进行田野调查。通过影像、访谈与实物收集，记录快速变迁中的社会纹理。',
    color: '#6BB8C7', image: images.field[0], images: images.field,
  },
  {
    id: 't3', num: '03', title: '社会设计课程', titleEn: 'Social Design Studio', year: '2024', category: '教育',
    detail: '参与社会设计系列课程，完成「信」「引擎在傍晚熄灭」「我的弱经验」「产品与集市」等主题作品，探索设计作为社会介入工具的可能性。',
    color: '#E09E6B',
  },
  {
    id: 't4', num: '04', title: '艺术驻留', titleEn: 'Art Residency', year: '2024', category: '驻留',
    detail: '参与跨学科艺术驻留项目，与来自不同背景的创作者共同工作。在有限的时空条件下，探索协作、冲突与意外的生成机制。',
    color: '#6BB8C7',
  },
  {
    id: 't5', num: '05', title: '设计竞赛', titleEn: 'Design Competition', year: '2023', category: '荣誉',
    detail: '参与多项设计竞赛与展览征集，作品涉及社会设计、装置艺术与视觉传达等领域。',
    color: '#9B8FD4',
  },
  {
    id: 't6', num: '06', title: '展览参与', titleEn: 'Exhibitions', year: '2024', category: '荣誉',
    detail: '作品参与校内外多场展览与公开展示，包括社会设计课程汇报展、跨学科艺术联展等。',
    color: '#9B8FD4',
  },
  {
    id: 't7', num: '07', title: '学术关注', titleEn: 'Academic Focus', year: '2024', category: '发表',
    detail: '持续关注设计社会学、技术哲学与视觉人类学等交叉领域，尝试将学术阅读转化为设计实践的思考养分。',
    color: '#7BC49A',
  },
  {
    id: 't8', num: '08', title: '设计随笔', titleEn: 'Design Writings', year: '2024', category: '发表',
    detail: '撰写设计观察与思考随笔，记录创作过程中的困惑、失败与偶然的发现。',
    color: '#7BC49A',
  },
];

function serializeTrajItem(item) {
  let s = `  {\n` +
    `    id: "${item.id}",\n` +
    `    num: "${item.num}",\n` +
    `    title: "${item.title}",\n` +
    `    titleEn: "${item.titleEn}",\n` +
    `    year: "${item.year}",\n` +
    `    category: "${item.category}",\n` +
    `    detail: "${item.detail}",\n` +
    `    color: "${item.color}",\n`;
  if (item.image) s += `    image: "${item.image}",\n`;
  if (item.images) s += `    images: ${serializeArray(item.images, '    ')},\n`;
  s += `  }`;
  return s;
}

const trajBlock = 'const TRAJ_ITEMS = [\n' + trajItems.map(serializeTrajItem).join(',\n') + '\n];';

content = content.slice(0, trajStart) + trajBlock + content.slice(trajEnd);

fs.writeFileSync(appPath, content);
console.log('Done');
