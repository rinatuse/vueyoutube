<template>
<div class="app">
    <h1>Страница с постами</h1>
    <my-input 
    v-model="searchQuery"
    placeholder="Поиск..."
    >

    </my-input>
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
    v-bind:posts="sortedAndSearchedPosts" 
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
            searchQuery: '',
            page: 1,
            limit: 10,
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
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
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
    computed: {
        sortedPosts() {
        return [...this.posts].sort((post1, post2) => 
           post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
           )
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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
