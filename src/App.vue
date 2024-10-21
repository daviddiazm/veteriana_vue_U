<script setup lang='js'>
  import { onMounted, reactive, ref, watch } from 'vue';

  import { uid } from "uid";

  import AppHeader from './components/AppHeader.vue'
  import AppForm from './components/AppForm.vue';
  import AppPaciente from './components/AppPaciente.vue';
  

  
  const pacientes = ref([])
  const paciente = reactive({
    id: null,
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: ''
  })

  watch(pacientes, ()=> {
    guardarPacientesLocalStorage()
  },{
    deep: true
  })
  
  onMounted(()=> {
    if(localStorage.getItem('pacientes')){
      pacientes.value = JSON.parse(localStorage.getItem('pacientes'))
    }
  })

  const guardarPaciente = () => {
    if( paciente.id ) {
      const { id } = paciente
      const i = pacientes.value.findIndex(paciente => paciente.id === id)
      pacientes.value[i] = { ... paciente }

      // otra manera de hacerlo
      // const i = pacientes.value.findIndex(pacienteState => pacienteState.id === paciente.id);
      // if (i !== -1) {
      //   pacientes.value[i] = { ...paciente };
      // }
    } else {
      pacientes.value.push({ ...paciente, id:uid() })
    }
    paciente.nombre = ''
    paciente.propietario = ''
    paciente.email = ''
    paciente.alta = ''
    paciente.sintomas = ''
    paciente.id = null
  }

  const obtenerPaciente = (id) => {
    const indicePaciente = pacientes.value.findIndex(paciente => paciente.id === id)
    const pacienteActualizar = pacientes.value[indicePaciente]
    Object.assign(paciente, pacienteActualizar)
  }

  const eliminarPaciente = (id) => {
    const indicePaciente = pacientes.value.findIndex(paciente => paciente.id === id)
    // const pacienteSeleccionado = pacientes.value[indicePaciente]
    pacientes.value.splice(indicePaciente, 1)
  }

  const guardarPacientesLocalStorage = () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes.value) )
  }

</script>

<template >
  <!-- <div class="container mx-auto mt-2"> -->
  <div class="container mx-auto pt-2 lg:px-20">
    <AppHeader/>

    <div class="flex flex-col mt-12 md:flex-row">
      <AppForm
        :id="paciente.id"
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
      />

      <div class=" md:w-1/2">
        <h2 class="text-3xl text-black font-bold text-center">
          Lista de pacientes
        </h2>
        <p class="text-lg text-center">
          Observa y administra 
          <span class="text-indigo-600">pacientes</span>
        </p>
        <p
          v-if="pacientes.length <= 0"
          class="text-xl text-center mt-12">
          No hay pacientes
        </p>

        <div v-else >
          <AppPaciente
            v-for="paciente in pacientes"
            :paciente="paciente"
            @obtener-paciente="obtenerPaciente"
            @eliminar-paciente="eliminarPaciente"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<style>
</style>
