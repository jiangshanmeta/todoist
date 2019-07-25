<template functional>
    <ul class="view-date-task-ul">
        <li
            v-for="(item,index) in props.taskList"
            :key="item._id"
        >
            {{ index+1 }}.{{ item.name }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        taskList: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.view-date-task-ul{
    margin:0;
    padding:0;
    font-size:12px;
    list-style:none;
}
</style>
