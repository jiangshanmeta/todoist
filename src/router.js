import Vue from 'vue';
import Router from 'vue-router';

import ProjectManage from '@/views/ProjectManage';
import ProjectDetail from '@/views/ProjectDetail';
import ScheduleManage from '@/views/ScheduleManage';
import ScheduleDetail from '@/views/ScheduleDetail';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/projectManage',
            component: ProjectManage,
        },
        {
            path: '/projectDetail/:projectId',
            component: ProjectDetail,
            props: true,
        },
        {
            path: '/scheduleManage',
            component: ScheduleManage,
        },
        {
            path: '/scheduleDetail/:date',
            component: ScheduleDetail,
            props: true,
        },
        {
            path: '/',
            redirect: () => {
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `/scheduleDetail/${year}${month}${day}`;
            },
        },
    ],
});
