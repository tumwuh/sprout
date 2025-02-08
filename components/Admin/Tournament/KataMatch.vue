<script setup lang="ts">
import {useI18n} from "vue-i18n";
import truncateText from "~/utils/truncatingText";

const props = defineProps({
  group: {
    type: String,
    required: true
  }
})

const {t} = useI18n()


const {$pb} = useNuxtApp()

const {data, status} = await useAsyncData(`kataContestant-${props.group}`,
    async () => await $pb.collection('kataContestant').getFullList({
      filter: `group="${props.group}"`,
      expand: 'athletes, athletes.team',
      requestKey: props.group
    }), {
      server: false,
      lazy: true
    })


</script>

<template>
  <div>
    <data-table :status="status"
                :data="data ?? []"
                :col-span="5"
    >
      <template #thead>
        <tr>
          <th></th>
          <th>Nama Tim</th>
          <th>Skor</th>
          <th>Total</th>
          <th></th>
        </tr>
      </template>
      <template v-slot="slotProps">
        <td>{{ slotProps.index + 1 }}</td>
        <td>
          <div class="flex gap-2">
           <div>
             <nuxt-img
                 v-if="slotProps.item?.expand?.athletes[0].expand.team.logo"
                 :src="slotProps.item?.expand?.athletes[0].expand.team.logo"
                 width="25" height="25"
                 class="rounded-full bg-white"
             />
             <nuxt-img
                 v-else
                 src="/tumwuh-leaf.png"
                 width="25" height="25"
                 class="rounded-full bg-white"
             />
           </div>
            <div>
              <ul class="list-disc list-inside">
                <li v-for="item in slotProps.item?.expand?.athletes" :key="item.id" class="tooltip" :data-tip="item.name">
                  {{ truncateText(item.name, 15) }}
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>
          <div class="flex w-[100px] justify-between">
            <span>1 <sup class="line-through">5</sup></span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
        </td>
        <td>27.0</td>
        <td>
          <div class="flex flex-wrap">
            <div class="tooltip tooltip-left" data-tip="Detail Tim">
              <button class="btn btn-xs btn-ghost">
                <Icon name="lucide:eye" size="1.5em"/>
              </button>
            </div>
            <div class="tooltip tooltip-left" data-tip="Maju Ketahap Selanjutnya">
              <button class="btn btn-xs btn-ghost">
                <Icon name="mdi-light:pencil" size="1.5em"/>
              </button>
            </div>
            <div class="tooltip tooltip-left" data-tip="Jadikan Juara">
              <button class="btn btn-xs btn-ghost">
                <Icon name="fe:medal" size="1.5em"/>
              </button>
            </div>
          </div>
        </td>
      </template>
    </data-table>

  </div>
</template>

<style scoped>

</style>