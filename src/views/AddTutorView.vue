<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()
const API_URL = 'http://localhost:3000'
const tutores = ref(null)
const novoTutor = ref({
    nome: '',
    telefone: '',
    id: ''
})

async function carregarTutores() {
    const resposta = await fetch(`${API_URL}/tutores`)
    tutores.value = await resposta.json()
    
}

async function addTutor() {
    await fetch(`${API_URL}/tutores`, {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        }, body: JSON.stringify(novoTutor.value)
    });

    router.push('/tutores')
}

onMounted(carregarTutores)
</script>
<template>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem dos Tutores no sistema</h1>
      <p class="text-body-secondary mb-0">
        Listagem dos tutores cadastrados no sistema.
      </p>
    </header>

        <RouterLink
      class="btn btn-outline-primary"
      :to="{ name: 'tutoresView' }"
    >
      Lista tutores
    </RouterLink>

 <form
      class="row"
      @submit.prevent="addTutor"
    >
      <!-- nome do tutor -->
      <div class="col-md-6">
        <label
          for="nome"
          class="form-label"
        >
          Nome do Tutor:
        </label>
        <input
          type="text"
          class="form-control"
          id="nome"
          v-model="novoTutor.nome"
          required
        />

             <label
          for="telefone"
          class="form-label"
          placeholder="Insira seu telefone"
          required
        >
          Telefone:
        </label>
        <input
          type="tel"
          class="form-control"
          id="telefone"
          v-model="novoTutor.telefone"
          placeholder="Ex: (11) 99999-1234"
        />



        </div>
     <div class="col-12 d-flex gap-3">
        <button
          class="btn btn-success"
          type="submit"
        >
          Salvar Pet
        </button>
      </div>

        </form>
</template>
<style scoped>
.button {
  width: 20px;
}
</style>