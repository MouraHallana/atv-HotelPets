<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()
const API_URL = 'http://localhost:3000'
const tutores = ref(null)
const novoTutor = ref({
    nome: '',
    telefone: '',
    id: '',
    cpf: '',
    email: '',
    dataNascimento: '', 
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '', 
      cep: ''
    }
})
const cepAPi= ref({});

async function buscaCep(cep) {
  const API_CEP = 'https://viacep.com.br/ws'
  const respostaCep = await fetch(`${API_CEP}/${cep}/json/`)

  cepAPi.value = await respostaCep.json()

novoTutor.value.endereco.rua = cepAPi.value.logradouro;
novoTutor.value.endereco.bairro = cepAPi.value.bairro;
novoTutor.value.endereco.cidade = cepAPi.value.localidade;
novoTutor.value.endereco.estado = cepAPi.value.uf;
  
}

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
        >
          Telefone:
        </label>
        <input
          type="tel"
          class="form-control"
          id="telefone"
          v-model="novoTutor.telefone"
          placeholder="Ex: (11) 99999-1234"
          required
        />
        
        
        <label for="cpf" class="form-label">CPF/CNPJ</label>
        <input type="text" class="form-control" id="cpf" v-model="novoTutor.cpf" required>

          <label for="email" class="form-label">e-mail</label>
        <input type="email" class="form-control" id="email" v-model="novoTutor.email" required>

          <label for="cpf" class="form-label">Data de Nascimento</label>
        <input type="date" class="form-control" id="dataNascimento" v-model="novoTutor.dataNascimento" required>

    
         <div class="col-md-4col-md-6">


            <h3 class="text-2xl font-bold mt-3">Endereço</h3>

          
<div class="d-flex align-items-center mt-3">


        <label for="cep" class="form-label">CEP</label>
        <input type="text" class="form-control" id="cep" v-model="novoTutor.endereco.cep" @blur="buscaCep(novoTutor.endereco.cep)" required>    

              
         <label for="rua" class="form-label">Rua</label>
        <input type="text" class="form-control" id="rua" v-model="novoTutor.endereco.rua" required>


        

        <label for="numero" class="form-label">Número</label>
        <input type="text" class="form-control" id="numero" v-model="novoTutor.endereco.numero" required>  

        
     </div>



<div class="d-flex align-items-center mt-3">


        <label for="bairro" class="form-label">Bairro</label>
        <input type="text" class="form-control" id="bairro" v-model="novoTutor.endereco.bairro" required>

        


        <label for="cidae" class="form-label">Cidade</label>
        <input type="text" class="form-control" id="cidade" v-model="novoTutor.endereco.cidade" required>

        


        <label for="estado" class="form-label">Estado</label>
        <input type="text" class="form-control" id="estado" v-model="novoTutor.endereco.estado" required> </div>

         </div>

        </div>
             <div class="col-12 d-flex gap-3">
        <button
          class="btn btn-success"
          type="submit"
        >
          Salvar Tutor
        </button>
      </div>

        </form>
</template>
<style scoped>
.button {
  width: 20px;
}
</style>