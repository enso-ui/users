<script>
import { app as useApp } from '@enso-ui/ui/src/pinia/app';
import { layout as useLayout } from '@enso-ui/ui/src/pinia/layout';

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
            const app = useApp();

            this.$router.push({
                name: 'administration.users.show',
                params: { user: app.user.id },
            }).catch(this.routerErrorHandler);
        },
    },

    render() {
        const app = useApp();
        const layout = useLayout();

        return this.$slots.default({
            user: app.user,
            isTouch: layout.isTouch,
            visitProfile: this.visitProfile,
            hide: this.hide,
            toggle: this.toggle,
            visible: this.visible,
        });
    },
};
</script>
