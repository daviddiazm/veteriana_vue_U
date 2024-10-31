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
      type: [Number, null],
      required: true
    },
    mascota: {
      type: Object,
      required: false
    },
    nombre: {
      type: String,
      required: true
    },
    propietario: {
      type: String,
      required: false
    },
    peso: {
      type: [Number, String],
      required: true
    },
    fechaNacimiento: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    caracteristicas: {
      type: String,
      required: true
    },
    sintomas: {
      type: String,
      required: true
    },
  })

  const emits = defineEmits([
    'update:nombre',
    "update:mascota",
    'update:propietario',
    'update:peso',
    'update:fecha-nacimiento',
    'update:color',
    'update:caracteristicas',
    'update:sintomas',
    'guardar-mascota'
  ])

  const leerNombre = (e) => {
    nombre.value = e.target.value
  }

  const validar = () => {
    
    if(Object.values(props).includes('')) {
      alert.msg = "se tienen que rellenar todos los campos",
      alert.type= "error"
      return
    }
    emits('guardar-mascota')
    alert.msg = 'Se guardo exitosamente'
    alert.type= 'succes' 

    setTimeout(() => {
      alert.msg = ''
      alert.type= '' 
    }, 3000);
  }

  const sinValidar = () => {
    emits('guardar-mascota')
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
      @submit.prevent="sinValidar"
      class="bg-white shadow-md py-10 px-5 rounded-lg mt-5">
      <AppAlert 
        v-if="alert.msg"
        :alert = "alert"
      />
      
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

      <!-- <div class="mb-5" >
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
      </div> -->
      

      <div class="mb-5" >
        <label 
          for="peso"
          class=" block text-gray-900 font-bold uppercase">
          Peso de la mascota
        </label>
        <input 
          type="number" 
          id="peso"
          placeholder="12"
          @input="$emit('update:peso',$event.target.value)"
          :value="peso"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>
      


        <div class="mb-5"  v-if="editando">
          <label 
            for="alta"
            class=" block text-gray-900 font-bold uppercase">
            Fecha Nacimiento
          </label>
          <input 
            type="text"
            id="alta"
            @input="$emit('update:fecha-nacimiento', $event.target.value)"
            :value="mascota.mas_FechaNacimiento"
            class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
        </div>

        <div class="mb-5"  v-else>
          <label 
            for="alta"
            class=" block text-gray-900 font-bold uppercase">
            Fecha Nacimiento
          </label>
          <input 
            type="date"
            id="alta"
            @input="$emit('update:fecha-nacimiento', $event.target.value)"
            :value="fechaNacimiento"
            class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
        </div>


      <div class="mb-5" >
        <label 
          for="color"
          class=" block text-gray-900 font-bold uppercase">
          Color de la mascota
        </label>
        <input 
          type="text" 
          id="color"
          @input="$emit('update:color',$event.target.value)"
          :value="color"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
      </div>
      

      <div class="mb-5" >
        <label 
          for="caracteristicas"
          class=" block text-gray-900 font-bold uppercase">
          caracteristicas de la mascota
        </label>
        <textarea 
          id="caracteristicas"
          placeholder="caracteristicas de la mascota"
          @input="$emit('update:caracteristicas', $event.target.value)"
          :value="caracteristicas"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 "/>
      </div>

      <!-- <div class="mb-5" >
        <label 
          for="sintomas"
          class=" block text-gray-900 font-bold uppercase">
          Sintomas de la mascota
        </label>
        <textarea 
          id="sintomas"
          placeholder="Sintomas de la mascota"
          @input="$emit('update:sintomas', $event.target.value)"
          class=" py-2 px-2 rounded-md w-full mt-2 border-2 placeholder:to-gray-800 ">
        </textarea>
      </div> -->

      <input 
        type="submit" 
        :value="[ editando ? 'Editar paciente' : 'Registar paciente']"
        class="bg-indigo-600 text-white w-full p-3 rounded-lg uppercase font-bold hover:bg-indigo-700 transition-colors cursor-pointer ">
    </form>
  </div>
</template>
