import { _decorator, Component, Node, Vec3, input, Input, KeyCode, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 玩家角色控制器
 * 处理移动、动画和交互
 */
@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    moveSpeed: number = 200;

    @property
    gridSize: number = 32;

    private _velocity: Vec3 = new Vec3();
    private _isMoving: boolean = false;
    private _targetPosition: Vec3 = new Vec3();
    private _inputDirection: { x: number; y: number } = { x: 0, y: 0 };

    // 移动状态
    private _keys: Map<KeyCode, boolean> = new Map();

    onLoad() {
        // 注册键盘事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        this._keys.set(event.keyCode, true);
        this.updateInputDirection();
    }

    onKeyUp(event: EventKeyboard) {
        this._keys.set(event.keyCode, false);
        this.updateInputDirection();
    }

    updateInputDirection() {
        // 重置方向
        this._inputDirection.x = 0;
        this._inputDirection.y = 0;

        // WASD 或方向键控制
        if (this._keys.get(KeyCode.KEY_W) || this._keys.get(KeyCode.ARROW_UP)) {
            this._inputDirection.y = 1;
        }
        if (this._keys.get(KeyCode.KEY_S) || this._keys.get(KeyCode.ARROW_DOWN)) {
            this._inputDirection.y = -1;
        }
        if (this._keys.get(KeyCode.KEY_A) || this._keys.get(KeyCode.ARROW_LEFT)) {
            this._inputDirection.x = -1;
        }
        if (this._keys.get(KeyCode.KEY_D) || this._keys.get(KeyCode.ARROW_RIGHT)) {
            this._inputDirection.x = 1;
        }
    }

    update(deltaTime: number) {
        // 平滑移动
        if (this._inputDirection.x !== 0 || this._inputDirection.y !== 0) {
            const pos = this.node.position;
            const moveX = this._inputDirection.x * this.moveSpeed * deltaTime;
            const moveY = this._inputDirection.y * this.moveSpeed * deltaTime;

            this.node.setPosition(
                pos.x + moveX,
                pos.y + moveY,
                pos.z
            );

            // TODO: 添加边界检测和碰撞检测
        }
    }

    /**
     * 与建筑物交互
     */
    interact() {
        // TODO: 检测附近的可交互对象
        console.log('Player attempting to interact...');
    }

    /**
     * 设置玩家位置（传送）
     */
    setGridPosition(gridX: number, gridY: number) {
        this.node.setPosition(
            gridX * this.gridSize,
            gridY * this.gridSize,
            0
        );
    }
}
