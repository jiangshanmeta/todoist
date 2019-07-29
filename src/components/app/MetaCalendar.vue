<template>
    <el-calendar
        v-model="canlendarDate"
        class="meta-calendar"
    >
        <template
            v-slot:dateCell="{date, data}"
        >
            <div
                class="meta-calendar-cell"
                @click="handleClick(data.day)"
            >
                <div class="meta-calendar-day">
                    {{ data.day.split('-').pop() }}
                </div>

                <ViewDateTask
                    v-if="$store.getters.taskGroupByDay[data.day.split('-').join('')]"
                    :task-list="$store.getters.taskGroupByDay[data.day.split('-').join('')]"
                />

                <slot :date="+data.day.split('-').join('')" />
            </div>
        </template>
    </el-calendar>
</template>

<script>
import ViewDateTask from './ViewDateTask';

export default {
    components: {
        ViewDateTask,
    },
    data () {
        return {
            canlendarDate: new Date(),
        };
    },
    watch: {
        canlendarDate: {
            handler () {
                this.$store.dispatch('getTaskListByMonth', {
                    year: this.canlendarDate.getFullYear(),
                    month: this.canlendarDate.getMonth() + 1,
                });
            },
            immediate: true,
        },
    },
    methods: {
        handleClick (day) {
            this.$emit('select', +day.split('-').join(''));
        },
    },
};
</script>

<style scoped>
.meta-calendar >>> .el-calendar-day {
    position: relative;
    height: auto;
    min-height: 85px;
    display: flex;
}

.meta-calendar >>> .el-calendar-table td {
    padding: 0;
}

.meta-calendar-cell {
    width: 100%;
}

.meta-calendar-day {
    padding-bottom: 5px;
}
</style>
