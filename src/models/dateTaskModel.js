import * as taskConfig from './_taskFields';

import {
    getTaskByDate,
    doEditTask,
} from '@/server/task';

const doingOperator = {
    handler (resolve, data) {
        const newData = {
            ...data,
            status: 1,
        };
        doEditTask(newData).then(resolve);
    },
    triggerConfig: {
        text: '开始',
        type: 'danger',
        size: 'small',
    },
};

const doneOperator = {
    handler (resolve, data) {
        const newData = {
            ...data,
            status: 2,
        };
        doEditTask(newData).then(resolve);
    },
    triggerConfig: {
        text: '完成',
        type: 'success',
        size: 'small',
    },
};

const editableFields = [
    'date',
];
const editTimeOperator = {
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
        fieldLayout: [
            [
                'date',
            ],
        ],
        autoValidate: false,
        triggerConfig: {
            text: '更改日期',
            size: 'small',
            type: 'primary',
        },
        dialogConfig: {
            title: '更改日期',
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
};

const fieldList = [
    'name', 'date', 'status', 'projectId',
];

export default {
    fields: taskConfig.default,
    filters: [
        {
            label: '状态',
            field: 'status',
            filterComponent: {
                name: 'FilterEnumSelect',
                config: {
                    alllabel: '不限',
                    allvalue: -1,
                    candidate: taskConfig.statusEnums,
                },
                default: -1,
            },
            watch: true,
        },
    ],
    listConfig: {
        listRequest (cb, query) {
            getTaskByDate(+this.$route.params.date).then((data) => {
                const projectIds = data.map(item => item.projectId);
                if (query.status !== -1) {
                    data = data.filter(item => item.status === query.status);
                }
                this.$store.dispatch('getProjectList', projectIds).then(() => {
                    cb({
                        data,
                        fieldList,
                        total: data.length,
                    });
                });
            });
        },
        paginated: false,
    },
    documentOperators (data) {
        const result = [];
        if (data.status === 0) {
            result.push(doingOperator);
        } else if (data.status === 1) {
            result.push(doneOperator);
        }
        if (data.status < 2) {
            result.push(editTimeOperator);
        }

        return result;
    },
};
