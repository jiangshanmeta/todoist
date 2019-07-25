<template>
    <div id="app">
        <el-menu
            mode="horizontal"
            router
        >
            <el-menu-item
                index="/projectManage"
            >
                项目管理
            </el-menu-item>
            <el-menu-item
                index="/scheduleManage"
            >
                日程管理
            </el-menu-item>
            <el-menu-item
                index="/"
            >
                今日任务
            </el-menu-item>
        </el-menu>
        <router-view class="app-main" />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style scoped>
#app{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}
.app-main{
    flex-grow:1;
    max-width:100%;
    padding:15px;
}
</style>
