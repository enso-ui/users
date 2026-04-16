<template>
    <div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box"
                ref="form"
                @ready="handleReady">
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
                        @keydown="emit('update')"
                        v-if="!props.field.meta.hidden"/>
                </template>
                <template #actions-left>
                    <action tag="a"
                        :button="{
                            class: 'is-dark',
                            icon: faUserTie,
                            label: 'Edit Person',
                        }"
                        @click="editPerson"
                        v-if="ready"/>
                    <action tag="a"
                        :button="{
                            class: 'is-dark',
                            icon: faRotateLeft,
                            label: 'Reset Password',
                        }"
                        @click="resetPassword"
                        v-if="canAccess('administration.users.resetPassword')"/>
                </template>
            </enso-form>
            <accessories>
                <template #default="{ count }">
                    <tab keep-alive
                        v-if="canAccessTokens"
                        id="Tokens">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <tokens :id="route.params.user"
                                    @update="count.Tokens = tokensRef.count"
                                    ref="tokensRef"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        v-if="canAccessSessions"
                        id="Sessions">
                        <div class="columns is-centered">
                            <div class="column is-half">
                                <sessions :id="route.params.user"
                                    @update="count.Sessions = sessionsRef.count"
                                    ref="sessionsRef"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { faUserTie, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { EnsoForm, FormField, Action } from '@enso-ui/forms/bulma';
import Accessories from '@enso-ui/accessories/bulma';
import { Tab } from '@enso-ui/tabs/bulma';
import { PasswordStrength } from '@enso-ui/auth';
import { useStore } from '../../../utils/pinia';
import Tokens from './components/Tokens.vue';
import Sessions from './components/Sessions.vue';

defineOptions({ name: 'Edit' });

const canAccess = inject('canAccess');
const errorHandler = inject('errorHandler');
const http = inject('http');
const routeHelper = inject('route');
const routerErrorHandler = inject('routerErrorHandler');
const toastr = inject('toastr');

const emit = defineEmits(['update']);

const route = useRoute();
const router = useRouter();

const form = ref(null);
const tokensRef = ref(null);
const sessionsRef = ref(null);
const password = ref(null);
const passwordConfirmation = ref(null);
const ready = ref(false);
const pivotParams = reactive({ userGroups: { id: null } });

const enums = computed(() => useStore('enums').enums);
const user = computed(() => useStore('app').user);

const canAccessSessions = computed(() => canAccess('administration.users.sessions.index')
    && (`${user.value.role.id}` === enums.value.roles.Admin
    || user.value.id === route.params.user));

const canAccessTokens = computed(() => canAccess('administration.users.tokens.index'));
const personId = computed(() => form.value?.param('personId'));

const handleReady = ({ form: ensoForm }) => {
    ready.value = true;
    pivotParams.userGroups.id = ensoForm.field('group_id').value;
};

const editPerson = () => router.push({
    name: 'administration.people.edit',
    params: { person: personId.value },
}).catch(routerErrorHandler);

const resetPassword = () => {
    http.post(routeHelper('administration.users.resetPassword', route.params))
        .then(({ data }) => toastr.success(data.message))
        .catch(errorHandler);
};
</script>
