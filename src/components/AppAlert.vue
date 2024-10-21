<script setup >
  import { computed } from "vue";
  const props = defineProps({
    alert: {
      type: Object,
      required: true
    }
  })

  // const isError = computed(() => {
  //   if(props.alert.type === 'error'){
  //     return 'text-red-800'
  //   }else {
  //     return 'text-green-800'
  //   } 
  // }) 
  const isError = computed(() => {
    return props.alert.type === 'error'
  }) 
</script>

<template>
  <p
    :class = "[isError ? 'text-red-800' : 'text-green-800' ]"
    class=" mb-2 bg-white w-full text-center p-3 font-bold rounded-md"
    >
    {{ alert.msg }}
  </p>
</template>
