/**
 * 北外校园地图数据
 * 基于实际校园布局设计
 */

// 建筑物类型
export enum BuildingType {
    Academic = 'academic',      // 教学楼
    Dormitory = 'dormitory',    // 宿舍
    Cafeteria = 'cafeteria',    // 食堂
    Library = 'library',        // 图书馆
    Sports = 'sports',          // 体育设施
    Administrative = 'admin',   // 行政楼
    Garden = 'garden',          // 花园/绿地
    Gate = 'gate'               // 校门
}

// 建筑物数据接口
export interface Building {
    id: string;
    name: string;
    nameEn: string;
    type: BuildingType;
    description: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    interactable: boolean;
    npcs?: string[];
}

// 北外校园建筑数据
export const CAMPUS_BUILDINGS: Building[] = [
    // === 校门 ===
    {
        id: 'east_gate',
        name: '东门',
        nameEn: 'East Gate',
        type: BuildingType.Gate,
        description: '北外东门，靠近民族大学西路',
        position: { x: 28, y: 12 },
        size: { width: 2, height: 1 },
        interactable: true
    },
    {
        id: 'west_gate',
        name: '西门',
        nameEn: 'West Gate',
        type: BuildingType.Gate,
        description: '北外西门，靠近西三环北路',
        position: { x: 0, y: 12 },
        size: { width: 2, height: 1 },
        interactable: true
    },

    // === 教学楼 ===
    {
        id: 'main_building',
        name: '主楼',
        nameEn: 'Main Building',
        type: BuildingType.Academic,
        description: '北外标志性建筑，主要教学和行政办公区',
        position: { x: 3, y: 10 },
        size: { width: 3, height: 4 },
        interactable: true,
        npcs: ['teacher_zhang', 'student_helper']
    },
    {
        id: 'yifu_building',
        name: '逸夫楼',
        nameEn: 'Yifu Teaching Building',
        type: BuildingType.Academic,
        description: '逸夫教学楼，现代化多媒体教室',
        position: { x: 22, y: 8 },
        size: { width: 4, height: 3 },
        interactable: true
    },
    {
        id: 'chinese_building',
        name: '中文楼',
        nameEn: 'Chinese Language Building',
        type: BuildingType.Academic,
        description: '中国语言文学学院所在地',
        position: { x: 20, y: 14 },
        size: { width: 3, height: 2 },
        interactable: true
    },
    {
        id: 'arabic_college',
        name: '阿拉伯语学院',
        nameEn: 'School of Arabic Studies',
        type: BuildingType.Academic,
        description: '阿拉伯语系教学楼',
        position: { x: 18, y: 6 },
        size: { width: 3, height: 2 },
        interactable: true
    },
    {
        id: 'english_college',
        name: '英语学院',
        nameEn: 'School of English',
        type: BuildingType.Academic,
        description: '英语学院教学区',
        position: { x: 16, y: 4 },
        size: { width: 3, height: 2 },
        interactable: true
    },
    {
        id: 'translation_college',
        name: '高级翻译学院',
        nameEn: 'Graduate School of Translation',
        type: BuildingType.Academic,
        description: '高翻学院，培养高端翻译人才',
        position: { x: 14, y: 8 },
        size: { width: 3, height: 2 },
        interactable: true
    },
    {
        id: 'japanese_center',
        name: '日本学研究中心',
        nameEn: 'Japanese Studies Center',
        type: BuildingType.Academic,
        description: '日本语言文化研究中心',
        position: { x: 8, y: 16 },
        size: { width: 3, height: 2 },
        interactable: true
    },

    // === 图书馆 ===
    {
        id: 'library',
        name: '图书馆',
        nameEn: 'Library',
        type: BuildingType.Library,
        description: '北外图书馆，藏书丰富的学习圣地',
        position: { x: 16, y: 10 },
        size: { width: 4, height: 3 },
        interactable: true,
        npcs: ['librarian_wang']
    },

    // === 体育设施 ===
    {
        id: 'playground',
        name: '操场',
        nameEn: 'Playground',
        type: BuildingType.Sports,
        description: '标准田径场，晨跑和体育课的好去处',
        position: { x: 6, y: 4 },
        size: { width: 4, height: 4 },
        interactable: true
    },
    {
        id: 'basketball_court',
        name: '篮球场',
        nameEn: 'Basketball Court',
        type: BuildingType.Sports,
        description: '室外篮球场',
        position: { x: 10, y: 4 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'gymnasium',
        name: '体育馆',
        nameEn: 'Gymnasium',
        type: BuildingType.Sports,
        description: '室内综合体育馆',
        position: { x: 14, y: 14 },
        size: { width: 3, height: 2 },
        interactable: true
    },
    {
        id: 'tennis_court',
        name: '网球场',
        nameEn: 'Tennis Court',
        type: BuildingType.Sports,
        description: '室外网球场',
        position: { x: 10, y: 14 },
        size: { width: 2, height: 2 },
        interactable: true
    },

    // === 礼堂 ===
    {
        id: 'auditorium',
        name: '千人礼堂',
        nameEn: 'Thousand-seat Auditorium',
        type: BuildingType.Academic,
        description: '大型活动和演出场所',
        position: { x: 12, y: 6 },
        size: { width: 3, height: 3 },
        interactable: true
    },

    // === 学生宿舍 ===
    {
        id: 'dorm_2',
        name: '2号学生宿舍楼',
        nameEn: 'Dormitory No.2',
        type: BuildingType.Dormitory,
        description: '学生宿舍',
        position: { x: 4, y: 18 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'dorm_3',
        name: '3号学生宿舍楼',
        nameEn: 'Dormitory No.3',
        type: BuildingType.Dormitory,
        description: '学生宿舍',
        position: { x: 18, y: 16 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'dorm_5',
        name: '5号学生宿舍楼',
        nameEn: 'Dormitory No.5',
        type: BuildingType.Dormitory,
        description: '学生宿舍',
        position: { x: 6, y: 0 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'dorm_6',
        name: '6号学生宿舍楼',
        nameEn: 'Dormitory No.6',
        type: BuildingType.Dormitory,
        description: '学生宿舍',
        position: { x: 10, y: 0 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'dorm_7',
        name: '7号学生宿舍楼',
        nameEn: 'Dormitory No.7',
        type: BuildingType.Dormitory,
        description: '学生宿舍',
        position: { x: 14, y: 0 },
        size: { width: 2, height: 2 },
        interactable: true
    },

    // === 食堂 ===
    {
        id: 'cafeteria',
        name: '学生食堂',
        nameEn: 'Student Cafeteria',
        type: BuildingType.Cafeteria,
        description: '学生餐厅，提供各种美食',
        position: { x: 22, y: 16 },
        size: { width: 3, height: 2 },
        interactable: true,
        npcs: ['chef_li']
    },

    // === 行政楼 ===
    {
        id: 'admin_building',
        name: '行政楼',
        nameEn: 'Administration Building',
        type: BuildingType.Administrative,
        description: '学校行政办公楼',
        position: { x: 20, y: 2 },
        size: { width: 3, height: 2 },
        interactable: true
    },

    // === 花园/绿地 ===
    {
        id: 'morning_garden',
        name: '晨读园',
        nameEn: 'Morning Reading Garden',
        type: BuildingType.Garden,
        description: '晨读好去处，环境优美',
        position: { x: 2, y: 14 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'musi_garden',
        name: '暮思园',
        nameEn: 'Musi Garden',
        type: BuildingType.Garden,
        description: '静谧的思考空间',
        position: { x: 2, y: 4 },
        size: { width: 2, height: 2 },
        interactable: true
    },
    {
        id: 'small_pond',
        name: '小碧池',
        nameEn: 'Small Pond',
        type: BuildingType.Garden,
        description: '校园小池塘，景色宜人',
        position: { x: 18, y: 12 },
        size: { width: 2, height: 2 },
        interactable: true
    },

    // === 学生活动中心 ===
    {
        id: 'student_center',
        name: '学生活动中心',
        nameEn: 'Student Activity Center',
        type: BuildingType.Administrative,
        description: '红楼，学生社团活动中心',
        position: { x: 14, y: 2 },
        size: { width: 2, height: 2 },
        interactable: true,
        npcs: ['club_president']
    }
];

// 地图配置
export const MAP_CONFIG = {
    width: 30,      // 地图宽度（格子数）
    height: 22,     // 地图高度（格子数）
    tileSize: 32,   // 每个格子的像素大小
    name: '北外东校区',
    nameEn: 'BFSU East Campus'
};
