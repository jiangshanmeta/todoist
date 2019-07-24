<template>
    <main>
        <h2 v-if="projectInfo">{{projectInfo.name}}</h2>
        <ListView v-bind="taskModel"/>
    </main>
</template>

<script>
import {
    getProjectInfo
} from "@/server/project"

import taskModel from "@/models/taskModel"
import ListView from "@/components/common/ListView"

export default {
    config:{
        taskModel,
    },
    components:{
        ListView,
    },
    props:{
        projectId:{
            type:String,
            required:true,
        },
    },
    data(){
        return {
            projectInfo:null,
        };
    },
    created(){
        getProjectInfo(this.projectId).then((doc)=>{
            this.projectInfo = doc;
        });
    },
}
</script>
