import Vue from 'vue';
import Vuex from 'vuex';

import {
    getTaskByMonth,
} from '@/server/task';

import {
    getProjectListByIds,
} from '@/server/project';

Vue.use(Vuex);

let cacheMonthMap = {};

export default new Vuex.Store({
    state: {
        taskList: [],
        projectList: [],
    },
    getters: {
        taskMap (state) {
            return state.taskList.reduce((obj, item) => {
                obj[item._id] = true;
                return obj;
            }, Object.create(null));
        },
        taskGroupByDay (state) {
            return state.taskList.reduce((obj, record) => {
                for (let i = 0; i < record.date.length; i++) {
                    const date = record.date[i];
                    (obj[date] || (obj[date] = [])).push(record);
                }
                return obj;
            }, Object.create(null));
        },
        projectMap (state) {
            return state.projectList.reduce((obj, record) => {
                obj[record._id] = record.name;
                return obj;
            }, Object.create(null));
        },
    },
    mutations: {
        clearTaskList (state) {
            state.taskList = [];
            cacheMonthMap = {};
        },
        setTaskList (state, list) {
            state.taskList = list;
        },
        setProjectList (state, list) {
            state.projectList = list;
        },
        clearProjectList (state) {
            state.projectList = [];
        },
    },
    actions: {
        getCurrentMonthTaskList ({
            dispatch,
        }) {
            const date = new Date();
            dispatch('getTaskListByMonth', {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
            });
        },
        getTaskListByMonth ({
            commit,
            state,
            getters,
        }, {
            year, month,
        }) {
            const base = year * 100 + month;
            if (cacheMonthMap[base]) {
                return;
            }
            cacheMonthMap[base] = true;
            getTaskByMonth(year, month).then((docs) => {
                const newTaskList = [
                    ...state.taskList,
                ];
                docs.forEach((record) => {
                    if (!getters.taskMap[record._id]) {
                        newTaskList.push(record);
                    }
                });
                commit('setTaskList', newTaskList);
            });
        },
        getProjectList ({
            state,
            getters,
            commit,
        }, ids) {
            const map = getters.projectMap;
            const needRequestIds = ids.filter((id) => !map[id]);
            if (needRequestIds.length === 0) {
                return Promise.resolve();
            }
            return getProjectListByIds(needRequestIds).then((docs) => {
                commit('setProjectList', [
                    ...state.projectList,
                    ...docs,
                ]);
            });
        },
    },
});
