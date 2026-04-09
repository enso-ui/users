<template>
    <div class="tokens-wrapper">
        <div class="field is-grouped">
            <p class="control">
                <a class="button is-rounded is-small is-info has-text-weight-bold"
                    @click="form = true"
                    v-if="canAccess('administration.users.tokens.create')">
                    <span>
                        {{ i18n('New Token') }}
                    </span>
                    <span class="icon">
                        <fa :icon="faPlus"/>
                    </span>
                </a>
            </p>
            <p class="control has-icons-left has-icons-right is-expanded">
                <input v-model="query"
                    class="input is-rounded is-small is-expanded"
                    type="text"
                    :placeholder="i18n('Filter')">
                <span class="icon is-small is-left">
                    <fa :icon="faSearch"/>
                </span>
                <span v-if="query"
                    class="icon is-small is-right clear-button"
                    @click="query = ''">
                    <a class="delete is-small"/>
                </span>
            </p>
            <p class="control">
                <a class="button is-rounded is-small ml-2 has-text-weight-bold"
                    @click="fetch()">
                    <span>
                        {{ i18n('Reload') }}
                    </span>
                    <span class="icon">
                        <fa :icon="faArrowsRotate"/>
                    </span>
                </a>
            </p>
        </div>
        <div>
            <div v-for="(filteredToken, index) in filtered"
                :key="filteredToken.id">
                <token :id="id"
                    :token="filteredToken"
                    @delete="destroy(filteredToken, index)"/>
            </div>
        </div>
        <token-form :path="create"
            @close="form = false"
            @submit="onCreate"
            ref="form"
            v-if="form"/>
        <url :show="token !== ''"
            :link="token"
            @close="token = ''"/>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faPlus, faArrowsRotate, faSearch } from '@fortawesome/free-solid-svg-icons';
import Url from './Url.vue';
import Token from './Token.vue';
import TokenForm from './TokenForm.vue';

export default {
    name: 'Tokens',

    components: {
        Fa,
        Token,
        TokenForm,
        Url,
    },

    inject: ['canAccess', 'errorHandler', 'http', 'i18n', 'route', 'toastr'],

    props: {
        id: {
            type: [Number, String],
            required: true,
        },
    },

    emits: ['remove', 'update'],

    data: () => ({
        faArrowsRotate,
        faPlus,
        faSearch,
        tokens: [],
        query: '',
        form: false,
        token: '',
    }),

    computed: {
        filtered() {
            const query = this.query.toLowerCase();

            return query
                ? this.tokens.filter(({ name }) => name.toLowerCase().indexOf(query) > -1)
                : this.tokens;
        },
        count() {
            return this.filtered.length;
        },
        create() {
            return this.route(
                'administration.users.tokens.create',
                this.$route.params,
            );
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.http.get(this.route('administration.users.tokens.index', this.$route.params))
                .then(({ data }) => {
                    this.tokens = data;
                    this.$emit('update');
                }).catch(this.errorHandler);
        },
        destroy({ id }, index) {
            this.http.delete(
                this.route('administration.users.tokens.destroy', this.$route.params),
                { params: { id } },
            ).then(({ data }) => {
                const deletedToken = this.tokens.splice(index, 1).pop();
                this.$emit('remove', deletedToken.id);
                this.$emit('update');
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
        onCreate({ token }) {
            this.fetch();
            this.form = false;
            setTimeout(() => {
                this.token = token;
            }, 500);
        },
    },
};
</script>
