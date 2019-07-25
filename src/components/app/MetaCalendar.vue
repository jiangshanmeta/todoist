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
                <slot :date="+data.day.split('-').join('')" />
            </div>
        </template>
    </el-calendar>
</template>

<script>
export default {
    data () {
        return {
            canlendarDate: new Date(),
        };
    },
    watch: {
        canlendarDate () {

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
.meta-calendar >>> .el-calendar-day{
    position:relative;
    height:auto;
    min-height:85px;
    display:flex;
}
.meta-calendar >>> .el-calendar-table td{
    padding:0;
}
.meta-calendar-cell{
    width: 100%;
}
.meta-calendar-day{
    padding-bottom:5px;
}
</style>
