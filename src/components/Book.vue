<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
        <ul>
            <li class="my-10" v-for="item in data" :key="item.id">
                <p>
                    <span class="text-black dark:text-white text-lg font-bold">
                       <a :href="item.link" target="_blank">
                        {{ item.title }}
                       </a>
                    </span>
                    <br/>
                    <span class="text-lg font-newsreader italic">
                        by <span class="font-bold">{{ item.author }}</span>
                    </span>
                    <br/>
                    <span class="text-sm font-newsreader italic">
                        <span class="font-geistMonoVariable">{{ item.time }}</span>
                    </span>
                </p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { supabase } from '../utils/supabase';

interface DataItem {
  id: number;
  title: string;
  author: string;
  time: string;
  link: string;
}

export default defineComponent({
  name: 'Bookmark',
  setup() {
    const data = ref<DataItem[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('books')
          .select('id, title, author, time, link');

        if (supabaseError) throw supabaseError;

        data.value = supabaseData || [];
        data.value.sort((a, b) => b.time - a.time);
      } catch (err: any) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      data,
      loading,
      error,
    };
  },
});
</script>
