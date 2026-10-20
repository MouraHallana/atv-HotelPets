<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const pets = ref([])
const tutores = ref([])
const API_URL = 'http://localhost:3000'

async function carregandoDados() {
    const respostaTutotes = await fetch(`${API_URL}/tutores`)
    tutores.value = await respostaTutotes.json()

    const respostaPets = await fetch(`${API_URL}/pets`)
    pets.value = await respostaPets.json()

    console.log('TUTORES', tutores.value);
    console.log('PETS', pets.value)
}

async function excluirTutor(id) {
    const confirmarExclusão = window.confirm('Você tem certeza que deseja excluir esse tutor?Essa acão não tem volta')
    
    if (confirmarExclusão) {
        await fetch(`${API_URL}/tutores/${id}`, {
        method: 'DELETE'});

        await carregandoDados();
    }
}
onMounted(carregandoDados)
</script>
<template>
<div>
    <header>
        <h1 class="text-2xl font-bold" >Listagem de tutores</h1>
        <p class="text-body-secondary mb-0" >Listaqgem dos tutores cadastrados no sistema</p>
    </header>

    <RouterLink
      class="btn btn-outline-primary"
      :to="{ name: 'addTutor' }"
    >
      Cadastrar tutor
    </RouterLink>

    <div class="tabela"></div>
        <table class="table table-striped table-hover"> 
            <thead>
                <th>Id</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Açoes</th>
            </thead>
            <tbody>
                <tr v-for="tutor in tutores" :key="tutor.id">
                    <td>{{ tutor.id }}</td>
                    <td> {{ tutor.nome }}</td>
                    <td>{{ tutor.cpf }}</td>
                    <td>{{ tutor.telefone }}</td>
                    <td>{{ tutor.email }}</td>

                    <td> 
                        <RouterLink :to="`/tutores/${tutor.id}`"> Visualizar </RouterLink>
                    </td>
                    <button class="btn btn-danger" @click="excluirTutor(tutor.id)">Excluir</button>
                </tr>
            </tbody>

            </table>

</div>
</template>