import store from '@/store';
import axios from 'axios';
export const postModule = {
    state: () => ({
        posts: [

        ],
        modificatorValue: '',
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По содержимому' },
        ]
    }),
    getters: {
        sortedPosts(state, getters) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            )
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.selectedSort = searchQuery
        }
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
                commit('setLoading', false)

            } catch (e) {
                alert('Ошибка')
            }
        },

        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit))
                    commit('setSearchQuery', [...state.posts, ...response.data])
                }, 1000)
            } catch (e) {
                alert('Ошибка')
            }
        }
    },
    namespaced: true
}