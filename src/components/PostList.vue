<template>
    <div v-show="posts.length > 0">
        <h3>Список пользователей</h3>
        <transition-group name="user-list">
            <post-item 
            v-for="post in posts" 
            :post="post" 
            :key="post.id" 
            @remove="$emit('remove', post)"/>
        </transition-group>
    </div>
    <h2 v-show="posts.length === 0" style="color: red">
        Список постов пуст
    </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue"
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style scoped>
.user-list-item {
    display: inline-block;
    margin-right: 18px;
}

.user-list-enter-active,
.user-list-leave-active {
    transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}

.user-list-move {
    transition: transform 0.4s ease;
}
</style>