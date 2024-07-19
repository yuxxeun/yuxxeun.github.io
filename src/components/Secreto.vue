<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
        <form class="mx-auto text-center flex items-center justify-betwen">
            <input type="text" disabled placeholder="Give me random message" class="w-full rounded-lg bg-zinc-200/60 p-4 text-sm text-zinc-900 shadow-sm focus:outline-none dark:bg-zinc-900 dark:text-zinc-100"/>
        </form>
        <ul>
            <li class="mt-10" v-for="item in data" :key="item.id">
                <p>
                    <span class="text-black dark:text-white text-lg font-bold">
                        {{ item.txt }}
                    </span>
                    <br/>
                    <span class="text-sm font-newsreader">
                        <span class="font-geistMonoVariable">{{ new Date(item.created_at) }}</span>
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
  created_at: string;
  txt: string;
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
          .from('comments')
          .select('id, created_at, txt');

        if (supabaseError) throw supabaseError;

        data.value = supabaseData || [];
        data.value.sort((a, b) => b.id - a.id);
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
