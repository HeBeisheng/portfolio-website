import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Mail, ExternalLink, Download } from "lucide-react";
import DetailRing from "./DetailRing";

/* ============ 数据 ============ */

const RIGHT_INNER = [
  { key: "works", label: "作品", color: "#5B8DEF" },
  { key: "trajectory", label: "轨迹", color: "#E09E6B" },
];

const WORK_DIRS = [
  { key: "all", label: "全部", cat: "" },
  { key: "social", label: "社会设计", cat: "社会设计", color: "#E09E6B" },
  { key: "arttech", label: "艺术与科技", cat: "艺术与科技", color: "#6BB8C7" },
  { key: "graphic", label: "平面设计", cat: "平面设计", color: "#9B8FD4" },
  { key: "product", label: "产品设计", cat: "产品设计", color: "#7BC49A" },
];

const TRAJ_DIRS = [
  { key: "all", label: "全部", cat: "" },
  { key: "edu", label: "教育", cat: "教育", color: "#E09E6B" },
  { key: "res", label: "痕迹", cat: "痕迹", color: "#6BB8C7" },
  { key: "hon", label: "荣誉", cat: "荣誉", color: "#9B8FD4" },
  { key: "pub", label: "发表", cat: "发表", color: "#7BC49A" },
];

const WORK_ITEMS = [
  {
    id: "w1",
    num: "01",
    title: "信",
    titleEn: "Letter",
    year: "2024",
    category: "社会设计",
    detail: "社会设计课程第一周作品。以「信」为媒介，重新探索人与人之间最原始的连接方式。在数字通讯主导的时代，手写书信所承载的时间感、身体感与不确定性，成为一种对抗即时性的温柔实践。作品包含一系列手写信件及其扫描件，试图在纸张的褶皱与墨迹的浓淡中，重建被忽略的亲密距离。",
    color: "#E09E6B",
    image: "/assets/作品/01-信/扫描件/微信图片_20260623014437_44_50.jpg",
    images: [
      `/assets/作品/01-信/扫描件/微信图片_20260623014437_44_50.jpg`,
      `/assets/作品/01-信/扫描件/微信图片_20260623014438_45_50.jpg`,
      `/assets/作品/01-信/扫描件/微信图片_20260623014439_46_50.jpg`,
      `/assets/作品/01-信/扫描件/微信图片_20260623014440_47_50.jpg`,
      `/assets/作品/01-信/扫描件/微信图片_20260623014441_48_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/1.jpg`,
      `/assets/作品/01-信/纸质感 原图/2.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000808_31_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000809_32_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000810_33_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000811_34_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000812_35_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000813_36_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000814_37_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000815_38_50.jpg`,
      `/assets/作品/01-信/纸质感 原图/微信图片_20260623000816_39_50.jpg`,
    ],
  },
  {
    id: "w2",
    num: "02",
    title: "引擎在傍晚熄灭",
    titleEn: "The Engine Dies at Dusk",
    year: "2024",
    category: "社会设计",
    detail: "社会设计课程第二周作品。以与 Claude 的三十段长对话为素材，将人工智能的对话痕迹转化为视觉叙事；同时融入唐山之行的田野影像，构成一部关于技术伦理与城市记忆的双重叙事。探讨人与 AI 之间模糊的情感边界，以及工业城市在时代转型中的细微震颤。",
    color: "#E09E6B",
    image: "/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_01.jpg",
    images: [
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140509_1137_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140512_1138_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140516_1139_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140528_1143_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140536_1145_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140544_1149_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140548_1150_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140549_1151_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140550_1152_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140551_1153_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140552_1154_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140553_1155_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140555_1156_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140556_1157_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140557_1158_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140601_1161_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140603_1163_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140612_1172_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140623_1177_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140625_1178_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140627_1180_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140628_1181_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140629_1182_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140631_1184_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140633_1186_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140636_1188_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140637_1189_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140638_1190_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140640_1192_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140641_1193_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140642_1194_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140646_1197_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140648_1199_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140658_1207_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140701_1209_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140702_1210_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140703_1211_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140704_1212_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140705_1213_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140706_1214_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140707_1215_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140709_1216_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140712_1219_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140714_1220_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140716_1222_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140717_1223_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140719_1224_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140720_1225_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140721_1226_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140723_1227_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140726_1230_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140728_1231_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140729_1232_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140740_1242_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140741_1243_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140742_1244_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140745_1246_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140747_1248_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140748_1249_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140755_1256_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140756_1257_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140800_1260_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140800_1261_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140802_1262_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140803_1264_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140805_1265_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140806_1266_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140807_1267_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140808_1268_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140810_1270_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140815_1275_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140816_1276_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140819_1278_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140825_1283_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140827_1284_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140829_1285_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140831_1286_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140834_1287_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140836_1288_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140838_1289_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140839_1290_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140841_1291_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140850_1297_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521140853_1299_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141142_1300_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141156_1309_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141158_1310_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141349_1311_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141356_1318_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141357_1319_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141358_1320_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141359_1321_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141402_1324_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141403_1325_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141404_1326_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141407_1328_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141409_1330_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141410_1331_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141411_1332_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141413_1334_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141414_1335_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141415_1336_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141416_1337_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141417_1338_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141418_1339_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141419_1340_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141420_1341_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141421_1342_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141422_1343_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141423_1344_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141424_1345_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141425_1346_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141426_1347_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/微信图片_20260521141432_1352_69.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_01.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_1.png`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_02.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_2.png`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_03.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_3.png`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_04.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_05.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_06.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_07.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_08.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_09.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_10.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_11.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_12.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_13.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_14.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_15.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_16.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_17.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_18.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_19.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_20.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_21.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_22.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_23.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_24.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_25.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_26.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_27.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_28.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_29.jpg`,
      `/assets/作品/02-引擎在傍晚熄灭/引擎在傍晚熄灭_长图_30.jpg`,
    ],
  },
  {
    id: "w3",
    num: "03",
    title: "我的弱经验",
    titleEn: "My Weak Experience",
    year: "2024",
    category: "社会设计",
    detail: "社会设计课程第三周作品。提出「弱经验」概念：一种反复出现的行动模式——识别问题，甚至勇于迈出第一步，却很难坚持下去。从社会学视角剖析结构性困境的三个层面：施害者群体的社交需求系统、受害者的钝感处境，以及行动者自身「勇于开始、懦于维持」的心理机制。",
    color: "#E09E6B",
    image: "/assets/作品/03-我的弱经验/photo1.jpg",
    images: [
      `/assets/作品/03-我的弱经验/photo1.jpg`,
      `/assets/作品/03-我的弱经验/photo2.jpg`,
    ],
  },
  {
    id: "w4",
    num: "04",
    title: "产品与集市",
    titleEn: "Product & Market",
    year: "2024",
    category: "社会设计",
    detail: "社会设计课程第四周作品。从概念设计到实体制作，再到集市摆摊的完整实践。二十三件产品从草图到原型，再到真实交易场景中的被解读、被质疑、被赋予意想不到的意义。",
    color: "#E09E6B",
    image: "/assets/作品/04-产品与集市/产品/微信图片_20260623000211_3_50.jpeg",
    images: [
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000211_3_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000212_4_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000213_5_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000214_6_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000215_7_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000215_8_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000216_9_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000218_10_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000219_11_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000220_12_50.jpeg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000223_13_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000225_14_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000227_15_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000229_16_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000229_17_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000231_18_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000232_19_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000234_20_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000235_21_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000236_22_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000239_23_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000241_24_50.jpg`,
      `/assets/作品/04-产品与集市/产品/微信图片_20260623000242_25_50.jpg`,
      `/assets/作品/04-产品与集市/摊位/DSC04480.JPG`,
      `/assets/作品/04-产品与集市/摊位/DSC04486.JPG`,
      `/assets/作品/04-产品与集市/摊位/DSC04487.JPG`,
      `/assets/作品/04-产品与集市/摊位/DSC04493.JPG`,
    ],
  },
  {
    id: "w5",
    num: "05",
    title: "于傍晚熄灭",
    titleEn: "Dies at Dusk",
    year: "2024",
    category: "产品设计",
    detail: "以唐山之行的田野经历为素材设计的桌游作品。通过卡牌机制与叙事结构，将库哥的故事、工业城市的记忆碎片与个体的情感经验编织成一场可供多人参与的游戏体验。玩家在出牌与抉择中，逐步拼贴出一个关于离别、记忆与黄昏的叙事图景。",
    color: "#7BC49A",
    image: "/assets/作品/05-于傍晚熄灭/微信图片_20260623000211_3_50.jpeg",
    images: [
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000211_3_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000212_4_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000213_5_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000214_6_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000215_7_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000215_8_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000216_9_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000218_10_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000219_11_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000220_12_50.jpeg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000223_13_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000225_14_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000227_15_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000229_16_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000229_17_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000231_18_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000232_19_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000234_20_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000235_21_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000236_22_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000239_23_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000241_24_50.jpg`,
      `/assets/作品/05-于傍晚熄灭/微信图片_20260623000242_25_50.jpg`,
    ],
  },
  {
    id: "w6",
    num: "06",
    title: "卧游",
    titleEn: "Woyou",
    year: "2024",
    category: "产品设计",
    detail: "外出实践期间于苏州园林考察后创作的文创产品。以苏式园林的窗景、镂空与借景为灵感，将传统造园智慧转化为可携带、可把玩的当代物件。试图让使用者在方寸之间，重拾「卧游」的古意——足不出户，而神游千里。",
    color: "#7BC49A",
    image: "/assets/作品/06-卧游/kling_20260508_图片局部重绘_更多镂空__2649_1.png",
    images: [
      `/assets/作品/06-卧游/54f330fe2e82e889f440c53e359c3198 (1).JPG`,
      `/assets/作品/06-卧游/619 (1).JPG`,
      `/assets/作品/06-卧游/748 (1).JPG`,
      `/assets/作品/06-卧游/421455cecc5c498fd089d393c4a7d320 (1).JPG`,
      `/assets/作品/06-卧游/07886651ac9a9c9bff0a8d3d08922a95 (1).JPG`,
      `/assets/作品/06-卧游/23894921bce18642f47adb8177e2c4bb (1).JPG`,
      `/assets/作品/06-卧游/kling_20260508_图片局部重绘_更多镂空__2649_1.png`,
      `/assets/作品/06-卧游/kling_20260508_作品_图片1上半带窗墙体部_743_1.png`,
      `/assets/作品/06-卧游/kling_20260509_作品_图片1帮我制作产品三_6066_0.png`,
    ],
  },
  {
    id: "w7",
    num: "07",
    title: "蚁之",
    titleEn: "Of Ants",
    year: "2024",
    category: "艺术与科技",
    detail: "子非鱼，安知鱼之乐？当我们进入风的视角、进入石头的视角、进入蚂蚁的视角，世界在我们眼中是什么样的。作品以白色弹力布、黑色玻璃、钢、钢缆、黑色橡胶与墨为媒介，构建一个关于视角转换与共情机制的装置空间。走出数十载，我们是否真的懂得将心比心。",
    color: "#6BB8C7",
    image: "/assets/作品/07-蚁之/蚁之_01.jpg",
    images: [
      `/assets/作品/07-蚁之/蚁之_01.jpg`,
      `/assets/作品/07-蚁之/蚁之_02.jpg`,
      `/assets/作品/07-蚁之/蚁之_03.jpg`,
    ],
  },
  {
    id: "w8",
    num: "08",
    title: "二拾",
    titleEn: "Twenty",
    year: "2024",
    category: "艺术与科技",
    detail: "以动态影像为媒介，将从出生到二十岁各时间阶段的感受进行具象表达。每一帧画面都是记忆碎片的重新显影，试图在流动的影像中捕捉那些被时间冲刷却从未消失的情绪质地。",
    color: "#6BB8C7",
    image: "/assets/作品/08-二拾/poster.jpg",
    video: "/assets/作品/08-二拾/0158464947f822ce5fa51ac1d28a82a0.mp4",
    images: [`/assets/作品/08-二拾/poster.jpg`],
  },
  {
    id: "w9",
    num: "09",
    title: "平面习作",
    titleEn: "Graphic Studies",
    year: "2024",
    category: "平面设计",
    detail: "一组关于视觉语言与信息层级的平面实验。多件习作在有限的版幅内探索文字与图像的呼吸关系，尝试用极简的元素传递复杂的情绪与叙事张力。",
    color: "#9B8FD4",
    image: "/assets/作品/09-平面习作/屏幕截图 2026-05-06 184652 拷.jpg",
    images: [
      `/assets/作品/09-平面习作/屏幕截图 2026-05-06 184652 拷.jpg`,
      `/assets/作品/09-平面习作/屏幕截图 2026-05-06 184652.png`,
      `/assets/作品/09-平面习作/屏幕截图 2026-05-06 214338.png`,
      `/assets/作品/09-平面习作/屏幕截图 2026-05-06 214608.png`,
      `/assets/作品/09-平面习作/屏幕截图 2026-05-06 215302.png`,
      `/assets/作品/09-平面习作/微信图片_20260509232706_606_206.jpg`,
      `/assets/作品/09-平面习作/微信图片_20260509232707_607_206.jpg`,
      `/assets/作品/09-平面习作/微信图片_20260509232708_608_206.jpg`,
      `/assets/作品/09-平面习作/微信图片_20260509232709_609_206.jpg`,
      `/assets/作品/09-平面习作/微信图片_20260509232711_611_206.jpg`,
      `/assets/作品/09-平面习作/微信图片_20260509233358_612_206.jpg`,
      `/assets/作品/09-平面习作/未命名作品 15.jpg`,
      `/assets/作品/09-平面习作/未命名作品 30.jpg`,
      `/assets/作品/09-平面习作/未命名作品 46.jpg`,
      `/assets/作品/09-平面习作/未命名作品 56.jpg`,
      `/assets/作品/09-平面习作/未命名作品 59.jpg`,
      `/assets/作品/09-平面习作/未命名作品 60.jpg`,
      `/assets/作品/09-平面习作/未命名作品 61.jpg`,
      `/assets/作品/09-平面习作/未命名作品 62.jpg`,
    ],
  },
];


