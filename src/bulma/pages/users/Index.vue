<template>
    <div>
        <EnsoTable class="box p-0"
            id="users"
            ref="table">
            <template #avatarId="{ row }">
                <avatar class="is-24x24"
                    :user="row"/>
            </template>
        </EnsoTable>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from './components/Avatar.vue';

const canAccess = inject('canAccess');
const i18n = inject('i18n');
</script>
