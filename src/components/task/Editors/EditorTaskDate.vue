<template>
    <section>
        <div>
            共计 <b>{{ value.length }}</b> 天
        </div>
        <MetaCalendar
            @select="handleSelect"
        >
            <template v-slot:default="{date}">
                <div :class="value.includes(date)?'is-selected':''" />
            </template>
        </MetaCalendar>
    </section>
</template>

<script>
import MetaCalendar from '@/components/app/MetaCalendar';

export default {
    components: {
        MetaCalendar,
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleSelect (date) {
            const index = this.value.indexOf(date);
            const newValue = [
                ...this.value,
            ];
            if (index === -1) {
                newValue.push(date);
            } else {
                newValue.splice(index, 1);
            }
            this.$emit('input', newValue);
        },
    },
};
</script>

<style scoped>
.is-selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 0, 0.5);
}
</style>
