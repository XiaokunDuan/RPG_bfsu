import { _decorator, Component, Node, director } from 'cc';
import { CAMPUS_BUILDINGS, MAP_CONFIG, Building } from '../data/CampusData';

const { ccclass, property } = _decorator;

/**
 * 游戏管理器 - 单例模式
 * 管理游戏状态、场景切换、数据持久化
 */
@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager | null = null;

    @property(Node)
    playerNode: Node | null = null;

    // 游戏状态
    private _currentBuilding: Building | null = null;
    private _playerData: PlayerData = {
        name: '新同学',
        level: 1,
        exp: 0,
        visitedBuildings: []
    };

    static get instance(): GameManager | null {
        return GameManager._instance;
    }

    onLoad() {
        if (GameManager._instance) {
            this.node.destroy();
            return;
        }
        GameManager._instance = this;
        // 跨场景保留
        director.addPersistRootNode(this.node);

        this.initGame();
    }

    initGame() {
        console.log('=== 北外虚拟校园 RPG 初始化 ===');
        console.log(`地图: ${MAP_CONFIG.name} (${MAP_CONFIG.width}x${MAP_CONFIG.height})`);
        console.log(`建筑数量: ${CAMPUS_BUILDINGS.length}`);
    }

    /**
     * 获取指定位置的建筑物
     */
    getBuildingAt(gridX: number, gridY: number): Building | null {
        for (const building of CAMPUS_BUILDINGS) {
            const bx = building.position.x;
            const by = building.position.y;
            const bw = building.size.width;
            const bh = building.size.height;

            if (gridX >= bx && gridX < bx + bw &&
                gridY >= by && gridY < by + bh) {
                return building;
            }
        }
        return null;
    }

    /**
     * 进入建筑物
     */
    enterBuilding(building: Building) {
        if (!building.interactable) return;

        this._currentBuilding = building;
        console.log(`进入: ${building.name} (${building.nameEn})`);
        console.log(building.description);

        // 记录访问
        if (!this._playerData.visitedBuildings.includes(building.id)) {
            this._playerData.visitedBuildings.push(building.id);
            this.gainExp(10); // 首次访问获得经验
        }

        // TODO: 触发建筑物内部场景或对话
    }

    /**
     * 获得经验值
     */
    gainExp(amount: number) {
        this._playerData.exp += amount;
        console.log(`获得 ${amount} 经验! 当前: ${this._playerData.exp}`);

        // 检查升级
        const expNeeded = this._playerData.level * 100;
        if (this._playerData.exp >= expNeeded) {
            this._playerData.exp -= expNeeded;
            this._playerData.level++;
            console.log(`🎉 升级! 当前等级: ${this._playerData.level}`);
        }
    }

    /**
     * 获取所有建筑物
     */
    getAllBuildings(): Building[] {
        return CAMPUS_BUILDINGS;
    }

    /**
     * 获取玩家数据
     */
    getPlayerData(): PlayerData {
        return { ...this._playerData };
    }

    /**
     * 保存游戏
     */
    saveGame() {
        const saveData = JSON.stringify(this._playerData);
        localStorage.setItem('bfsu_rpg_save', saveData);
        console.log('游戏已保存');
    }

    /**
     * 加载游戏
     */
    loadGame() {
        const saveData = localStorage.getItem('bfsu_rpg_save');
        if (saveData) {
            this._playerData = JSON.parse(saveData);
            console.log('游戏已加载');
        }
    }
}

// 玩家数据接口
interface PlayerData {
    name: string;
    level: number;
    exp: number;
    visitedBuildings: string[];
}
