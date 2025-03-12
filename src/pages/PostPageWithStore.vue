<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input 
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
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
        :posts="sortedAndSearchedPosts" 
        @remove="removePost"
        v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" 
            :key="pageNumber" 
            class="page" 
            :class="{
                'current-page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >{{ pageNumber }}</div>
        </div>
    </div>
    </template>
    <script>
   import store from '@/store';
   import axios from 'axios';
    import PostForm from '@/components/PostForm.vue';
    import PostList from '@/components/PostList.vue';
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    
    export default {
        components: {
            PostForm, PostList
        },
        data() {
            return {
                posts: [
    
                ],
                dialogVisible: false,
            }
        },
    
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
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
            // changePage(pageNumber) {
            //     this.page = pageNumber
            // },
            
        },
        mounted() {
            this.fetchPosts();
            console.log(this.$refs.observer)
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }
            // const callback = (entries, observer) => {
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePosts()
            //     }
            // }
            // const observer = new IntersectionObserver(callback, options)
            // observer.observe(this.$refs.observer);
        },
        computed: {
           ...mapState({
            posts: state => state.post.posts,
            modificatorValue: state => state.post.modificatorValue,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit:state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
           }),
           ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
           }),
        },
        watch: {
            // page() {
            //     this.fetchPosts()
            // }
        }
       
    }
    </script>
    <style scoped>
    
    .add__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    
    .page {
        border: 1px solid black;
        padding: 10px;
    }
    
    .current-page {
        border: 2px solid teal;
    }
    
    .observer {
        height: 30px;
        background: green;
    }
    </style>
    