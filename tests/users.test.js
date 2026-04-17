import { describe, expect, it, vi } from 'vitest';

vi.mock('@enso-ui/ui/src/pinia/app', () => ({
    app: () => ({
        user: { id: 7, role: { id: 1 } },
        meta: { dateFormat: 'd.m.Y' },
        impersonating: false,
        isWebview: false,
        updateAvatar: vi.fn(),
    }),
}));

vi.mock('@enso-ui/ui/src/pinia/layout', () => ({
    layout: () => ({
        isTouch: true,
    }),
}));

vi.mock('@enso-ui/auth/src/pinia/auth', () => ({
    auth: () => ({
        isAuth: true,
    }),
}));

vi.mock('../src/bulma/pages/users/components/Avatar.vue', () => ({
    default: {},
}));

vi.mock('@enso-ui/uploader/bulma', () => ({
    EnsoUploader: {},
}));

vi.mock('@enso-ui/divider', () => ({
    default: {},
}));

vi.mock('@enso-ui/ui/src/modules/plugins/date-fns/format', () => ({
    default: vi.fn(),
}));

import ProfileControl from '../src/core/components/navbar/ProfileControl.vue';
import UserProfile from '../src/bulma/pages/users/components/UserProfile.vue';

describe('users state access', () => {
    it('uses app and layout stores directly in profile control', () => {
        const slot = vi.fn();

        ProfileControl.render.call({
            $slots: { default: slot },
            visitProfile: vi.fn(),
            hide: vi.fn(),
            toggle: vi.fn(),
            visible: false,
        });

        expect(slot).toHaveBeenCalledWith(expect.objectContaining({
            isTouch: true,
            user: expect.objectContaining({ id: 7 }),
        }));
    });

    it('uses auth and app stores directly in user profile', () => {
        expect(UserProfile.computed.user.call({}).id).toBe(7);
        expect(UserProfile.computed.isAuth.call({})).toBe(true);
    });
});
