<template>
    <main>
        {{projectId}}
    </main>
</template>

<script>
export default {
    props:{
        projectId:{
            type:String,
            required:true,
        },
    }
}
</script>
