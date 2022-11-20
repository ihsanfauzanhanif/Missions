<template>
    <nav class="navbar navbar-expand-lg bg-white">
        <div class="container">
            <a class="navbar-brand" href="#">Personal</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{name: 'profileIndex'}" class="nav-link active">Profile List</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style>
nav.navbar {
    border-bottom: 1px solid rgb(228, 228, 228);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.navbar-brand {
    font-weight: 600;
    color: rgb(83, 92, 119);
}
</style>
