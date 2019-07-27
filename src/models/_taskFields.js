import EditorTaskDate from '@/components/task/Editors/EditorTaskDate';

import {
    enumArr2Hash,
} from '@/widget/utility';

import Vue from 'vue';

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
        label: '完成',
        value: 2,
    },
];

export default {
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
        view: {
            component: () => import('@/components/common/Views/ViewLink').then(rst => rst.default),
            config: {
                getLink (projectId) {
                    return `/projectDetail/${projectId}`;
                },
                getText (projectId) {
                    return this.$store.getters.projectMap[projectId];
                },
                tag: 'span',
            },
        },
    },
    date: {
        labelName: '时间',
        editor: {
            name: 'EditorTaskDate',
            component: Vue.extend(EditorTaskDate),
            default () {
                return [];
            },
        },
        view: {
            handler (date) {
                return date.join(' , ');
            },
        },
        colspan: {
            default: 3,
        },
    },
    status: {
        labelName: '状态',
        editor: {
            name: 'EditorEnumSelect',
            config: {
                candidate: statusEnums,
            },
            default: statusEnums[0].value,
        },
        view: {
            component: () => import('@/components/common/Views/ViewEnum').then((rst) => rst.default),
            config: {
                enums: enumArr2Hash(statusEnums),
            },
        },

    },
};
