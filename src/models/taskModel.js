import {
    getTaskList,
    doCreateTask,
    doEditTask,
    doDeleteTask,
} from '@/server/task';

import fields from './_taskFields';

const editableFields = [
    'name', 'date', 'status',
];

const fieldLayout = [
    [
        'name', 'status',
    ],
    [
        'date',
    ],
];

export default {
    fields,
    collectionOperators: [
        {
            name: 'CollectionOperatorCreate',
            component: () => import('@/components/common/CollectionOperators/CollectionOperatorCreate').then((rst) => rst.default),
            config: {
                getCreateFields (cb) {
                    cb(editableFields);
                },
                doCreateRequest (cb, data) {
                    data.projectId = this.$route.params.projectId;
                    doCreateTask(data).then(cb);
                    this.$store.commit('clearTaskList');
                    this.$store.dispatch('getCurrentMonthTaskList');
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
                        'name', 'date', 'status',
                    ],
                    total: data.length,
                });
            });
        },
        paginated: false,
    },
    documentOperators: [
        {
            name: 'DocumentOperatorEdit',
            component: () => import('@/components/common/DocumentOperators/DocumentOperatorEdit').then((rst) => rst.default),
            config: {
                getEditInfo (cb, data) {
                    cb({
                        editableFields,
                        record: JSON.parse(JSON.stringify(data)),
                    });
                },
                doEditRequest (cb, data) {
                    doEditTask(data).then(cb);
                    this.$store.commit('clearTaskList');
                    this.$store.dispatch('getCurrentMonthTaskList');
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
            name: 'DocumentOperatorDelete',
            component: () => import('@/components/common/DocumentOperators/DocumentOperatorDelete').then((rst) => rst.default),
            config: {
                doDeleteRequest (cb, data) {
                    doDeleteTask(data._id).then(cb);
                    this.$store.commit('clearTaskList');
                    this.$store.dispatch('getCurrentMonthTaskList');
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
