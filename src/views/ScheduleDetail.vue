<template>
    <main>
        <h1>{{ titleDate }}</h1>
        <ListView v-bind="dateTaskModel" />
    </main>
</template>

<script>
import ListView from '@/components/common/ListView';
import dateTaskModel from '@/models/dateTaskModel';
import {
    deepFreeze,
} from '@/widget/utility';

export default {
    components: {
        ListView,
    },
    props: {
        date: {
            type: String,
            required: true,
        },
    },
    config: {
        dateTaskModel: deepFreeze(dateTaskModel),
    },
    computed: {
        titleDate () {
            return `${this.date.slice(0, 4)}-${this.date.slice(4, 6)}-${this.date.slice(-2)}`;
        },
    },
};
</script>
