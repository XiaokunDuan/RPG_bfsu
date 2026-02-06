import { _decorator, Component, Node, Prefab, instantiate, Sprite, Color, UITransform, Label, SpriteFrame, resources } from 'cc';
import { CAMPUS_BUILDINGS, MAP_CONFIG, Building, BuildingType } from '../data/CampusData';

const { ccclass, property } = _decorator;

/**
 * 地图生成器
 * 根据 CampusData 自动生成校园地图
 * 支持加载像素风格建筑精灵
 */
@ccclass('MapGenerator')
export class MapGenerator extends Component {
    @property
    tileSize: number = 32;

    @property(Node)
    buildingsContainer: Node | null = null;

    @property(Node)
    playerNode: Node | null = null;

    @property
    useSprites: boolean = true; // 是否使用精灵图片（否则用颜色占位符）

    // 建筑精灵帧缓存
    private buildingSprites: Map<string, SpriteFrame> = new Map();

    // 建筑 ID 到精灵名称的映射
    private readonly buildingSpriteMapping: { [key: string]: string } = {
        'main_building': 'main_building',
        'yifu_building': 'yifu_building',
        'playground': 'playground',
        'basketball_court': 'basketball_court',
        'auditorium': 'auditorium',
        'small_pond': 'small_pond',
        'student_center': 'student_center',
        // 'dorm_2', 'dorm_3', 'dorm_5', 'dorm_6', 'dorm_7' share the same sprite
        'dorm_2': 'dorm_building',
        'dorm_3': 'dorm_building',
        'dorm_5': 'dorm_building',
        'dorm_6': 'dorm_building',
        'dorm_7': 'dorm_building',
        'cafeteria': 'cafeteria_new',
        'gymnasium': 'gymnasium',
        'tennis_court': 'tennis_court',
        'morning_garden': 'morning_garden',
        'musi_garden': 'musi_garden',
        'east_gate': 'east_gate',
        'west_gate': 'west_gate'
    };

    // 建筑物颜色映射
    private buildingColors: Map<BuildingType, Color> = new Map([
        [BuildingType.Academic, new Color(100, 149, 237)],      // 蓝色 - 教学楼
        [BuildingType.Dormitory, new Color(255, 218, 185)],     // 肉色 - 宿舍
        [BuildingType.Cafeteria, new Color(255, 165, 0)],       // 橙色 - 食堂
        [BuildingType.Library, new Color(139, 69, 19)],         // 棕色 - 图书馆
        [BuildingType.Sports, new Color(50, 205, 50)],          // 绿色 - 体育
        [BuildingType.Administrative, new Color(169, 169, 169)], // 灰色 - 行政
        [BuildingType.Garden, new Color(34, 139, 34)],          // 深绿 - 花园
        [BuildingType.Gate, new Color(255, 215, 0)]             // 金色 - 校门
    ]);

    async onLoad() {
        if (this.useSprites) {
            await this.loadBuildingSprites();
        }
        this.generateMap();
    }

    /**
     * 加载建筑精灵资源
     */
    async loadBuildingSprites(): Promise<void> {
        console.log('🖼️ 加载建筑精灵资源...');

        for (const [buildingId, spriteName] of Object.entries(this.buildingSpriteMapping)) {
            try {
                const spriteFrame = await this.loadSpriteFrame(`tiles/buildings/${spriteName}/spriteFrame`);
                if (spriteFrame) {
                    this.buildingSprites.set(buildingId, spriteFrame);
                    console.log(`  ✓ 加载成功: ${spriteName}`);
                }
            } catch (e) {
                console.warn(`  ✗ 加载失败: ${spriteName}`);
            }
        }

        console.log(`🖼️ 精灵加载完成: ${this.buildingSprites.size}/${Object.keys(this.buildingSpriteMapping).length}`);
    }

    /**
     * 加载单个精灵帧
     */
    loadSpriteFrame(path: string): Promise<SpriteFrame | null> {
        return new Promise((resolve) => {
            resources.load(path, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(spriteFrame);
                }
            });
        });
    }

    /**
     * 生成整个地图
     */
    generateMap() {
        console.log('🗺️ 开始生成北外校园地图...');

        // 创建建筑物容器（如果没有指定）
        if (!this.buildingsContainer) {
            this.buildingsContainer = new Node('Buildings');
            this.buildingsContainer.setParent(this.node);
        }

        // 生成所有建筑物
        for (const building of CAMPUS_BUILDINGS) {
            this.createBuilding(building);
        }

        // 设置玩家初始位置（东门附近）
        if (this.playerNode) {
            const eastGate = CAMPUS_BUILDINGS.find(b => b.id === 'east_gate');
            if (eastGate) {
                this.playerNode.setPosition(
                    (eastGate.position.x - 2) * this.tileSize,
                    eastGate.position.y * this.tileSize,
                    0
                );
            }
        }

        console.log(`✅ 地图生成完成！共 ${CAMPUS_BUILDINGS.length} 个建筑物`);
    }

    /**
     * 创建单个建筑物节点
     */
    createBuilding(building: Building): Node {
        const buildingNode = new Node(building.id);
        buildingNode.setParent(this.buildingsContainer);

        // 计算位置（左下角为原点）
        const posX = building.position.x * this.tileSize;
        const posY = building.position.y * this.tileSize;
        buildingNode.setPosition(posX, posY, 0);

        // 添加 UITransform 设置大小
        const uiTransform = buildingNode.addComponent(UITransform);
        uiTransform.width = building.size.width * this.tileSize;
        uiTransform.height = building.size.height * this.tileSize;
        uiTransform.anchorX = 0;
        uiTransform.anchorY = 0;

        // 添加 Sprite 组件
        const sprite = buildingNode.addComponent(Sprite);
        sprite.type = Sprite.Type.SIMPLE;
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;

        // 尝试使用精灵图片，否则使用颜色占位符
        const spriteFrame = this.buildingSprites.get(building.id);
        if (spriteFrame) {
            sprite.spriteFrame = spriteFrame;
            sprite.color = new Color(255, 255, 255); // 使用原始颜色
        } else {
            // 回退到颜色占位符
            const color = this.buildingColors.get(building.type) || new Color(128, 128, 128);
            sprite.color = color;
        }

        // 添加标签显示建筑名称
        const labelNode = new Node('Label');
        labelNode.setParent(buildingNode);
        labelNode.setPosition(
            uiTransform.width / 2,
            uiTransform.height / 2,
            0
        );

        const label = labelNode.addComponent(Label);
        label.string = building.name;
        label.fontSize = 14;
        label.color = new Color(255, 255, 255);
        label.overflow = Label.Overflow.SHRINK;

        const labelTransform = labelNode.addComponent(UITransform);
        labelTransform.width = uiTransform.width;
        labelTransform.height = 20;

        // 存储建筑物数据供交互使用
        buildingNode['buildingData'] = building;

        return buildingNode;
    }

    /**
     * 清除地图
     */
    clearMap() {
        if (this.buildingsContainer) {
            this.buildingsContainer.removeAllChildren();
        }
    }

    /**
     * 重新生成地图
     */
    regenerateMap() {
        this.clearMap();
        this.generateMap();
    }

    /**
     * 获取地图总大小（像素）
     */
    getMapSize(): { width: number; height: number } {
        return {
            width: MAP_CONFIG.width * this.tileSize,
            height: MAP_CONFIG.height * this.tileSize
        };
    }
}
