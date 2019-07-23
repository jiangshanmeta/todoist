<template>
    <main>
        {{ date }} || {{ typeof date }}
    </main>
</template>

<script>
export default {
    props: {
        date: {
            type: Number,
            required: true,
        },
    },
};
</script>
