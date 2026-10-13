<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const API_URL = 'http://localhost:3000'
const pet = ref(null);
const tutor = ref(null);


async function carregarPet() {
    //pegando o id do pet que tá na url do navegador
    const idpet= route.params.id;

    //pegando a api para buscar o pet pelo id
    const respostaPet = await fetch(`${API_URL}/pets/${idpet}`)

    //convertendo a resposta api para json

    pet.value = await respostaPet.json();
    console.log('pet', pet.value);

    
     const repostaTutor = await fetch(`${API_URL}/tutores/${pet.value.tutorId}`)
     tutor.value = await repostaTutor.json()
     console.log('tutor', tutor.value)


}

onMounted(carregarPet)
</script>
<template>
    <section v-if="pet === null">
        <p>Caregandoooo... </p>

    </section>
    <section v-else>
            <h1>
        Nome do pet: {{ pet.nome }}
    </h1>
    <p>
        Tutor: {{ tutor?.nome }}
    </p>
    <h5>Espécie: {{ pet.especie }}</h5>
    </section>


</template>
