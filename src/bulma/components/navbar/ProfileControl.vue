<template>
    <core-profile-control>
        <template #default="{ user, hide, isTouch, visitProfile, toggle, visible }">
            <a class="navbar-item"
                @click="visitProfile()"
                v-if="isTouch">
                <avatar :user="user"/>
            </a>
            <div :class="[
                'navbar-item user-profile',
                { 'has-dropdown': !isTouch },
                { 'is-active': visible }
            ]" v-else>
                <a class="navbar-link is-arrowless"
                    @click.stop="toggle()">
                    <avatar :user="user"/>
                    <span class="ml-1">
                        {{ user.person.appellative || user.person.name }}
                    </span>
                </a>
                <div class="navbar-dropdown is-right"
                    v-click-outside="hide"
                    v-if="visible">
                    <div class="user-panel p-2">
                        <avatar class="is-96x96"
                            :user="user"/>
                        <p class="title is-6 mt-3 has-text-centered">
                            {{ user.person.appellative }}
                        </p>
                        <p class="subtitle is-6 mt-3 has-text-centered">
                            {{ user.role.name }}
                        </p>
                    </div>
                    <hr class="navbar-divider">
                    <nav class="level navbar-item">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="button is-small ml-1"
                                    @click="visitProfile(); toggle()">
                                    <span>{{ i18n('Profile') }}</span>
                                    <span class="icon is-small">
                                        <fa :icon="faEye"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <a class="button is-small ml-3"
                                    @click="logout(); toggle()">
                                    <span>{{ i18n('Logout') }}</span>
                                    <span class="icon is-small">
                                        <fa :icon="faRightFromBracket"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </template>
    </core-profile-control>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faEye, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { auth } from '@enso-ui/auth/src/pinia/auth';
import { clickOutside } from '@enso-ui/directives';
import CoreProfileControl from '../../../core/components/navbar/ProfileControl.vue';
import Avatar from '../../pages/users/components/Avatar.vue';

export default {
    name: 'ProfileControl',

    directives: { clickOutside },

    components: { Avatar, CoreProfileControl, Fa },

    inject: ['i18n'],

    data: () => ({
        faEye,
        faRightFromBracket,
    }),

    methods: {
        logout() {
            return auth().logout();
        },
    },
};
</script>

<style lang="scss">
    .user-profile {
        img.is-rounded {
            border-radius: 290486px;
        }

        .navbar-link {
            transition: background-color 0.15s ease, color 0.15s ease;

            .image.avatar {
                img {
                    height: 30px;
                    max-height: 30px;
                }
            }
        }

        .navbar-dropdown {
            min-width: 18.5rem;
            background-color: var(--bulma-navbar-dropdown-background-color);
            border: 1px solid var(--bulma-border);
            box-shadow: none;
            overflow: hidden;
        }

        .user-panel {
            width: 100%;
            background-color: var(--bulma-navbar-dropdown-background-color);
            .image.avatar.is-96x96 {
                img {
                    max-height: 96px;
                }
            }
        }

        .navbar-divider {
            background-color: var(--bulma-border);
        }

        .level.navbar-item {
            background-color: var(--bulma-scheme-main);
        }
    }
</style>
