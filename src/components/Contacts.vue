<template>
    <div>
        <v-select
            :value="selectedContact"
            @option:selected="onChange"
            @option:deselected="onChange"
            taggable
            pushTags
            :clearable="false"
        ></v-select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup(props, { emit }) {
        const contacts = ref([])
        const selectedContact = ref(null)
        const onChange = (value: String) => {
            emit('contactChanged', value)
        }
        return {
            contacts,
            selectedContact,
            onChange
        }
    }
})
</script>