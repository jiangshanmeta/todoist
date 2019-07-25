import {
    getTaskList,
    doCreateTask,
    doEditTask,
    doDeleteTask,
} from '@/server/task';

import EditorTaskDate from '@/components/task/Editors/EditorTaskDate';

const editableFields = [
    'name', 'date',
];

const fieldLayout = [
    [
        'name',
    ],
    [
        'date',
    ],
];

export default {
    fields: {
        _id: {
            labelName: 'id',
        },
        name: {
            labelName: '名称',
            editor: {
                name: 'EditorString',
                default: '',
            },
        },
        projectId: {
            labelName: 'projectId',
        },
        date: {
            labelName: '时间',
            editor: {
                name: 'EditorTaskDate',
                component: EditorTaskDate,
                default () {
                    return [];
                },
            },
            view: {
                handler (date) {
                    return date.join(' , ');
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
                    cb(editableFields);
                },
                doCreateRequest (cb, data) {
                    data.projectId = this.$route.params.projectId;
                    doCreateTask(data).then(cb);
                },
                fieldLayout,
                triggerConfig: {
                    text: '新建任务',
                    type: 'success',
                },
                dialogConfig: {
                    title: '新建任务',
                    fullscreen: true,
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
    filters: [],
    filterOperators: [],
    listConfig: {
        listRequest (cb) {
            const query = {
                projectId: this.$route.params.projectId,
            };

            getTaskList(query).then((data) => {
                cb({
                    data,
                    fieldList: [
                        'name', 'date',
                    ],
                    total: data.length,
                });
            });
        },
        paginated: false,
    },
    recordOperators: [
        {
            name: 'RecordOperatorEdit',
            component: () => import('@/components/common/RecordOperators/RecordOperatorEdit').then((rst) => rst.default),
            config: {
                getEditInfo (cb, data) {
                    cb({
                        editableFields,
                        record: JSON.parse(JSON.stringify(data)),
                    });
                },
                doEditRequest (cb, data) {
                    doEditTask(data).then(cb);
                },
                fieldLayout,
                autoValidate: false,
                triggerConfig: {
                    text: '编辑任务',
                    size: 'small',
                    type: 'primary',
                },
                dialogConfig: {
                    title: '编辑任务',
                    fullscreen: true,
                },
                editBtnConfig: {
                    type: 'primary',
                    text: '确定编辑',
                },
                cancelBtnConfig: {
                    text: '取消',
                },
            },
        },
        {
            name: 'RecordOperatorDelete',
            component: () => import('@/components/common/RecordOperators/RecordOperatorDelete').then((rst) => rst.default),
            config: {
                doDeleteRequest (cb, data) {
                    doDeleteTask(data._id).then(cb);
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
