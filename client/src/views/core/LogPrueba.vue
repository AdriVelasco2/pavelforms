<!-- <template>
    <DynamicForm :schema="formSchema" />
  </template>
  <script>
 import DynamicForm from "../components/DynamicForm.vue"
  export default {
    components: {
      DynamicForm,
    },
    data: () => {
      const formSchema = {
        fields: [
          {
            label: 'nombre',
            name: 'name',
            as: 'input',
          },
          {
            label: 'username',
            name: 'username',
            as: 'input',
          },
          {
            label: 'Your Email',
            name: 'email',
            as: 'input',
            type: 'email',
          },
          {
            label: 'Your Password',
            name: 'password',
            as: 'input',
            type: 'password',
          },
          {
            label: 'Repite tu Password',
            name: 'password2',
            as: 'input',
            type: 'password2',
          },
        ],
      };
      return {
        formSchema,
      };
    },
    methods:{
        validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    },
    }
  };
  </script> -->