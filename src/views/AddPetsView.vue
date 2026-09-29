<template>


  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">Cadastro de Pets no sistema.</p>
    </header> 
</div>

    <RouterLink class="btn btn-primary" :to="{ name: 'pets-novo'}">
        Cadastrar Pet
    </RouterLink>
</template>