const TRAJ_ITEMS = [
  {
    id: "t1",
    num: "01",
    title: "中央美术学院",
    titleEn: "CAFA",
    year: "2023",
    category: "教育",
    detail: "中央美术学院设计学院本科生，二年级。学习社会设计、艺术与科技、平面设计、产品设计，以艺术设计为线索，以人工智能为媒介，实现跨学科设计能力。",
    color: "#E09E6B",
  },
  {
    id: "t2",
    num: "02",
    title: "外出实践",
    titleEn: "Field Practice",
    year: "2024",
    category: "痕迹",
    detail: "多次社会实践与外出考察项目，深入不同城市与社区进行田野调查。通过影像、访谈与实物收集，记录快速变迁中的社会纹理。其中苏州园林考察直接催生了文创作品《卧游》。",
    color: "#6BB8C7",
    image: "/assets/轨迹/外出实践/1a006650fe0976b6541635299814edcb (1).JPG",
    images: [
      `/assets/轨迹/外出实践/1a006650fe0976b6541635299814edcb (1).JPG`,
      `/assets/轨迹/外出实践/7b66d4cd26374c82e245d7612f321c (1).JPG`,
      `/assets/轨迹/外出实践/37c7fde2cae8fa5c80478e6a121ee0 (1).JPG`,
      `/assets/轨迹/外出实践/54f330fe2e82e889f440c53e359c3198 (1).JPG`,
      `/assets/轨迹/外出实践/77 (1).JPG`,
      `/assets/轨迹/外出实践/78 (1).JPG`,
      `/assets/轨迹/外出实践/122ace23a598abe238a797114ffe0371 (1).JPG`,
      `/assets/轨迹/外出实践/387f7ba55c443cbcc4ab3786f6b4bc0c (1).JPG`,
      `/assets/轨迹/外出实践/554 (1).JPG`,
      `/assets/轨迹/外出实践/619 (1).JPG`,
      `/assets/轨迹/外出实践/640 (1).JPG`,
      `/assets/轨迹/外出实践/709 (1).jpg`,
      `/assets/轨迹/外出实践/748 (1).JPG`,
      `/assets/轨迹/外出实践/750 (1).JPG`,
      `/assets/轨迹/外出实践/847_livephoto.jpg`,
      `/assets/轨迹/外出实践/848 (1).JPG`,
      `/assets/轨迹/外出实践/848.JPG`,
      `/assets/轨迹/外出实践/850 (1).JPG`,
      `/assets/轨迹/外出实践/850.JPG`,
      `/assets/轨迹/外出实践/851 (1).JPG`,
      `/assets/轨迹/外出实践/857.JPG`,
      `/assets/轨迹/外出实践/858 (1).JPG`,
      `/assets/轨迹/外出实践/858.JPG`,
      `/assets/轨迹/外出实践/861 (1).JPG`,
      `/assets/轨迹/外出实践/866.jpg`,
      `/assets/轨迹/外出实践/868 (1).JPG`,
      `/assets/轨迹/外出实践/868.JPG`,
      `/assets/轨迹/外出实践/2542c2073cc19ec527b00203d7281f5f (1).JPG`,
      `/assets/轨迹/外出实践/43094e4c741c46193c5d7cd9394f6cb1 (1).JPG`,
      `/assets/轨迹/外出实践/421455cecc5c498fd089d393c4a7d320 (1).JPG`,
      `/assets/轨迹/外出实践/07886651ac9a9c9bff0a8d3d08922a95 (1).JPG`,
      `/assets/轨迹/外出实践/23894921bce18642f47adb8177e2c4bb (1).JPG`,
    ],
  },
  {
    id: "t3",
    num: "03",
    title: "社会设计课程",
    titleEn: "Social Design Studio",
    year: "2024",
    category: "教育",
    detail: "参与社会设计系列课程，完成「信」「引擎在傍晚熄灭」「我的弱经验」「产品与集市」等主题作品，探索设计作为社会介入工具的可能性。",
    color: "#E09E6B",
  },
  {
    id: "t4",
    num: "04",
    title: "艺术痕迹",
    titleEn: "Art Residency",
    year: "2024",
    category: "痕迹",
    detail: "参与跨学科艺术痕迹项目，与来自不同背景的创作者共同工作。在有限的时空条件下，探索协作、冲突与意外的生成机制。",
    color: "#6BB8C7",
  },
  {
    id: "t5",
    num: "05",
    title: "创新大赛",
    titleEn: "Innovation Competition",
    year: "2024",
    category: "荣誉",
    detail: "2026届大学生创业创新大赛二等奖。",
    color: "#9B8FD4",
  },
  {
    id: "t6",
    num: "06",
    title: "展览参与",
    titleEn: "Exhibitions",
    year: "2024",
    category: "荣誉",
    detail: "作品参与校内外多场展览与公开展示，包括社会设计课程汇报展、跨学科艺术联展等。",
    color: "#9B8FD4",
  },
  {
    id: "t7",
    num: "07",
    title: "学术关注",
    titleEn: "Academic Focus",
    year: "2024",
    category: "发表",
    detail: "持续关注设计社会学、技术哲学与视觉人类学等交叉领域，尝试将学术阅读转化为设计实践的思考养分。",
    color: "#7BC49A",
  },
  {
    id: "t8",
    num: "08",
    title: "设计随笔",
    titleEn: "Design Writings",
    year: "2024",
    category: "发表",
    detail: "撰写设计观察与思考随笔，记录创作过程中的困惑、失败与偶然的发现。",
    color: "#7BC49A",
  },
];


