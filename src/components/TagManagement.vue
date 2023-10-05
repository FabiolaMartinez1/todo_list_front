<template>
  <div style="margin: 0 auto; width: 70%;">
      
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Listado de Etiquetas</h4>
        </div>
        <div class="card-body">
          <div
            v-for= "(tag, index) in tags"
            :key="tag.id"
            class="d-flex align-items-center mb-2"
          >
            <input
              v-model="tag.name"
              class="form-control mr-2"
            />
            <button
              v-if="!tag.new"
              @click="deleteTag(index)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
            <button
              v-if="tag.new"
              @click="deleteNewTag(index)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
          <button @click="addNewTag" class="btn btn-success mr-2">
            Nuevo
          </button>
          <button @click="saveTags" class="btn btn-primary mr-2">
            Guardar
          </button>
          <button @click="cancelEdit" class="btn btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TagService from '../service/TagService.js';

export default {
  name: 'TagManagement',
  data() {
    return {
      tags: [
        // { id: 1, name: 'Etiqueta 1', new: false },
        // { id: 2, name: 'Etiqueta 2', new: false },
        // { id: 3, name: 'Etiqueta 3', new: false },
      ],
      newTag: '',
    };
  },
  created(){
        this.tagService = new TagService();
        //Recuperar datos del LocalStorage si existen
        // const savedTags = JSON.parse(localStorage.getItem('savedTags'));
        // if (savedTags) {
        //   this.tags = savedTags;
        // }
    },
    async mounted(){
        const id = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en tagsMa : " + id);
        const response = await this.tagService.getTags(id);
        this.tags = response.result;
        console.log(this.tags);
        // this.taskService.getAll()
        //     .then(data => {
        //         this.tasks = data.data.result;
        //         console.log(this.tasks);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    },
  methods: {
    addNewTag() {
      this.tags.push({ name: '', new: true });
    },
    deleteTag(index) {
      const tag = this.tags[index];
      if (!tag.new) {
        // Eliminar de la base de datos si no es una nueva etiqueta
        // ...
      }
      this.tags.splice(index, 1);
    },
    deleteNewTag(index) {
      this.tags.splice(index, 1);
    },
    saveTags() {
      // Guardar en la base de datos
      // ...
      // localStorage.setItem('savedTags', JSON.stringify(this.tags));
      this.tags.forEach((tag) => (tag.editable = false));
    },
    cancelEdit() {
      this.tags = this.tags.filter((tag) => !tag.new);
      this.tags.forEach((tag) => (tag.editable = false));
      // localStorage.removeItem('savedTags');
      this.$router.push({ name: 'TaskForm' });
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
