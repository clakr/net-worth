<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { User } from "~/utils/types/User";

// GET AUTHED USER
const user = useSanctumUser<Resource<User>>();

// LOGOUT USER
async function handleLogoutUser() {
    const auth = useSanctumAuth();
    await auth.logout();
}
</script>

<template>
    <Nav v-if="user" className="flex items-center justify-between">
        <div>
            <Button to="/a" variant="subtle">Home</Button>
        </div>
        <div class="flex gap-x-2">
            <Button to="#" variant="subtle">{{ user.data.name }}</Button>
            <Button type="button" @click="handleLogoutUser">Logout</Button>
        </div>
    </Nav>
</template>