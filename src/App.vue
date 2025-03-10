<template>
<div class="app">
    <h1>Страница с постами</h1>
    <div class="add__btns">
        <my-button
        @click="showDialog"
        >Создать пост</my-button>
        <my-select 
            v-model="selectedSort"
            :options="sortOptions"
        />
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost"/>
    </my-dialog>
    <post-list 
    v-bind:posts="posts" 
    @remove="removePost"
    v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
</div>
</template>
<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [

            ],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = !this.dialogVisible
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    this.posts = response.data;
                    this.isPostsLoading = false;
                }, 1000)
            } catch(e) {
                alert('Ошибка')
            }
        }
    },
    mounted() {
        this.fetchPosts();
    },
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: borde-box;
}

.app {
    padding: 20px;
}

.add__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
</style>
