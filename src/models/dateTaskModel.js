import fields from './_taskFields';
import {
    getTaskByDate,
} from '@/server/task';

export default {
    fields,
    listConfig: {
        listRequest (cb) {
            getTaskByDate(+this.$route.params.date).then((data) => {
                const projectIds = data.map(item => item.projectId);
                this.$store.dispatch('getProjectList', projectIds).then(() => {
                    cb({
                        data,
                        fieldList: [
                            'name', 'date', 'status', 'projectId',
                        ],
                        total: data.length,
                    });
                });
            });
        },
        paginated: false,
    },
};
