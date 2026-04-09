<template>
    <div class="box p-1 mb-2">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="icon is-small m-1"
                        v-tooltip="token.name">
                        <fa :icon="faKey"/>
                    </span>
                    <span>
                        {{ token.name }}
                    </span>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <span class="icon is-small"
                        v-tooltip="lastUsed(token)">
                        <fa :icon="faCalendarDays"/>
                    </span>
                    <span class="is-pulled-right is-flex">
                        <confirmation placement="top"
                            @show="confirmation = true"
                            @hide="confirmation = false"
                            @confirm="$emit('delete')">
                            <a class="button is-naked is-small">
                                <span class="icon">
                                    <fa :icon="faTrashCan"/>
                                </span>
                            </a>
                        </confirmation>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import {
    faTrashCan, faCalendarDays, faKey,
} from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import formatDistance from '@enso-ui/ui/src/modules/plugins/date-fns/formatDistance';

export default {
    name: 'Token',

    components: { Confirmation, Fa },

    inject: ['canAccess'],

    props: {
        token: {
            type: Object,
            required: true,
        },
    },

    emits: ['delete'],

    data: () => ({
        faCalendarDays,
        faKey,
        faTrashCan,
        confirmation: false,
    }),

    methods: {
        lastUsed({ lastUsedAt }) {
            return lastUsedAt
                ? `last used: ${formatDistance(lastUsedAt)}`
                : 'Not used yet';
        },
    },
};
</script>
