<template>
    <div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box">
                <template #group_id="props">
                    <form-field v-bind="props"
                        @update:model-value="pivotParams.userGroups.id = $event"/>
                </template>
                <template #role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

import { EnsoForm, FormField } from '@enso-ui/forms/bulma';

defineOptions({ name: 'Create' });

const pivotParams = reactive({ userGroups: { id: null } });
</script>
