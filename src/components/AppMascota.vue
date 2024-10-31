<script setup>

  defineEmits(['obtener-mascota','eliminar-mascota'])

  const props = defineProps({
    mascota: {
      type: Object,
      required: true
    }
  })

  
  

</script>

<template>
  <div class="mx-5 mt-5 mb-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p class="font-bold mb-3 text-gray-700 uppercase">ID:
      <span class="font-normal normal-case">
        {{ mascota.mas_Id }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Nombre:
      <span class="font-normal normal-case">
        {{ mascota.mas_Nombre }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Propietario:
      <span class="font-normal normal-case">
        {{ mascota.propietario }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Peso:
      <span class="font-normal normal-case">
        {{ mascota.mas_Peso }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Fecha Nacimiento:
      <span class="font-normal normal-case">
        {{ mascota.mas_FechaNacimiento }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Color:
      <span class="font-normal normal-case">
        {{ mascota.mas_Color }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">caracteristicas:
      <span class="font-normal normal-case">
        {{ mascota.mas_Caracteristicas }}
      </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">Síntomas:
      <span class="font-normal normal-case">
        {{ mascota.sintomas }}
      </span>
    </p>

    <div class="grid md:grid-cols-2  gap-5 mt-10 ">
      <button 
        type="button"
        @click="$emit('obtener-mascota', mascota.mas_Id)"
        class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">Editar</button>

      <button type="button"
        @click="$emit('eliminar-mascota', mascota.mas_Id)"
        class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">Eliminar</button>
    </div>
  </div>
</template>
