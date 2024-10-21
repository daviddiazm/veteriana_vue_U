<script setup>
  import { computed, reactive, ref } from 'vue';
  import AppAlert from './AppAlert.vue';

  // const nombre = ref('David')
  const alert = reactive({
    msg: '',
    type:''
  })
  
  const props = defineProps({
    id: {
      type: [String, null],
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    propietario: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    alta: {
      type: String,
      required: true
    },
    sintomas: {
      type: String,
      required: true
    },
  })

  const emits = defineEmits(['update:nombre','update:propietario','update:email','update:alta','update:sintomas','guardar-paciente'])

  const leerNombre = (e) => {
    nombre.value = e.target.value
  }

  const validar = () => {
    
    if(Object.values(props).includes('')) {
      alert.msg = "se tienen que rellenar todos los campos",
      alert.type= "error"
      return
    }
    emits('guardar-paciente')
    alert.msg = 'Se guardo exitosamente'
    alert.type= 'succes' 

    setTimeout(() => {
      alert.msg = ''
      alert.type= '' 
    }, 3000);
  }

  const editando = computed(() => {
    return props.id
  })

</script>

<template>
  <!-- <div class=" md:w-1/2"> -->
  <div class=" md:w-1/2">
    <h2 class="text-3xl text-black font-bold text-center">
      Registro de pacientes
    </h2>
    <p class="text-lg text-center">
      Aniade pacientes y 
      <span class="text-indigo-600">administralos</span>
    </p>

    <form
      @submit.prevent="validar"
      class="bg-white shadow-md py-10 px-5 rounded-lg mt-5">
      <AppAlert 
        v-if="alert.msg"
        :alert = "alert"
      />
      <!-- asi se hacia antes -->
      <!-- <div class="mb-5">
        {{ nombre }}
        <label 
          for="nombre"
          class=" block text-gray-900 font-bold uppercase">
          Nombre de la mascota
        </label>
        <input 
          type="text" 
          id="nombre"
          placeholder="Nombre de la mascota"
          :value="nombre"
          @input="leerNombre"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div> -->

      <!-- ahora se usa v-model y este es v-model para ref -->
      <!-- <div class="mb-5">
        {{ nombre }}
        <label 
          for="nombre"
          class=" block text-gray-900 font-bold uppercase">
          Nombre de la mascota
        </label>
        <input 
          type="text" 
          id="nombre"
          placeholder="Nombre de la mascota"
          v-model="nombre"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div> -->
      
      <!-- ahora se usa v-model y este es v-model para reactive -->
      <div class="mb-5">
        <!-- {{ paciente.nombre }} -->
        <label 
          for="nombre"
          class=" block text-gray-900 font-bold uppercase">
          Nombre de la mascota
        </label>
        <input 
          type="text" 
          id="nombre"
          placeholder="Nombre de la mascota"
          @input="$emit('update:nombre', $event.target.value )"
          :value="nombre"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>

      <div class="mb-5" >
        <label 
          for="propietario"
          class=" block text-gray-900 font-bold uppercase">
          Nombre del propietario
        </label>
        <input 
          type="text" 
          id="propietario"
          placeholder="Nombre del propietario"
          @input="$emit('update:propietario', $event.target.value)"
          :value="propietario"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>
      

      <div class="mb-5" >
        <label 
          for="email"
          class=" block text-gray-900 font-bold uppercase">
          E-mail del propietario
        </label>
        <input 
          type="email" 
          id="email"
          placeholder="usuario@email.com"
          @input="$emit('update:email',$event.target.value)"
          :value="email"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>
      

      <div class="mb-5" >
        <label 
          for="alta"
          class=" block text-gray-900 font-bold uppercase">
          Fecha de alta
        </label>
        <input 
          type="date" 
          id="alta"
          @input="$emit('update:alta',$event.target.value)"
          :value="alta"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>
      

      <div class="mb-5" >
        <label 
          for="sintomas"
          class=" block text-gray-900 font-bold uppercase">
          Sintomas de la mascota
        </label>
        <textarea 
          id="sintomas"
          placeholder="Sintomas de la mascota"
          @input="$emit('update:sintomas', $event.target.value)"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 "/>
      </div>
      <input 
        type="submit" 
        :value="[ editando ? 'Editar paciente' : 'Registar paciente']"
        class="bg-indigo-600 text-white w-full p-3 rounded-lg uppercase font-bold hover:bg-indigo-700 transition-colors cursor-pointer ">
    </form>
  </div>
</template>
