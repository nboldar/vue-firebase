<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-16">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"

              ></v-text-field>
              <v-text-field
                id="passwordRepeat"
                prepend-icon="lock"
                name="passwordRepeat"
                label="Confirm password"
                type="password"
                :counter="6"
                v-model="passwordRepeat"
                :rules="passwordRepeatRules"

              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="pr-3"
              @click.prevent.stop="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
            >
              Create account
            </v-btn>
            <v-btn
              color="secondary"
              @click="resetForm"
            >
              Reset form
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must have length 6 characters  minimum',
      ],
      passwordRepeat: '',
      passwordRepeatRules: [
        v => !!v || 'Confirm password',
        v => v === this.password || 'Passwords are not matched!',
      ],
      valid: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },

};
</script>

<style scoped>

</style>
