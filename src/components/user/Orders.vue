<template>
  <v-container >
    <v-layout align-center justify-center>
      <v-flex xs12 lg4 md6>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile
            avatar
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                color="success"
                v-model="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/ad/' + order.adId"
                class="primary"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      orders: [
        {
          id: 'fds3',
          name: 'Vladilen',
          phone: '8-921-121-12-12',
          adId: '1',
          done: false,
        },
      ],
    };
  },
  methods: {
    markDone(order) {
      // eslint-disable-next-line no-param-reassign
      order.done = true;
    },
  },
};
</script>

<style scoped>

</style>
