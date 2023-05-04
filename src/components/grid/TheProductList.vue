<template>
  <div v-if="extractValidProduct.length">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th class="text-center">CARID</th>
          <th class="text-center">INSTOCK</th>
          <th class="text-center">HP</th>
          <th class="text-center">PRICE</th>
          <th class="text-center">COLOR</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in extractValidProduct" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.carId }}</td>
          <td>{{ product.inStock ? 'Exist' : "Doesn't Exist" }}</td>
          <td>{{ product.hoursePower }}</td>
          <td>{{ $filters.toCurrency(product.price) }}</td>
          <td>
            <span
              class="color-circle"
              :style="{
                backgroundColor: product.color
              }"
            ></span
            >{{ product.color }}
          </td>
          <td><v-btn @click="goToEditProduct(product.id)"> Edit </v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    <p>loading product list....</p>
  </div>
</template>

<script>
import { getProductList, getProductColorList } from '../../services/product.js'

export default {
  data() {
    return {
      productList: [],
      colorList: []
    }
  },
  mounted() {
    getProductList().then((responseData) => (this.productList = responseData))
    getProductColorList().then(
      (responseData) => (
        (this.colorList = responseData),
        (this.colorList = this.colorList.map((str) => str.toLowerCase()))
      )
    )
  },
  computed: {
    extractValidProduct() {
      if (!this.productList) return []
      return this.productList.filter(
        (product) =>
          //inDtock check
          typeof product.inStock === 'boolean' &&
          //carId check
          product.carId.trim().length != 0 &&
          //hourse power check
          typeof product.hoursePower === 'number' &&
          product.hoursePower >= 100 &&
          product.hoursePower <= 500 &&
          //color check
          this.colorList.includes(product.color.toLowerCase())
      )
    }
  },
  methods: {
    goToEditProduct(id) {
      this.$router.push({
        name: 'EditProduct',
        params: { id }
      })
    }
  }
}
</script>

<style scoped>
.color-circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
}
</style>
