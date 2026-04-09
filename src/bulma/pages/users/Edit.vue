<template>
    <div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box"
                ref="form"
                @ready="
                    ready = true;
                    pivotParams.userGroups.id = $event.form.field('group_id').value;
                ">
                <template #group_id="props">
                    <form-field v-bind="props"
                        @update:model-value="pivotParams.userGroups.id = $event"/>
                </template>
                <template #role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
                <template #password="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @update:model-value="password = $event.target.value"
                        v-if="!props.field.meta.hidden"/>
                    <password-strength class="mt-1"
                        :password="props.field.value"/>
                </template>
                <template #password_confirmation="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @update:model-value="passwordConfirmation = $event.target.value"
                        @keydown="$emit('update');"
                        v-if="!props.field.meta.hidden"/>
                </template>
                <template #actions-left>
                    <div class="level-item">
                        <a class="button is-warning"
                            @click="$router.push({
                                name: 'administration.people.edit',
                                params: { person: $refs.form.param('personId') }
                            }).catch(routerErrorHandler)"
                            v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Edit Person') }}
                            </span>
                            <span class="icon">
                                <fa :icon="faUserTie"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item"
                        v-if="canAccess('administration.users.resetPassword')">
                        <a class="button is-black"
                           @click="resetPassword"
                           v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Reset Password') }}
                            </span>
                            <span class="icon">
                                <fa :icon="faRotateRight"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                </template>
            </enso-form>
            <accessories>
                <template #default="{ count }">
                    <tab keep-alive
                        v-if="canAccessTokens"
                        id="Tokens">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <tokens :id="$route.params.user"
                                    @update="count.Tokens = $refs.tokens.count"
                                    ref="tokens"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        v-if="canAccessSessions"
                        id="Sessions">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <sessions :id="$route.params.user"
                                    @update="count.Sessions = $refs.sessions.count"
                                    ref="sessions"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import {
    faRotateRight, faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import Accessories from '@enso-ui/accessories/bulma';
import { Tab } from '@enso-ui/tabs/bulma';
import { PasswordStrength } from '@enso-ui/auth';
import { useStore } from '../../../utils/pinia';
import Tokens from './components/Tokens.vue';
import Sessions from './components/Sessions.vue';

export default {
    name: 'Edit',

    components: {
        Accessories,
        EnsoForm,
        Fa,
        FormField,
        PasswordStrength,
        Sessions,
        Tab,
        Tokens,
    },

    inject: [
        'http', 'i18n', 'canAccess', 'errorHandler', 'route',
        'routerErrorHandler', 'toastr',
    ],

    emits: ['update'],

    data: () => ({
        faRotateRight,
        faUserTie,
        ready: false,
        pivotParams: { userGroups: { id: null } },
        password: null,
        passwordConfirmation: null,
    }),

    computed: {
        enums() {
            return useStore('enums').enums;
        },
        user() {
            return useStore('app').user;
        },
        canAccessSessions() {
            return this.canAccess('administration.users.sessions.index')
                && (`${this.user.role.id}` === this.enums.roles.Admin
                || this.user.id === this.$route.params.user);
        },
        canAccessTokens() {
            return this.canAccess('administration.users.tokens.index');
        },
    },

    methods: {
        navigateToIndex() {
            this.$nextTick(() => this.$router
                .push({ name: 'administration.users.index' })
                .catch(this.routerErrorHandler));
        },
        resetPassword() {
            this.http.post(this.route('administration.users.resetPassword', this.$route.params))
                .then(({ data }) => this.toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>
