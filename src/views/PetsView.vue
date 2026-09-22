<template>
    <div>
        <header class="mb-4">
        <h1 class="text-2xl font-bold">Listagem de pets</h1>
        <p class="text-body-secondary mb-0"> Listagens de pets cadastrados no sistema  </p>
    </header>
    </div>
   

    <RouterLink class="btn btn-primary" :to="{ name: 'pets'}">
        Adicionar Pet
    </RouterLink>
</template>