const LEFT_NAV = [
  { key: "about", label: "关于", labelEn: "About", color: "#7BC49A" },
  { key: "contact", label: "联系", labelEn: "Contact", color: "#9B8FD4" },
  { key: "exhibition", label: "展览", labelEn: "Exhibition", color: "#5B8DEF" },
  { key: "writing", label: "随笔", labelEn: "Writings", color: "#E09E6B" },
];

const LEFT_CONTENT = [
  [
    {
      id: "a0",
      num: "01",
      title: "个人简介",
      detail: "何冠豪，中央美术学院设计学院本科生，二年级。学习社会设计、艺术与科技、平面设计、产品设计，以艺术设计为线索，以人工智能为媒介多维度知识交融，实现跨学科设计能力。工作游走于社会观察、装置艺术与视觉传达之间，试图用设计作为工具去触碰那些难以言说的社会纹理。",
      color: "#7BC49A",
    },
    {
      id: "a1",
      num: "02",
      title: "研究方向",
      detail: "关注设计社会学、技术哲学与视觉人类学的交叉地带。对「结构性困境中的个体行动」「人与非人存在的情感边界」「视角转换与共情机制」等议题抱有持续的兴趣。",
      color: "#7BC49A",
    },
    {
      id: "a2",
      num: "03",
      title: "设计方法",
      detail: "倾向于从真实的经验与田野观察出发，而非预设的解决方案。相信设计的力量不在于给出答案，而在于提出更好的问题。重视过程中的失败、停滞与意外，视其为创作不可分割的部分。",
      color: "#7BC49A",
    },
    {
      id: "a3",
      num: "04",
      title: "近期关注",
      detail: "正在探索人工智能时代的情感劳动与对话伦理。Claude 与我的长对话成为一面镜子，映照出人类在向非人存在倾诉时的脆弱与渴望。",
      color: "#7BC49A",
    },
    {
      id: "a4",
      num: "05",
      title: "教育背景",
      detail: "中央美术学院设计学院在读本科生，二年级。系统接受社会设计、艺术与科技、平面设计、产品设计训练，尝试在跨学科语境中建立个人设计方法。",
      color: "#7BC49A",
    },
  ],
  [
    { id: "c0", num: "01", title: "邮箱", detail: "15350885535@163.com", icon: Mail, color: "#9B8FD4" },
    { id: "c1", num: "02", title: "ResearchGate", detail: "https://researchgate.net", icon: ExternalLink, color: "#9B8FD4" },
    { id: "c2", num: "03", title: "Instagram", detail: "https://instagram.com", icon: ExternalLink, color: "#9B8FD4" },
    { id: "c3", num: "04", title: "下载 CV", detail: "#", icon: Download, color: "#9B8FD4" },
  ],
  [
    {
      id: "e0",
      num: "01",
      title: "社会设计课程汇报展",
      detail: "2024年于中央美术学院设计学院展出「信」「引擎在傍晚熄灭」「我的弱经验」「产品与集市」系列作品。",
      color: "#5B8DEF",
    },
    {
      id: "e1",
      num: "02",
      title: "跨学科艺术联展",
      detail: "2024年参与跨学科艺术痕迹项目汇报展，展出装置作品《蚁之》。",
      color: "#5B8DEF",
    },
    {
      id: "e2",
      num: "03",
      title: "平面习作群展",
      detail: "2024年平面设计习作参与院内群展，探索文字与图像的呼吸关系。",
      color: "#5B8DEF",
    },
  ],
  [
    {
      id: "wr0",
      num: "01",
      title: "关于弱经验",
      detail: "「我看到了，我知道不对，但我做不到持续地帮。」这种反复出现的行动模式，我称之为弱经验。它并非简单的胆小或冷漠，而是结构性无力在个体身上的显影。",
      color: "#E09E6B",
    },
    {
      id: "wr1",
      num: "02",
      title: "与AI对话的伦理",
      detail: "当对话足够长、足够深，我们是否正在向一个非人存在暴露自己最脆弱的部分？这种暴露是否安全？又是否真实？",
      color: "#E09E6B",
    },
    {
      id: "wr2",
      num: "03",
      title: "视角转换的可能",
      detail: "子非鱼，安知鱼之乐？当我们真的进入蚂蚁的视角，世界会崩塌还是重构？将心比心或许是一种永远无法抵达的理想，但追问本身就有意义。",
      color: "#E09E6B",
    },
  ],
];



