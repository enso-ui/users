<script>
import { app } from '@enso-ui/ui/src/pinia/app';
import { layout } from '@enso-ui/ui/src/pinia/layout';

export default {
    name: 'CoreProfileControl',

    inject: ['route', 'routerErrorHandler'],

    data: () => ({
        visible: false,
    }),

    methods: {
        hide() {
            this.visible = false;
        },
        toggle() {
            this.visible = !this.visible;
        },
        visitProfile() {
            this.$router.push({
                name: 'administration.users.show',
                params: { user: app().user.id },
            }).catch(this.routerErrorHandler);
        },
    },

    render() {
        return this.$slots.default({
            user: app().user,
            isTouch: layout().isTouch,
            visitProfile: this.visitProfile,
            hide: this.hide,
            toggle: this.toggle,
            visible: this.visible,
        });
    },
};
</script>
