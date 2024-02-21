<!-- <template>
    <Form>
      <div
        v-for="field in schema.fields" :key="field.name">
        <label :for="field.name">{{ field.label }}</label>
        <Field :as="field.as" :id="field.name" :name="field.name" />
      </div>
      <button>Submit</button>
    </Form>
  </template>
  <script>
  import { Form, Field } from 'vee-validate';
  export default {
    name: 'DynamicForm',
    components: {
      Form,
      Field,
    },
    props: {
      schema: {
        type: Object,
        required: true,
      },
    },
  };
  </script> -->