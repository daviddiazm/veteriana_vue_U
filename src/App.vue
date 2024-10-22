<script setup lang='js'>
  import { onMounted, reactive, ref, watch } from 'vue';

  import { uid } from "uid";

  import AppHeader from './components/AppHeader.vue'
  import AppForm from './components/AppForm.vue';
  import Appmascota from './components/AppMascota.vue';
  import MascotasServices from './services/MascotasServices';
  

  
  const mascotas = ref([])
  const mascota = reactive({
    mas_Id: null,
    mas_Nombre : '',
    // propietario : '',
    mas_Peso : '',
    mas_FechaNacimineto : '',
    mas_Color : '',
    mas_Caracteristicas : '',
    sintomas : '',
  })

  watch(mascotas, ()=> {
    // guardarmascotasLocalStorage()
  },{
    deep: true
  })
  
  onMounted(()=> {
    if(localStorage.getItem('mascotas')){
      mascotas.value = JSON.parse(localStorage.getItem('mascotas'))
    }

    getMascotas()
  
  })


  const getMascotas = async () => {
    try {
      const {data} = await MascotasServices.getDataMascotas()
      mascotas.value = data
    } catch (error) {
      console.log(error);
      
    }
  }

  const guardarmascota = async () => {
    if( mascota.id ) {
      console.log('no deberia de estar aqui');
      const { id } = mascota
      const i = mascotas.value.findIndex(mascota => mascota.id === id)
      mascotas.value[i] = { ... mascota }

      // otra manera de hacerlo
      // const i = mascotas.value.findIndex(mascotastate => mascotastate.id === mascota.id);
      // if (i !== -1) {
      //   mascotas.value[i] = { ...mascota };
      // }
    } else {
      // mascotas.value.push({ ...mascota, id:uid() })
      try {
        console.log('hola desde el try',{ ...mascota, mas_Id: 23 });
        MascotasServices.postDataMascotas({ ...mascota, mas_Id: 23 })
      } catch (error) {
        console.log(error);
        
      }
    }
    mascota.mas_Nombre = ''
    mascota.mas_Peso = ''
    mascota.mas_FechaNacimineto = ''
    mascota.mas_Color = ''
    mascota.mas_Caracteristicas= ''
    mascota.sintomas = ''
    mascota.id = null
  }

  //todo lo referente a local storage
  // const obtenermascota = (id) => {
  //   const indicemascota = mascotas.value.findIndex(mascota => mascota.id === id)
  //   const mascotaActualizar = mascotas.value[indicemascota]
  //   Object.assign(mascota, mascotaActualizar)
  // }

  // const eliminarmascota = (id) => {
  //   const indicemascota = mascotas.value.findIndex(mascota => mascota.id === id)
  //   // const mascotaseleccionado = mascotas.value[indicemascota]
  //   mascotas.value.splice(indicemascota, 1)
  // }

  // const guardarmascotasLocalStorage = () => {
  //   localStorage.setItem('mascotas', JSON.stringify(mascotas.value) )
  // }

</script>

<template >
  <!-- <div class="container mx-auto mt-2"> -->
  <div class="container mx-auto pt-2 lg:px-20">
    <AppHeader/>

    <div class="flex flex-col mt-12 md:flex-row">
      <AppForm
        :id="mascota.mas_Id"
        v-model:nombre="mascota.mas_Nombre"
        v-model:propietario="mascota.propietario"
        v-model:peso="mascota.mas_Peso"
        v-model:fecha-nacimineto="mascota.mas_FechaNacimineto"
        v-model:color="mascota.mas_Color"
        v-model:caracteristicas="mascota.mas_Caracteristicas"
        v-model:sintomas="mascota.sintomas"
        @guardar-mascota="guardarmascota"
      />

      <div class=" md:w-1/2">
        <h2 class="text-3xl text-black font-bold text-center">
          Lista de mascotas
        </h2>
        <p class="text-lg text-center">
          Observa y administra 
          <span class="text-indigo-600">mascotas</span>
        </p>
        <p
          v-if="mascotas.length <= 0"
          class="text-xl text-center mt-12">
          No hay mascotas
        </p>
<!-- 
        <div v-else >
          <Appmascota
            v-for="mascota in mascotas"
            :mascota="mascota"
            @obtener-mascota="obtenermascota"
            @eliminar-mascota="eliminarmascota"
          />
        </div> -->

        <div v-else >
          <Appmascota
            v-for="mascota in mascotas"
            :mascota="mascota"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<style>
</style>
