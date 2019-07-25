import Vue from 'vue';
import Vuex from 'vuex';

import {
    getTaskByMonth,
} from '@/server/task';

Vue.use(Vuex);

let cacheMonthMap = {};

export default new Vuex.Store({
    state: {
        taskList: [],
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
    },
    mutations: {
        clearTaskList (state) {
            state.taskList = [];
            cacheMonthMap = {};
        },
        setTaskList (state, list) {
            state.taskList = list;
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
    },
});
