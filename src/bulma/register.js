import ProfileController from './components/navbar/ProfileControl.vue';

export default App => {
    App.registerNavbarItem('profile-controller', ProfileController, 400);
};
