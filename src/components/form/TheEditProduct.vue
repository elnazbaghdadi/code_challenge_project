<template>
  <div v-if="product">
    <h3 class="mb-7">Edit {{ carId.value }} Car Page</h3>
    <v-sheet width="400" class="mx-auto">
      <form @submit.prevent="submit">
        <v-text-field v-model="id.value.value" label="ID" disabled></v-text-field>

        <v-text-field v-model="carId.value.value" label="Car ID" disabled></v-text-field>

        <v-text-field
          v-model="hoursePower.value.value"
          :error-messages="hoursePower.errorMessage.value"
          label="Hours Power"
          type="number"
        ></v-text-field>

        <v-text-field
          v-model="price.value.value"
          :error-messages="price.errorMessage.value"
          label="Price"
          step="0.01"
          type="number"
        ></v-text-field>

        <v-select
          v-model="color.value.value"
          :items="colorOptions"
          :error-messages="color.errorMessage.value"
          label="Color"
        ></v-select>

        <div class="d-flex justify-space-around mb-6">
          <span>
            <input type="radio" id="true" :value="true" v-model="inStock.value.value" />
            <label class="ml-1" for="true">Exist In Stock</label>
          </span>
          <span>
            <input type="radio" id="false" :value="false" v-model="inStock.value.value" />
            <label class="ml-1" for="false">Doesn't Exist In Stock</label>
          </span>
        </div>

        <v-btn class="me-4" type="submit" :disabled="!validChangesMade"> submit </v-btn>

        <v-btn @click="$router.go(-1)"> cancel </v-btn>
      </form>
    </v-sheet>
  </div>
  <div v-else>
    <p>loading product details....</p>
  </div>
</template>

<script>
import { getProductById, getProductColorList, updateProductById } from '../../services/product.js'
import { computed, onMounted, ref } from 'vue'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const idParam = route.params.id
    const colorOptions = ref([])

    const { handleSubmit } = useForm({
      validationSchema: {
        hoursePower(value) {
          if (value >= 100 && value <= 550) return true

          return 'The value must be in range of: 100-550'
        },
        price(value) {
          if (value) return true

          return 'Enter the price.'
        },
        color(value) {
          if (value) return true

          return 'Choose a color.'
        }
      }
    })
    const id = useField('id')
    const carId = useField('carId')
    const inStock = useField('inStock')
    const hoursePower = useField('hoursePower')
    const price = useField('price')
    const color = useField('color')
    const product = ref([])

    onMounted(() => {
      getProductById(idParam)
        .then((responseData) => (product.value = responseData))
        .then(() => {
          id.value.value = product.value.id
          carId.value.value = product.value.carId
          inStock.value.value = product.value.inStock
          hoursePower.value.value = product.value.hoursePower
          price.value.value = product.value.price
          color.value.value = product.value.color
        })
      getProductColorList().then((responseData) => (colorOptions.value = responseData))
    })
    //to keep submit button disabled while there are no changes or changes are not valid
    const validChangesMade = computed(() => {
      if (
        (inStock.value.value != product.value.inStock ||
          hoursePower.value.value != product.value.hoursePower ||
          price.value.value != product.value.price ||
          color.value.value != product.value.color) &&
        useIsFormValid().value
      )
        return true
      return false
    })

    const submit = handleSubmit((values) => {
      values.price = +values.price
      values.hoursePower = +values.hoursePower
      updateProductById(values.id, values).then(() => {
        alert('modified successfully')
        router.push('/product-list')
      })
    })

    return {
      inStock,
      hoursePower,
      price,
      color,
      carId,
      id,
      product,
      submit,
      colorOptions,
      validChangesMade
    }
  }
}
</script>
