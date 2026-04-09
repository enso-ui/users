<template>
    <div class="box p-1 mb-2">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="icon is-small m-1"
                        v-tooltip="session.ipAddress">
                        <fa :icon="faLink"/>
                    </span>
                    <span>{{ session.ipAddress }}</span>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <span class="icon is-small mr-1"
                        v-tooltip="lastActivity(session)">
                        <fa :icon="faCalendarDays"/>
                    </span>
                    <span class="icon is-small mr-1"
                        v-tooltip="`${session.OS} version: ${session.OSVersion}`">
                        <fa :icon="os(session)"/>
                    </span>
                    <span class="icon is-small mr-1"
                        v-tooltip="`${session.browser} version: ${session.browserVersion}`">
                        <fa :icon="browser(session)"/>
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
    faTrashCan, faCalendarDays, faLink,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
    faWindows, faLinux, faApple, faAndroid, faChrome,
    faOpera, faInternetExplorer, faFirefoxBrowser, faEdge,
    faUbuntu, faFreebsd, faSafari,
} from '@fortawesome/free-brands-svg-icons';

import Confirmation from '@enso-ui/confirmation/bulma';
import formatDistance from '@enso-ui/ui/src/modules/plugins/date-fns/formatDistance';

export default {
    name: 'Session',

    components: { Confirmation, Fa },

    inject: ['canAccess'],

    props: {
        session: {
            type: Object,
            required: true,
        },
    },

    emits: ['delete'],

    data: () => ({
        faCalendarDays,
        faLink,
        faTrashCan,
        confirmation: false,
    }),

    methods: {
        lastActivity({ lastActivity }) {
            return lastActivity
                ? `last used: ${formatDistance(lastActivity)}`
                : 'Not used yet';
        },
        os({ OS }) {
            switch (OS) {
            case 'Windows':
            case 'Windows NT':
            case 'WindowsPhoneOS':
            case 'WindowsMobileOS':
                return faWindows;
            case 'OS X':
            case 'iOS':
            case 'iPadOS':
            case 'Macintosh':
                return faApple;
            case 'Ubuntu':
                return faUbuntu;
            case 'OpenBSD':
                return faFreebsd;
            case 'Debian':
            case 'Linux':
                return faLinux;
            case 'ChromeOS':
                return faChrome;
            case 'AndroidOS':
                return faAndroid;
            default:
                return faQuestionCircle;
            }
        },
        browser({ browser }) {
            switch (browser) {
            case 'Opera Mini':
            case 'Opera':
                return faOpera;
            case 'Edge':
                return faEdge;
            case 'Chrome':
                return faChrome;
            case 'Mozilla':
            case 'Firefox':
                return faFirefoxBrowser;
            case 'Safari':
                return faSafari;
            case 'IE':
                return faInternetExplorer;

            default:
                return faQuestionCircle;
            }
        },
    },
};
</script>
