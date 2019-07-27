<template>
    <main>
        <ListView
            v-bind="model"
        />
    </main>
</template>

<script>
import model from '@/models/projectModel';
import ListView from '@/components/common/ListView';
import {
    deepFreeze,
} from '@/widget/utility';

export default {
    name: 'ProjectManage',
    config: {
        model: deepFreeze(model),
    },
    components: {
        ListView,
    },
};
</script>