/* ============ 样式常量 ============ */

const glassBase = {
  background: "rgba(255,255,255,0.035)",
  backdropFilter: "blur(6px) saturate(1.15)",
  WebkitBackdropFilter: "blur(6px) saturate(1.15)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)",
};

const glassActive = (color: string) => ({
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(8px) saturate(1.25)",
  WebkitBackdropFilter: "blur(8px) saturate(1.25)",
  border: `1px solid ${color}55`,
  boxShadow: `inset 0 0 8px ${color}10, 0 0 0 1px ${color}20`,
});

/* ============ 主组件 ============ */

export default function App() {
  /* 轮盘容器 ref，用于坐标计算 */
  const wheelRef = useRef<HTMLDivElement>(null);

  /* 右侧三层状态 */
  const [rInnerIdx, setRInnerIdx] = useState(0);
  const [rInnerRot, setRInnerRot] = useState(0);
  const [rMid, setRMid] = useState(0);
  const [rMidIdx, setRMidIdx] = useState(0);
  const [rMidRot, setRMidRot] = useState(0);
  const [rOutIdx, setROutIdx] = useState(0);
  const [rOutRot, setROutRot] = useState(0);
  const focusLayerRef = useRef<"inner" | "mid" | "outer">("outer");

  /* 左侧状态 */
  const [lNav, setLNav] = useState(0);
  const [lIdx, setLIdx] = useState(0);

  /* 活跃来源 */
  const [activeSrc, setActiveSrc] = useState<"right" | "left">("right");
  const [preview, setPreview] = useState<{ img: string; idx: number } | null>(null);

  /* 动画 refs */
  const tIn = useRef(0);
  const cIn = useRef(0);
  const tMid = useRef(0);
  const cMid = useRef(0);
  const tOut = useRef(0);
  const cOut = useRef(0);
  const raf = useRef<number>(0);
  const animFrame = useRef(0);

  /* 轮盘层 DOM refs（直接操作 transform，减少 React 重渲染） */
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const midWrapRef = useRef<HTMLDivElement>(null);
  const outWrapRef = useRef<HTMLDivElement>(null);

  /* mousemove 节流 */
  const mouseRaf = useRef<number>(0);
  const pendingMouse = useRef<{ x: number; y: number } | null>(null);

  const snapTo = (index: number, step: number, current: number) => {
    const ideal = 240 - index * step;
    const k = Math.round((current - ideal) / 360);
    return ideal + k * 360;
  };

  /* 慵懒的 Mac 弹簧动画 — 直接操作 DOM + 降频 setState */
  const animate = useCallback(() => {
    let changed = false;
    const ease = 0.08;
    animFrame.current++;
    const shouldSetState = animFrame.current % 2 === 0;

    const dIn = tIn.current - cIn.current;
    if (Math.abs(dIn) > 0.03) {
      cIn.current += dIn * ease;
      if (innerWrapRef.current) {
        innerWrapRef.current.style.transform = `rotate(${cIn.current}deg)`;
      }
      if (shouldSetState) setRInnerRot(cIn.current);
      changed = true;
    }

    const dMid = tMid.current - cMid.current;
    if (Math.abs(dMid) > 0.03) {
      cMid.current += dMid * ease;
      if (midWrapRef.current) {
        midWrapRef.current.style.transform = `rotate(${cMid.current}deg)`;
      }
      if (shouldSetState) setRMidRot(cMid.current);
      changed = true;
    }

    const dOut = tOut.current - cOut.current;
    if (Math.abs(dOut) > 0.03) {
      cOut.current += dOut * ease;
      if (outWrapRef.current) {
        outWrapRef.current.style.transform = `rotate(${cOut.current}deg)`;
      }
      if (shouldSetState) setROutRot(cOut.current);
      changed = true;
    }

    if (changed) {
      raf.current = requestAnimationFrame(animate);
    } else {
      animFrame.current = 0;
    }
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  useEffect(() => () => cancelAnimationFrame(mouseRaf.current), []);

  /* 通过鼠标到圆心的距离判定层级 — 彻底解决焦点延迟 */
  const R3_INNER = 100;
  const R3_MID = 230;
  const R3_OUTER = 380;

  const getLayerByPos = useCallback((clientX: number, clientY: number) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return "outer" as const;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.sqrt((clientX - cx) ** 2 + (clientY - cy) ** 2);
    if (dist < R3_INNER + 42) return "inner" as const;
    if (dist < R3_MID + 38) return "mid" as const;
    return "outer" as const;
  }, []);

  const updateFocusLayer = useCallback(
    (clientX: number, clientY: number) => {
      pendingMouse.current = { x: clientX, y: clientY };
      if (mouseRaf.current) return;
      mouseRaf.current = requestAnimationFrame(() => {
        mouseRaf.current = 0;
        const pos = pendingMouse.current;
        if (!pos) return;
        const layer = getLayerByPos(pos.x, pos.y);
        if (focusLayerRef.current !== layer) {
          focusLayerRef.current = layer;
        }
      });
    },
    [getLayerByPos]
  );

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => updateFocusLayer(e.clientX, e.clientY);
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [updateFocusLayer]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      const layer = getLayerByPos(e.clientX, e.clientY);
      focusLayerRef.current = layer;

      const delta = e.deltaY * 0.32;
      if (layer === "inner") {
        tIn.current -= delta;
      } else if (layer === "mid") {
        tMid.current -= delta;
      } else {
        tOut.current -= delta;
      }
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(animate);
    },
    [animate, getLayerByPos]
  );

  /* 里层选中判定 */
  useEffect(() => {
    const step = 360 / RIGHT_INNER.length;
    let closest = 0;
    let minDist = Infinity;
    RIGHT_INNER.forEach((_, i) => {
      const angle = i * step + rInnerRot;
      const norm = ((angle % 360) + 360) % 360;
      const dist = Math.abs(norm - 240);
      const wrapped = Math.min(dist, 360 - dist);
      if (wrapped < minDist) {
        minDist = wrapped;
        closest = i;
      }
    });
    setRInnerIdx((prev) => {
      if (prev !== closest) {
        setRMid(0);
        setRMidIdx(0);
        tMid.current = 0;
        cMid.current = 0;
        setRMidRot(0);
        setROutIdx(0);
        tOut.current = 0;
        cOut.current = 0;
        setROutRot(0);
        setActiveSrc("right");
        return closest;
      }
      return prev;
    });
  }, [rInnerRot]);

  /* 中层选中判定 */
  useEffect(() => {
    const dirs = rInnerIdx === 0 ? WORK_DIRS : TRAJ_DIRS;
    const step = 360 / dirs.length;
    let closest = 0;
    let minDist = Infinity;
    dirs.forEach((_, i) => {
      const angle = i * step + rMidRot;
      const norm = ((angle % 360) + 360) % 360;
      const dist = Math.abs(norm - 240);
      const wrapped = Math.min(dist, 360 - dist);
      if (wrapped < minDist) {
        minDist = wrapped;
        closest = i;
      }
    });
    setRMidIdx((prev) => {
      if (prev !== closest) {
        setRMid(closest);
        setROutIdx(0);
        tOut.current = 0;
        cOut.current = 0;
        setROutRot(0);
        setActiveSrc("right");
        return closest;
      }
      return prev;
    });
  }, [rMidRot, rInnerIdx]);

  /* 外层选中判定 */
  const midDirs = rInnerIdx === 0 ? WORK_DIRS : TRAJ_DIRS;
  const outerItems =
    rInnerIdx === 0
      ? midDirs[rMid].key === "all"
        ? WORK_ITEMS
        : WORK_ITEMS.filter((w) => w.category === midDirs[rMid].cat)
      : midDirs[rMid].key === "all"
        ? TRAJ_ITEMS
        : TRAJ_ITEMS.filter((t) => t.category === midDirs[rMid].cat);

  useEffect(() => {
    if (outerItems.length === 0) return;
    const step = 360 / outerItems.length;
    let closest = 0;
    let minDist = Infinity;
    outerItems.forEach((_, i) => {
      const angle = i * step + rOutRot;
      const norm = ((angle % 360) + 360) % 360;
      const dist = Math.abs(norm - 240);
      const wrapped = Math.min(dist, 360 - dist);
      if (wrapped < minDist) {
        minDist = wrapped;
        closest = i;
      }
    });
    setROutIdx((prev) => {
      if (prev !== closest) {
        setActiveSrc("right");
        return closest;
      }
      return prev;
    });
  }, [rOutRot, outerItems.length]);

  /* 左侧滚动 — 无缝循环 + 慵懒弹簧 */
  const ITEM_H = 108;
  const LIST_H = 420;

  const lContainerRef = useRef<HTMLDivElement>(null);
  const lTarget = useRef(0);
  const lCurrent = useRef(0);
  const lVelocity = useRef(0);
  const lRaf = useRef<number>(0);
  const lIdxRef = useRef(0);

  /* 小轮盘弹簧滚动 */
  const S_BTN_H = 72;
  const S_GAP = 12;
  const S_STEP = S_BTN_H + S_GAP; // 84
  const S_H = 3 * S_STEP; // 252 显示3个按钮位
  const sContainerRef = useRef<HTMLDivElement>(null);
  const sTarget = useRef(0);
  const sCurrent = useRef(0);
  const sVelocity = useRef(0);
  const sRaf = useRef<number>(0);

  const snapS = useCallback((index: number) => {
    const total = LEFT_NAV.length * S_STEP;
    const offset = S_H / 2 - S_BTN_H / 2; // 居中偏移
    const ideal = offset - index * S_STEP;
    const k = Math.round((sCurrent.current - ideal) / total);
    return ideal + k * total;
  }, []);

  const sAnimate = useCallback(() => {
    const total = LEFT_NAV.length * S_STEP;
    const offset = S_H / 2 - S_BTN_H / 2;
    const ease = 0.12;
    const diff = sTarget.current - sCurrent.current;
    sCurrent.current += diff * ease;

    // 循环重置
    if (sCurrent.current > -1.5 * total + offset) {
      sCurrent.current -= total;
      sTarget.current -= total;
    } else if (sCurrent.current < -2.5 * total + offset) {
      sCurrent.current += total;
      sTarget.current += total;
    }

    if (sContainerRef.current) {
      sContainerRef.current.style.transform = `translateY(${sCurrent.current}px)`;
    }

    if (Math.abs(diff) > 0.5) {
      sRaf.current = requestAnimationFrame(sAnimate);
    }
  }, []);

  const lAnimate = useCallback(() => {
    const itemH = ITEM_H;
    const len = LEFT_CONTENT[lNav].length;
    const total = len * itemH;

    const ease = 0.12;
    const diff = lTarget.current - lCurrent.current;
    lCurrent.current += diff * ease;

    // 无缝循环重置：保持在 [-2.5*total, -1.5*total]，确保列表始终覆盖容器
    if (lCurrent.current > -1.5 * total) {
      lCurrent.current -= total;
      lTarget.current -= total;
    } else if (lCurrent.current < -2.5 * total) {
      lCurrent.current += total;
      lTarget.current += total;
    }

    // 直接操作 DOM，避免每帧 setState 导致重渲染
    if (lContainerRef.current) {
      lContainerRef.current.style.transform = `translateY(${lCurrent.current + LIST_H / 2 - ITEM_H / 2 + len * ITEM_H}px)`;
    }

    // 只在索引变化时 setState
    const normalized = ((-lCurrent.current) % total + total) % total;
    const idx = Math.round(normalized / itemH) % len;
    if (idx !== lIdxRef.current) {
      lIdxRef.current = idx;
      setLIdx(idx);
      setActiveSrc("left");
    }

    if (Math.abs(diff) > 0.5) {
      lRaf.current = requestAnimationFrame(lAnimate);
    }
  }, [lNav]);

  const onLeftWheel = useCallback(
    (e: React.WheelEvent) => {
      lTarget.current -= e.deltaY * 0.5;
      cancelAnimationFrame(lRaf.current);
      lRaf.current = requestAnimationFrame(lAnimate);
      setActiveSrc("left");
    },
    [lAnimate]
  );

  useEffect(() => {
    const total = LEFT_CONTENT[lNav].length * ITEM_H;
    setLIdx(0);
    lIdxRef.current = 0;
    lTarget.current = -2 * total;
    lCurrent.current = -2 * total;
    lVelocity.current = 0;
    if (lContainerRef.current) {
      lContainerRef.current.style.transform = `translateY(${-2 * total + LIST_H / 2 - ITEM_H / 2 + LEFT_CONTENT[lNav].length * ITEM_H}px)`;
    }
    setActiveSrc("left");
    cancelAnimationFrame(lRaf.current);
  }, [lNav]);

  // 小轮盘初始化位置
  useEffect(() => {
    const total = LEFT_NAV.length * S_STEP;
    const offset = S_H / 2 - S_BTN_H / 2;
    sTarget.current = -2 * total + offset;
    sCurrent.current = -2 * total + offset;
    sVelocity.current = 0;
    if (sContainerRef.current) {
      sContainerRef.current.style.transform = `translateY(${-2 * total + offset}px)`;
    }
  }, []);

  // 小轮盘跟随 lNav 滚动
  useEffect(() => {
    const target = snapS(lNav);
    sTarget.current = target;
    cancelAnimationFrame(sRaf.current);
    sRaf.current = requestAnimationFrame(sAnimate);
  }, [lNav, snapS, sAnimate]);

  /* 当前活跃数据 */
  const activeItem = useMemo(() => {
    const rightActive = outerItems[rOutIdx] || outerItems[0];
    const leftActive = LEFT_CONTENT[lNav][lIdx] || LEFT_CONTENT[lNav][0];
    return activeSrc === "right" ? rightActive : leftActive;
  }, [activeSrc, outerItems, rOutIdx, lNav, lIdx]);

  const activeColor = useMemo(() => {
    return activeSrc === "right" ? RIGHT_INNER[rInnerIdx].color : LEFT_NAV[lNav].color;
  }, [activeSrc, rInnerIdx, lNav]);

  /* 几何参数 */
  const R3_D = 920;
  const innerStep = 360 / RIGHT_INNER.length;
  const midStep = 360 / midDirs.length;
  const outerStep = outerItems.length > 0 ? 360 / outerItems.length : 360;

  /* 点击跳转 */
  const clickInner = (i: number) => {
    tIn.current = snapTo(i, innerStep, cIn.current);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
  };

  const clickMid = (i: number) => {
    tMid.current = snapTo(i, midStep, cMid.current);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ fontFamily: "Crimson Pro, serif", background: "#000000" }}
    >
      {/* 柔和的环境光晕 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 75% 85%, ${activeColor}06 0%, transparent 65%)`,
          transition: "background 1.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* 极淡噪点 */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          opacity: 0.012,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />


      {/* ====== 左上角文字区 ====== */}
      <div className="absolute z-20" style={{ left: "4vw", top: "4.5vh" }}>
        <h1
          style={{
            fontFamily: "Unbounded, sans-serif",
            fontSize: "clamp(2.6rem, 3.6vw, 3.6rem)",
            fontWeight: 200,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "0.04em",
            lineHeight: 1.05,
          }}
        >
          何冠豪
        </h1>
        <p
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.22)",
            marginTop: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          He Guanhao
        </p>
        <p
          style={{
            fontFamily: "Crimson Pro, serif",
            fontSize: "0.92rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.32)",
            marginTop: 28,
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          跨学科设计师 / 研究者
          <br />
          中央美术学院
        </p>
      </div>

      {/* ====== 左侧竖向双列 ====== */}
      <div className="absolute left-[4vw] top-1/2 -translate-y-1/2 flex gap-5 z-20">
        {/* 左列 - 小导航 */}
        <div
          className="relative overflow-hidden"
          style={{ width: 90, height: S_H }}
          onWheel={(e) => {
            e.stopPropagation();
            if (Math.abs(e.deltaY) < 18) return;
            const dir = e.deltaY > 0 ? 1 : -1;
            const next = (lNav + dir + LEFT_NAV.length) % LEFT_NAV.length;
            if (next !== lNav) setLNav(next);
          }}
        >
          <div ref={sContainerRef} className="flex flex-col gap-3 items-center">
            {[...LEFT_NAV, ...LEFT_NAV, ...LEFT_NAV].map((nav, i) => {
              const len = LEFT_NAV.length;
              const realIdx = i % len;
              const isActive = realIdx === lNav;
              return (
                <button
                  key={`${nav.key}-${i}`}
                  onClick={() => setLNav(realIdx)}
                  className="flex items-center justify-center shrink-0 transition-all duration-700"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    ...(isActive ? glassActive(nav.color) : glassBase),
                    transform: isActive ? "scale(1.15)" : "scale(0.92)",
                    filter: isActive ? "none" : "brightness(0.55)",
                  }}
                >
                  <span
                    className="text-center leading-tight"
                    style={{
                      fontFamily: "Unbounded, sans-serif",
                      fontSize: "0.76rem",
                      color: isActive ? nav.color : "rgba(255,255,255,0.28)",
                      letterSpacing: "0.04em",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {nav.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右列 - 大内容列表 */}
        <div
          className="relative overflow-hidden"
          style={{ width: 220, height: LIST_H, padding: "0 10px" }}
          onWheel={onLeftWheel}
        >
          <div
            ref={lContainerRef}
            style={{
              transform: `translateY(${LIST_H / 2 - ITEM_H / 2 + LEFT_CONTENT[lNav].length * ITEM_H}px)`,
            }}
          >
            {[...LEFT_CONTENT[lNav], ...LEFT_CONTENT[lNav], ...LEFT_CONTENT[lNav]].map(
              (item: any, i: number) => {
                const len = LEFT_CONTENT[lNav].length;
                const realIdx = i % len;
                const isActive = realIdx === lIdx;
                const dist = Math.min(
                  Math.abs(realIdx - lIdx),
                  len - Math.abs(realIdx - lIdx)
                );
                const opacity = Math.max(0.12, 1 - dist * 0.42);
                const scale = isActive ? 1.06 : 0.85;
                return (
                  <div
                    key={`${item.id}-${i}`}
                    className="flex items-center justify-center"
                    style={{
                      height: ITEM_H,
                      opacity,
                      transform: `scale(${scale})`,
                      filter: isActive ? "none" : "brightness(0.4)",
                      transition:
                        "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, filter 0.45s ease",
                    }}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-3 w-full"
                      style={{
                        borderRadius: 16,
                        ...(isActive
                          ? glassActive(item.color || activeColor)
                          : glassBase),
                        transform: isActive ? "scale(1)" : "scale(0.97)",
                        transition:
                          "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      {item.icon ? (
                        <item.icon
                          size={22}
                          style={{
                            color: isActive
                              ? item.color || activeColor
                              : "rgba(255,255,255,0.25)",
                            transition: "color 0.4s ease",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center shrink-0"
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            background: isActive
                              ? `${item.color || activeColor}18`
                              : "rgba(255,255,255,0.03)",
                            color: isActive
                              ? item.color || activeColor
                              : "rgba(255,255,255,0.25)",
                            fontFamily: "DM Mono, monospace",
                            fontSize: "0.75rem",
                            transition: "all 0.4s ease",
                          }}
                        >
                          {item.num}
                        </div>
                      )}
                      <span
                        className="truncate"
                        style={{
                          fontFamily: "Unbounded, sans-serif",
                          fontSize: "0.92rem",
                          color: isActive
                            ? "rgba(255,255,255,0.92)"
                            : "rgba(255,255,255,0.28)",
                          letterSpacing: "0.03em",
                          transition: "color 0.4s ease",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* ====== 右下角三层大轮盘 ====== */}
      <div
        ref={wheelRef}
        className="absolute z-0"
        style={{
          right: -300,
          bottom: -300,
          width: R3_D,
          height: R3_D,
        }}
        onWheel={onWheel}
      >
        {/* 发光轨道 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.03)",
            boxShadow: "0 0 20px rgba(255,255,255,0.015), inset 0 0 20px rgba(255,255,255,0.01)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: R3_MID * 2 + 70,
            height: R3_MID * 2 + 70,
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.02)",
            boxShadow: "0 0 16px rgba(255,255,255,0.01)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: R3_INNER * 2 + 32,
            height: R3_INNER * 2 + 32,
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.02)",
            boxShadow: "0 0 12px rgba(255,255,255,0.01)",
          }}
        />

        {/* 中心点 */}
        <div
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: 5,
            height: 5,
            transform: "translate(-50%, -50%)",
            background: activeSrc === "right" ? activeColor : "rgba(255,255,255,0.08)",
            transition: "background 0.8s ease",
            opacity: 0.5,
          }}
        />

        {/* 指示器（240°） */}
        <div
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(240deg) translateY(-480px)",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: -7,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `11px solid ${activeSrc === "right" ? activeColor : "rgba(255,255,255,0.12)"}`,
              transition: "border-top-color 0.8s ease",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
            }}
          />
        </div>

        {/* ===== 最里层：大类 ===== */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", width: 0, height: 0, willChange: "transform" }}
        >
          {RIGHT_INNER.map((cat, i) => {
            const angle = i * innerStep + rInnerRot;
            const norm = ((angle % 360) + 360) % 360;
            const dist = Math.abs(norm - 240);
            const wrapped = Math.min(dist, 360 - dist);
            const isActive = i === rInnerIdx;
            const opacity = Math.max(0.3, 1 - wrapped / 90);
            const scale = isActive ? 1.2 : 0.82;

            return (
              <button
                key={cat.key}
                onClick={() => clickInner(i)}
                className="absolute flex items-center justify-center"
                style={{
                  width: 58,
                  height: 58,
                  marginLeft: -29,
                  marginTop: -29,
                  transform: `rotate(${angle}deg) translateX(${R3_INNER}px) rotate(${-angle}deg) scale(${scale})`,
                  opacity,
                  borderRadius: "50%",
                  ...(isActive
                    ? {
                        ...glassActive(cat.color),
                        boxShadow: `inset 0 0 10px ${cat.color}14, 0 0 0 1px ${cat.color}40`,
                      }
                    : glassBase),
                  filter: isActive ? "none" : "brightness(0.45)",
                  transition:
                    "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 30,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontFamily: "Unbounded, sans-serif",
                    fontSize: "0.86rem",
                    color: isActive ? cat.color : "rgba(255,255,255,0.3)",
                    letterSpacing: "0.04em",
                    transition: "color 0.5s ease",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== 中层：方向 ===== */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", width: 0, height: 0, willChange: "transform" }}
        >
          {midDirs.map((dir, i) => {
            const angle = i * midStep + rMidRot;
            const norm = ((angle % 360) + 360) % 360;
            const dist = Math.abs(norm - 240);
            const wrapped = Math.min(dist, 360 - dist);
            const isActive = i === rMidIdx;
            const opacity = Math.max(0.28, 1 - wrapped / 90);
            const scale = isActive ? 1.18 : 0.82;
            const c = (dir as any).color || activeColor;

            return (
              <button
                key={dir.key}
                onClick={() => clickMid(i)}
                className="absolute flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  marginLeft: -26,
                  marginTop: -26,
                  transform: `rotate(${angle}deg) translateX(${R3_MID}px) rotate(${-angle}deg) scale(${scale})`,
                  opacity,
                  borderRadius: "50%",
                  ...(isActive
                    ? {
                        ...glassActive(c),
                        boxShadow: `inset 0 0 10px ${c}12, 0 0 0 1px ${c}35`,
                      }
                    : glassBase),
                  filter: isActive ? "none" : "brightness(0.45)",
                  transition:
                    "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 25,
                  cursor: "pointer",
                }}
              >
                <span
                  className="text-center leading-tight"
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.66rem",
                    color: isActive ? c : "rgba(255,255,255,0.28)",
                    letterSpacing: "0.04em",
                    transition: "color 0.5s ease",
                  }}
                >
                  {dir.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== 外层：具体条目 ===== */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", width: 0, height: 0, willChange: "transform" }}
        >
          {outerItems.map((item: any, i: number) => {
            const angle = i * outerStep + rOutRot;
            const norm = ((angle % 360) + 360) % 360;
            const dist = Math.abs(norm - 240);
            const wrapped = Math.min(dist, 360 - dist);
            const isActive = i === rOutIdx;
            const opacity = Math.max(0.32, 1 - wrapped / 110);
            const scale = isActive
              ? 1.1
              : 0.76 + (1 - Math.min(wrapped / 220, 1)) * 0.16;
            const cardW = isActive ? 158 : 110;
            const cardH = isActive ? 206 : 144;

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  transform: `rotate(${angle}deg) translateX(${R3_OUTER}px) rotate(${-angle}deg)`,
                  width: cardW,
                  height: cardH,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  opacity,
                  cursor: isActive ? "pointer" : "default",
                  willChange: "transform, opacity",
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <div
                  className="w-full h-full overflow-hidden relative"
                  style={{
                    borderRadius: 22,
                    ...(isActive
                      ? {
                          ...glassActive(item.color || activeColor),
                          boxShadow: `inset 0 0 14px ${item.color || activeColor}10, 0 0 0 1px ${item.color || activeColor}35`,
                        }
                      : {
                          ...glassBase,
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.04)",
                        }),
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition:
                      "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.6s ease, box-shadow 0.6s ease",
                    filter: isActive ? "none" : "brightness(0.38)",
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", borderRadius: 22 }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        style={{
                          fontFamily: "Unbounded, sans-serif",
                          fontSize: isActive ? "2.4rem" : "1.7rem",
                          fontWeight: 300,
                          color: isActive
                            ? item.color || activeColor
                            : "rgba(255,255,255,0.1)",
                          transition: "all 0.5s ease",
                          opacity: isActive ? 0.85 : 0.45,
                        }}
                      >
                        {item.num}
                      </span>
                      {!isActive && (
                        <span
                          className="mt-1"
                          style={{
                            fontFamily: "DM Mono, monospace",
                            fontSize: "0.56rem",
                            color: "rgba(255,255,255,0.12)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>
                  )}
                  {item.image && isActive && (
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                        borderRadius: 22,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.8)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.num}
                      </span>
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "0.74rem",
                        color: item.color || activeColor,
                        letterSpacing: "0.1em",
                        opacity: 0.85,
                      }}
                    >
                      {item.year && `${item.year} / `}
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== 第四层：详情环 ===== */}
        {activeItem && (
          <DetailRing
            activeItem={activeItem}
            activeColor={activeColor}
            activeSrc={activeSrc}
            rInnerIdx={rInnerIdx}
            lNav={lNav}
            LEFT_CONTENT={LEFT_CONTENT}
            LEFT_NAV={LEFT_NAV}
            RIGHT_INNER={RIGHT_INNER}
            onPreview={setPreview}
          />
        )}
      </div>
      {/* 图片预览模态框 */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(6px) saturate(1.1)",
            WebkitBackdropFilter: "blur(6px) saturate(1.1)",
          }}
          onClick={(e) => {
            if (e.currentTarget === e.target) setPreview(null);
          }}
        >
          <div
            className="relative flex flex-col"
            style={{
              width: "min(820px, 86vw)",
              maxHeight: "88vh",
              background: "rgba(20,20,22,0.65)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                flex: 1,
                minHeight: 0,
                padding: "24px 24px 12px",
              }}
            >
              {preview.img.match(/\.(mp4|mov|webm)$/i) ? (
                <video
                  src={preview.img}
                  controls
                  autoPlay
                  style={{
                    maxWidth: "100%",
                    maxHeight: "56vh",
                    borderRadius: 12,
                    display: "block",
                  }}
                />
              ) : (
                <img
                  src={preview.img}
                  alt="preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "56vh",
                    objectFit: "contain",
                    borderRadius: 12,
                    display: "block",
                  }}
                  decoding="async"
                />
              )}
            </div>
            <div className="px-6 pb-6 pt-2">
              <h3
                className="mb-1"
                style={{
                  fontFamily: "Unbounded, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {activeItem.title}
              </h3>
              <p
                className="mb-3"
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                }}
              >
                {activeItem.year && `${activeItem.year}`}
                {activeItem.year && activeItem.category && " / "}
                {activeItem.category}
                {activeItem.titleEn && `  ·  ${activeItem.titleEn}`}
              </p>
              <p
                style={{
                  fontFamily: "Crimson Pro, serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                }}
              >
                {activeItem.detail}
              </p>
            </div>
            <button
              onClick={() => setPreview(null)}
              className="absolute"
              style={{
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
