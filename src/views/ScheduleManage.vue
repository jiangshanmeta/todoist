<template>
    <main>
        <MetaCalendar
            @select="handleSelect"
        />
    </main>
</template>

<script>
import MetaCalendar from '@/components/app/MetaCalendar';

export default {
    components: {
        MetaCalendar,
    },
    methods: {
        handleSelect (date) {
            this.$router.push({
                path: `/scheduleDetail/${date}`,
            });
        },
    },
};
</script>
