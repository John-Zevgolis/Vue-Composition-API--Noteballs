<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

                <a role="button" class="navbar-burger" ref="navbarBurgerRef" @click.prevent="showMobileNav = !showMobileNav" :class="{'is-active': showMobileNav}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" ref="navbarMenuRef" class="navbar-menu" :class="{'is-active': showMobileNav}">
                <div class="navbar-start">
                    <button v-if="storeAuth.user.id" class="button is-small is-info mt-3 ml-3" @click="logout">Logout {{ storeAuth.user.email }}</button>
                </div>
                <div class="navbar-end">
                    <router-link to="/" @click="showMobileNav = false" class="navbar-item" active-class="is-active">
                        Notes
                    </router-link>

                    <router-link to="/stats" @click="showMobileNav = false" class="navbar-item" active-class="is-active">
                        Stats
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();

const showMobileNav = ref(false);

const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, () => showMobileNav.value = false, {
    ignore: [navbarBurgerRef]
});

const logout = () => {
    showMobileNav.value = false;
    storeAuth.logoutUser();
};
</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>