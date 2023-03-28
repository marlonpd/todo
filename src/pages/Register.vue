<template>
  <div class="min-h-screen w-full p-6 flex justify-center items-center">
    <div class="w-full max-w-xs">
      <div class="bg-white border p-8 shadow rounded w-full mb-6">
        <h1 class="mb-6 text-lg text-gray-900 font-thin">
          Create your account
        </h1>

        <form @submit.prevent="register">
          <fieldset class="mb-4">
            <label class="block text-sm text-gray-900 mb-2">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="name"
              required
              autofocus
            />
          </fieldset>
          <fieldset class="mb-4">
            <label class="block text-sm text-gray-900 mb-2"
              >Email address</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="email"
              required
              autofocus
            />
          </fieldset>

          <fieldset class="mb-4">
            <div class="w-full flex justify-between items-center">
              <label for="password" class="block text-sm text-gray-900 mb-2"
                >Password</label
              >
              <a
                class="text-xs font-thin text-blue no-underline hover:underline"
                href="#"
              >
              </a>
            </div>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="password"
              required
            />
          </fieldset>

          <fieldset class="mb-4">
            <div class="w-full flex justify-between items-center">
              <label for="password" class="block text-sm text-gray-900 mb-2"
                >Re-type Password</label
              >
              <a
                class="text-xs font-thin text-blue no-underline hover:underline"
                href="#"
              >
              </a>
            </div>
            <input
              id="password"
              v-model="form.password2"
              type="password"
              class="block w-full rounded-sm border bg-white py-2 px-3 text-sm"
              name="password"
              required
            />
          </fieldset>

          <button
            type="submit"
            class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
          >
            Register
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-gray-600 font-thin">
        Don't have an account yet?
        <a href="/register" class="text-blue-500 no-underline hover:underline"
          >Sign up</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { useAuth } from '../composable/useAuth';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  import { routerPush } from '../router';
  
  declare interface RegisterCredential {
    email: string;
    name: string;
    password: string;
    password2: string;
  }


  export default defineComponent({
    name: 'RegisterPage',
    async setup() {
      const auth = useAuth();
    //  const toast = useToast();

      const formRef = ref<HTMLFormElement | null>(null);
      const form = reactive<RegisterCredential>({
        email: '',
        name: '',
        password: '',
        password2: '',
      });

      const register = async () => {
        await auth
          .submitRegister(form)
          .then(async (response) => {
              toast.success('Successfully registered!');
              await routerPush('login');
            if (response.data.status === 'success') {
              console.log('success');
            }
          })
          .catch((e: any) => {
            toast.error("Error: " + e, {
                autoClose: 1000,
              });
          });
      };
      // const errors = ref<PostRegisterErrors>({});

      // const register = async () => {
      //   if (!formRef.value?.checkValidity()) return;

      //   const result = await postRegister(form);
      //   if (result.isOk()) {
      //     updateUser(result.value);
      //     await routerPush('global-feed');
      //   } else {
      //     errors.value = await result.value.getErrors();
      //   }
      // };

      return {
        formRef,
        form,
        register,
      };
    },
  });
</script>
