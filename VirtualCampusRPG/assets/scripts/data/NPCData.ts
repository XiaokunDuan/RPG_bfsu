/**
 * NPC 数据
 * 校园内的可交互角色
 */

export enum NPCType {
    Teacher = 'teacher',
    Student = 'student',
    Staff = 'staff',
    Special = 'special'
}

export interface NPC {
    id: string;
    name: string;
    type: NPCType;
    location: string;      // 建筑物 ID
    avatar?: string;       // 头像资源路径
    dialogues: Dialogue[];
}

export interface Dialogue {
    id: string;
    text: string;
    options?: DialogueOption[];
}

export interface DialogueOption {
    text: string;
    nextDialogueId?: string;
    action?: string;
}

// 校园 NPC 数据
export const CAMPUS_NPCS: NPC[] = [
    {
        id: 'teacher_zhang',
        name: '张教授',
        type: NPCType.Teacher,
        location: 'main_building',
        dialogues: [
            {
                id: 'greeting',
                text: '你好，同学！欢迎来到北外。我是张教授，专门研究国际关系。有什么可以帮助你的吗？',
                options: [
                    { text: '您能介绍一下北外吗？', nextDialogueId: 'intro' },
                    { text: '我想了解课程情况', nextDialogueId: 'courses' },
                    { text: '再见！' }
                ]
            },
            {
                id: 'intro',
                text: '北京外国语大学是中国最著名的外语类高校之一，培养了无数外交官和翻译人才。"兼容并蓄，博学笃行"是我们的校训。',
                options: [
                    { text: '听起来很棒！', nextDialogueId: 'greeting' }
                ]
            },
            {
                id: 'courses',
                text: '我们开设了近百种语言课程，从常见的英语、法语、德语，到小语种如斯瓦希里语、僧伽罗语。你对哪个方向感兴趣？',
                options: [
                    { text: '谢谢老师！', nextDialogueId: 'greeting' }
                ]
            }
        ]
    },
    {
        id: 'librarian_wang',
        name: '王馆长',
        type: NPCType.Staff,
        location: 'library',
        dialogues: [
            {
                id: 'greeting',
                text: '欢迎来到北外图书馆！这里藏有超过150万册图书，包括大量珍贵的外文原版资料。',
                options: [
                    { text: '这里有什么特色馆藏？', nextDialogueId: 'collection' },
                    { text: '借书需要什么证件？', nextDialogueId: 'borrow' },
                    { text: '谢谢，我先看看' }
                ]
            },
            {
                id: 'collection',
                text: '我们最引以为豪的是多语种词典收藏，以及各国文学原著。四楼还有专门的联合国资料区！',
                options: [
                    { text: '太棒了！' }
                ]
            },
            {
                id: 'borrow',
                text: '学生只需要校园卡就可以借阅。普通图书可借30天，续借一次。期刊阅览室只能室内阅读哦。',
                options: [
                    { text: '明白了，谢谢！' }
                ]
            }
        ]
    },
    {
        id: 'student_helper',
        name: '学姐小李',
        type: NPCType.Student,
        location: 'main_building',
        dialogues: [
            {
                id: 'greeting',
                text: '嗨！我是大三的学姐，英语专业的。新生吧？需要我带你逛逛校园吗？',
                options: [
                    { text: '好呀！有什么推荐去的地方？', nextDialogueId: 'recommend' },
                    { text: '学姐有什么选课建议吗？', nextDialogueId: 'advice' },
                    { text: '谢谢学姐，我自己转转' }
                ]
            },
            {
                id: 'recommend',
                text: '一定要去图书馆四楼看看，视野超好！小碧池边的长椅是约会圣地哦~（偷笑）食堂的话，二楼的麻辣香锅很不错！',
                options: [
                    { text: '谢谢学姐的推荐！' }
                ]
            },
            {
                id: 'advice',
                text: '第一学期先打好语言基础，选修课可以选一些有趣的，比如电影赏析之类的。对了，外教的课一定要选，超有意思！',
                options: [
                    { text: '受教了！' }
                ]
            }
        ]
    },
    {
        id: 'chef_li',
        name: '李师傅',
        type: NPCType.Staff,
        location: 'cafeteria',
        dialogues: [
            {
                id: 'greeting',
                text: '同学来啦！今天想吃点什么？我们食堂可是北外最大的，各地口味都有！',
                options: [
                    { text: '有什么推荐的吗？', nextDialogueId: 'recommend' },
                    { text: '这里营业到几点？', nextDialogueId: 'hours' },
                    { text: '我随便看看' }
                ]
            },
            {
                id: 'recommend',
                text: '一楼有基本款盖饭炒菜，二楼有特色窗口——川菜、清真、韩餐都有。三楼晚上还开小炒！',
                options: [
                    { text: '听着就饿了！' }
                ]
            },
            {
                id: 'hours',
                text: '早餐7点到9点，午餐11点到1点半，晚餐5点到7点半。夜宵的话，校门口有很多小店！',
                options: [
                    { text: '好的，谢谢！' }
                ]
            }
        ]
    },
    {
        id: 'club_president',
        name: '社团联合会主席',
        type: NPCType.Student,
        location: 'student_center',
        dialogues: [
            {
                id: 'greeting',
                text: '欢迎来到学生活动中心！北外有上百个学生社团，从模拟联合国到街舞社应有尽有。想加入哪个？',
                options: [
                    { text: '有什么热门社团？', nextDialogueId: 'popular' },
                    { text: '怎么创建新社团？', nextDialogueId: 'create' },
                    { text: '我再考虑考虑' }
                ]
            },
            {
                id: 'popular',
                text: '模联、外研社、话剧社是老牌强社。近几年电竞社和摄影协会也很火！每年社团招新在开学第一周，千万别错过！',
                options: [
                    { text: '太丰富了！' }
                ]
            },
            {
                id: 'create',
                text: '需要找到一位指导老师，再召集至少20名创始成员，向团委提交申请。有想法的话，我可以帮你对接！',
                options: [
                    { text: '好的，我有想法了会来找你！' }
                ]
            }
        ]
    }
];

/**
 * 根据 ID 获取 NPC
 */
export function getNPCById(id: string): NPC | undefined {
    return CAMPUS_NPCS.find(npc => npc.id === id);
}

/**
 * 获取某建筑内的所有 NPC
 */
export function getNPCsByLocation(locationId: string): NPC[] {
    return CAMPUS_NPCS.filter(npc => npc.location === locationId);
}
