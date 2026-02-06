import { _decorator, Component, Node, Camera, UITransform, Canvas } from 'cc';
import { MapGenerator } from '../map/MapGenerator';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

/**
 * 主场景控制器
 * 初始化游戏场景
 */
@ccclass('MainScene')
export class MainScene extends Component {
    @property(Node)
    mapNode: Node | null = null;

    @property(Node)
    playerNode: Node | null = null;

    @property(Camera)
    mainCamera: Camera | null = null;

    onLoad() {
        console.log('🎮 北外虚拟校园 RPG 启动！');
        this.initScene();
    }

    initScene() {
        // 初始化地图
        if (this.mapNode) {
            // 检查是否已有 MapGenerator，没有则添加
            let mapGen = this.mapNode.getComponent(MapGenerator);
            if (!mapGen) {
                mapGen = this.mapNode.addComponent(MapGenerator);
            }

            // 设置玩家节点引用
            if (this.playerNode) {
                mapGen.playerNode = this.playerNode;
            }
        }

        console.log('✅ 场景初始化完成');
    }

    update(deltaTime: number) {
        // 摄像机跟随玩家
        if (this.mainCamera && this.playerNode) {
            const playerPos = this.playerNode.worldPosition;
            this.mainCamera.node.setPosition(
                playerPos.x,
                playerPos.y,
                this.mainCamera.node.position.z
            );
        }
    }
}
