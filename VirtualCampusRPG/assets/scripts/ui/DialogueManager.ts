import { _decorator, Component, Node, Label, Sprite, Button, UITransform } from 'cc';
import { NPC, Dialogue, DialogueOption } from '../data/NPCData';

const { ccclass, property } = _decorator;

/**
 * 对话系统管理器
 * 处理 NPC 对话显示和选项交互
 */
@ccclass('DialogueManager')
export class DialogueManager extends Component {
    @property(Node)
    dialoguePanel: Node | null = null;

    @property(Label)
    npcNameLabel: Label | null = null;

    @property(Label)
    dialogueTextLabel: Label | null = null;

    @property(Node)
    optionsContainer: Node | null = null;

    @property(Node)
    optionButtonPrefab: Node | null = null;

    private _currentNPC: NPC | null = null;
    private _currentDialogue: Dialogue | null = null;
    private _isDialogueActive: boolean = false;

    onLoad() {
        this.hideDialogue();
    }

    /**
     * 开始与 NPC 对话
     */
    startDialogue(npc: NPC) {
        this._currentNPC = npc;
        this._isDialogueActive = true;

        // 显示对话面板
        if (this.dialoguePanel) {
            this.dialoguePanel.active = true;
        }

        // 设置 NPC 名称
        if (this.npcNameLabel) {
            this.npcNameLabel.string = npc.name;
        }

        // 显示第一条对话
        const firstDialogue = npc.dialogues.find(d => d.id === 'greeting') || npc.dialogues[0];
        if (firstDialogue) {
            this.showDialogue(firstDialogue);
        }
    }

    /**
     * 显示对话内容
     */
    showDialogue(dialogue: Dialogue) {
        this._currentDialogue = dialogue;

        // 设置对话文本
        if (this.dialogueTextLabel) {
            this.dialogueTextLabel.string = dialogue.text;
        }

        // 清除旧选项
        this.clearOptions();

        // 创建新选项按钮
        if (dialogue.options && dialogue.options.length > 0) {
            this.createOptionButtons(dialogue.options);
        } else {
            // 没有选项时，点击任意位置关闭
            this.scheduleOnce(() => {
                this.endDialogue();
            }, 2);
        }
    }

    /**
     * 创建选项按钮
     */
    createOptionButtons(options: DialogueOption[]) {
        if (!this.optionsContainer || !this.optionButtonPrefab) return;

        options.forEach((option, index) => {
            const buttonNode = new Node(`Option_${index}`);
            buttonNode.setParent(this.optionsContainer);

            // 添加 Label 组件显示选项文本
            const label = buttonNode.addComponent(Label);
            label.string = `${index + 1}. ${option.text}`;
            label.fontSize = 20;

            // TODO: 添加按钮样式和点击事件
            // 简化版：直接用 Label 点击
            buttonNode.on(Node.EventType.TOUCH_END, () => {
                this.onOptionSelected(option);
            });
        });
    }

    /**
     * 选项被选中
     */
    onOptionSelected(option: DialogueOption) {
        // 执行动作（如果有）
        if (option.action) {
            this.executeAction(option.action);
        }

        // 跳转到下一段对话
        if (option.nextDialogueId && this._currentNPC) {
            const nextDialogue = this._currentNPC.dialogues.find(
                d => d.id === option.nextDialogueId
            );
            if (nextDialogue) {
                this.showDialogue(nextDialogue);
                return;
            }
        }

        // 没有下一段，结束对话
        this.endDialogue();
    }

    /**
     * 执行对话动作
     */
    executeAction(action: string) {
        console.log(`执行动作: ${action}`);
        // TODO: 实现各种动作，如给予物品、触发任务等
    }

    /**
     * 清除选项按钮
     */
    clearOptions() {
        if (this.optionsContainer) {
            this.optionsContainer.removeAllChildren();
        }
    }

    /**
     * 结束对话
     */
    endDialogue() {
        this._isDialogueActive = false;
        this._currentNPC = null;
        this._currentDialogue = null;
        this.hideDialogue();
    }

    /**
     * 隐藏对话面板
     */
    hideDialogue() {
        if (this.dialoguePanel) {
            this.dialoguePanel.active = false;
        }
    }

    /**
     * 检查是否正在对话
     */
    isActive(): boolean {
        return this._isDialogueActive;
    }
}
