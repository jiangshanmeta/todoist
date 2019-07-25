<template functional>
    <router-link
        :to="`/projectDetail/${props.data}`"
    >
        {{ parent.$store.getters.projectMap[props.data] }}
    </router-link>
</template>

<script>
export default {
    props: {
        data: {
            type: String,
            required: true,
        },
    },
};
</script>
