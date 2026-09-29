<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, stringifyQuery, useRouter} from 'vue-router';

const router = useRouter(); //chamando o meu router
const API_URL = 'http://localhost:3000';

const tutores = ref([]) //lista vazia dos tutores

//criar o objeto para salvar o novo pet
//Propriedades: nome, especie, TutorID
const novoPet = ref({
  nome: '',
  especie: '',
  tutorId: ''
});

//buscar os tutores que esrtão salvos na aplicação

async function carregarTutores () {
  const reposta = await fetch(`${API_URL}/tutores`);

    //converter os dados da API que estão em JSON para JS
  tutores.value = await reposta.json()
  console.table(tutores.value)
}
//salvar o novo pet no sistema
async function salvarPet() {
  await fetch(`${API_URL}/pets`, {
    method: 'POST',
    headers: {
      'Contend-type': 'aplication/json',
    },
    body: JSON.stringify(novoPet.value)
  }) 

  //redirecionar para a tela de listagem de pets

  router.push('/pets')
}
onMounted(carregarTutores)

</script>

<template>


  <div>
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Listagem de Pets</h1>
      <p class="text-body-secondary mb-0">Cadastro de Pets no sistema.</p>
    </header> 
</div>

<form class="row" @submit.prevent="salvarPet">

  <!-- nome do pet -->
<div class="col-md-6">
  <label for="pets" class="form-label">Nome do Pet</label>
  <input type="text" class="form-control" id="nome" v-model="novoPet.nome" required>
</div> 

<!-- especie -->
<div class="col-md-6">
  <label for="especie" class="form-label">Especie</label>
  <select name="especie" id="especie" class="form-select" required v-model="novoPet.especie">
    <option value="" disabled>Selecione a espécie</option>
    <option value="Cachorro">Cachorro</option>
    <option value="Gato">Gato</option>
    <option value="Galinha">Galinha</option>
    <option value="Coelho">Coelho</option>
    <option value="Tartaruga">Tartaruga</option>
    <option value="Calopsita">Calopsita</option>
    <option value="Peixe">Peixe</option>
    <option value="Cavalo">Cavalo</option>
  </select>
</div>
<!-- tutor -->
 <div class="col-md-6">
  <label for="tutor" class="form-label">
    Tutor
  </label>
  <select name="tutor" id="tutor" class="form-select" v-model="novoPet.tutorId">
    <option value="" disabled>Selecione o tutor</option>
    <option v-for="tutor in tutores" :key="tutor.id">{{ tutor.nome }}</option>
  </select>
 </div>
<div class="col-12 d-flex gap-2">
  <button class="btn btn-sucess" type="submit">Salvar Pet</button>
</div>
</form>


    <RouterLink class="btn btn-primary" :to="{ name: 'pets/add' }">
        Cadastrar Pet
    </RouterLink>
</template>