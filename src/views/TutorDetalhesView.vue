<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const API_URL = 'http://localhost:3000'
const tutor = ref(null)
const pets = ref(null)

// Objeto reativo para o novo pet, já vinculando o tutorId com o ID da rota
const novoPet = ref({
    nome: '',
    especie: '',
    tutorId: route.params.id
})

async function carregarDetalhes() {
    const idTutor = route.params.id;

    const respostaTutores = await fetch(`${API_URL}/tutores/${idTutor}`)
    tutor.value = await respostaTutores.json()

    const respostaPets = await fetch(`${API_URL}/pets`);
    const totalPets = await respostaPets.json();

    pets.value = totalPets.filter(pet => pet.tutorId === idTutor)
}

async function addPet() {
    try {
        const resposta = await fetch(`${API_URL}/pets`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(novoPet.value)
        });

        if (resposta.ok) {
    
            novoPet.value.nome = '';
            novoPet.value.especie = '';
            
            
            await carregarDetalhes();
        }
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error);
    }
}

onMounted(carregarDetalhes)

</script>
<template> 

<section v-if="tutor === null">
    <p>caregandooooooo</p>
</section>
<section v-else>
   
    <h1 class="text-2xl font-bold">Dados do tutor</h1>
  
<div class="d-flex align-items-center mt-3">

        <h5 class="me-5">
       ID: {{ tutor?.id }}
        </h5>
         <h5 class="me-5">Nome: {{ tutor?.nome }}</h5> 
         <h5>Telefone: {{ tutor?.telefone }}</h5>
</div>     

<div class="d-flex align-items-center mt-3">

        <h5 class="me-5">
       CPF: {{ tutor?.cpf }}
        </h5>
         <h5 class="me-5">E-mail: {{ tutor?.email }}</h5> 
         <h5>Data de Nascimento: {{ tutor?.dataNascimento }}</h5>
</div>    
        
   
    <h1 class="text-2xl font-bold">Endereço</h1>

  
<div class="d-flex align-items-center mt-3">

        <h5 class="me-5">
       Rua: {{ tutor?.endereco.rua }}
        </h5>
         <h5 class="me-5">Numero: {{ tutor?.endereco.numero }}</h5> 
         <h5>Bairro: {{ tutor?.endereco.bairro }}</h5>
</div>     


<div class="d-flex align-items-center mt-3">

        <h5 class="me-5">
       Cidade: {{ tutor?.endereco.cidade }}
        </h5>
         <h5 class="me-5">Estado: {{ tutor?.endereco.estado }}</h5> 
         <h5>CEP: {{ tutor?.endereco.cep }}</h5>
</div>     

<div>
      <table class="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in pets" :key="pet.id">
            <td>{{ pet?.id }}</td>
            <td>{{ pet?.nome }}</td>
            <td>{{ pet?.especie }}</td>
            <td>
                 <RouterLink :to="`/pets/${pet.id}`" class="btn btn-sm btn-primary">
                Visualizar
              </RouterLink>
            </td>
          </tr>
         
        </tbody>
      </table></div>

        <div class="card mt-4 p-4">
      <h3 class="text-xl font-bold mb-3">Cadastrar Novo Pet</h3>
      
      <form @submit.prevent="addPet" class="row g-3">
        <div class="col-md-6">
          <label for="nomePet" class="form-label">Nome do Pet:</label>
          <input 
            type="text" 
            class="form-control" 
            id="nomePet" 
            v-model="novoPet.nome" 
            required 
          />
        </div>
           <div class="col-md-6">
          <label for="especiePet" class="form-label">Espécie:</label>
          <input 
            type="text" 
            class="form-control" 
            id="especiePet" 
            v-model="novoPet.especie" 
            placeholder="Ex: Cachorro, Gato..." 
            required 
          />
        </div>

        <div class="col-12">
          <button class="btn btn-success" type="submit">
            Adicionar Pet
          </button>
        </div>
      </form>
    </div>
</section>

</template>

