<script>
import { useStore } from '../../../utils/pinia';

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
            const app = useStore('app');

            this.$router.push({
                name: 'administration.users.show',
                params: { user: app.user.id },
            }).catch(this.routerErrorHandler);
        },
    },

    render() {
        const app = useStore('app');
        const layout = useStore('layout');

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
