<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const API_URL= 'http://localhost:3000'
const tutor = ref(null)
const pets = ref(null)

async function carregarDetalhes() {
    const idTutor = route.params.id;

    const repostaTutores = await fetch(`${API_URL}/tutores/${idTutor}`)
    tutor.value = await repostaTutores.json()
    
}

onMounted(carregarDetalhes)
</script>
<template> 

<section v-if="tutor === null">
    <p>caregandooooooo</p>
</section>
<section v-else>
   
    <h1>Dados do tutor</h1>
  
  
         <h5>
       ID: {{ tutor?.id }}
         </h5>
        <h3>Nome: {{ tutor?.nome }}</h3> 
   
    <h3>Telefone: {{ tutor?.telefone }}</h3>
</section>
</template>

