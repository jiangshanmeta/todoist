<template>
    <main>
        <ListView
            v-bind="model"
        />
    </main>
</template>

<script>
import model from "@/models/projectModel"
import ListView from "@/components/common/ListView"

export default {
    name:'ProjectManage',
    config:{
        model,
    },
    components:{
        ListView,
    },
}
</script>
