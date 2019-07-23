import {
    getProjectList,
    doCreateProject,
    doDeleteProject,
} from '@/server/project';

import {
    enumArr2Hash,
} from '@/widget/utility';

const statusEnums = [
    {
        label: '未开始',
        value: 0,
    },
    {
        label: '进行中',
        value: 1,
    },
    {
        label: '结束',
        value: 2,
    },
    {
        label: '暂停',
        value: 3,
    },
];

export default {
    fields: {
        _id: {
            labelName: 'id',
        },
        name: {
            labelName: '项目名称',
            editor: {
                name: 'EditorString',
                default: '',
            },
        },
        status: {
            labelName: '状态',
            editor: {
                name: 'EditorEnumSelect',
                config: {
                    candidate: statusEnums,
                    default: statusEnums[0],
                },
            },
            view: {
                component: () => import('@/components/common/Views/ViewEnum').then((rst) => rst.default),
                config: {
                    enums: enumArr2Hash(statusEnums),
                },
            },
        },
        createTS: {
            labelName: '创建时间',
            view: {
                handler (ts) {
                    const date = new Date(ts);
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                },
            },
        },

    },
    listOperators: [
        {
            name: 'ListOperatorCreate',
            component: () => import('@/components/common/ListOperators/ListOperatorCreate').then((rst) => rst.default),
            config: {
                getCreateFields (cb) {
                    cb([
                        'name', 'status',
                    ]);
                },
                doCreateRequest: (cb, data) => {
                    data.createTS = Date.now();
                    doCreateProject(data).then(cb);
                },
                fieldLayout: [
                    [
                        'name',
                    ],
                    [
                        'status',
                    ],
                ],
                triggerConfig: {
                    text: '新建项目',
                    type: 'success',
                },
                dialogConfig: {
                    title: '新建项目',
                },
                createBtnConfig: {
                    text: '确认创建',
                    type: 'primary',
                },
                cancelBtnConfig: {
                    text: '取消',
                },

            },
        },
    ],
    filters: [
        {
            label: '状态',
            field: 'status',
            filterComponent: {
                name: 'FilterEnumSelect',
                config: {
                    alllabel: '不限',
                    allvalue: -1,
                    candidate: statusEnums,
                },
                default: -1,
            },
            watch: true,
        },
    ],
    filterOperators: [],
    listConfig: {
        listRequest (cb, params) {
            getProjectList(params).then((data) => {
                cb({
                    data,
                    fieldList: [
                        'name', 'status', 'createTS',
                    ],
                    total: data.length,
                });
            });
        },
        paginated: false,
    },
    recordOperators: [
        {
            handler (resolve, data) {
                this.$router.push({
                    path: `/projectDetail/${data._id}`,
                });
            },
            triggerConfig: {
                text: '详情',
                size: 'small',
                type: 'primary',
            },
        },

        {
            name: 'RecordOperatorDelete',
            component: () => import('@/components/common/RecordOperators/RecordOperatorDelete').then((rst) => rst.default),
            config: {
                doDeleteRequest (cb, data) {
                    doDeleteProject(data._id).then(cb).catch(() => {
                        this.$message({
                            type: 'danger',
                            message: '需要删除项目的所有任务',
                        });
                    });
                },
                triggerConfig: {
                    text: '删除项目',
                    type: 'danger',
                    size: 'small',
                },
            },
        },
    ],
};
