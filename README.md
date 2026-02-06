# 北外像素校园 (BFSU Pixel Campus)

微信小游戏 - 游戏化的校园信息与轻社交入口

## 技术栈

- **引擎**: Cocos Creator 3.8+
- **语言**: TypeScript
- **后端**: 微信云开发
- **AI**: GLM-4-Flash / DeepSeek
- **地图编辑**: Tiled

## 项目状态

🚧 **开发准备中**

当前阶段：技术预研（学习 Cocos Creator）

## 目录结构

```
RPG_bfsu/
├── README.md           # 项目说明
├── assets/             # 像素美术资源（待整理）
│   ├── font/           # 中文字体
│   ├── images/         # 角色、地图瓦片等
│   └── sounds/         # 音效
├── data/               # 游戏数据参考
│   ├── dialogues.json  # 对话数据
│   ├── enemies.json    # 敌人数据
│   ├── items.json      # 物品数据
│   └── quests.json     # 任务数据
└── (待创建 Cocos Creator 项目)
```

## 快速开始

### 1. 安装开发工具

- [Cocos Dashboard](https://www.cocos.com/creator-download) - Cocos Creator 管理器
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [Tiled Map Editor](https://www.mapeditor.org/) - 地图编辑器

### 2. 创建 Cocos 项目

1. 打开 Cocos Dashboard
2. 点击"新建" → 选择"Empty (2D)"模板
3. 项目路径设为当前目录
4. 语言选择 TypeScript

### 3. 配置微信小游戏发布

1. Cocos Creator → 偏好设置 → 外部程序
2. 配置"微信开发者工具"路径
3. 构建面板 → 发布平台选"微信小游戏"



## 相关文档

- MVP PRD: 详见项目讨论记录
- 开发进度: 跟踪 task.md

## License

MIT
