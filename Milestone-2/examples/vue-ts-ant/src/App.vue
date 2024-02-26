<template>
    <div>texto: {{ texto }}</div>
    <div>numero: {{ numero }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ant } from '@vapaee/ant';
import { filter, map } from 'rxjs/operators';

export default defineComponent({
    name: 'App',
    components: {
    },
    setup() {
        const module = ref(ant.modules.example);
        const texto = ref("hola");
        const numero = ref(0);
        const sub_texto = module.value.texto.subscribe((value) => {
            texto.value = value;
        });
        const sub_numero = module.value.change.pipe(
            filter(data => data.key === "numero"),
            map(data => data.value as number),
        ).subscribe(value => {
            numero.value = value;
        });
        
        return {
            module,
            texto,
            numero,
            sub_texto,
            sub_numero
        };
    },
    beforeUnmount() {
        this.sub_texto.unsubscribe();
        this.sub_numero.unsubscribe();
    },
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
