<template lang="pug">
  .home
    .loading(v-if="isLoading")
      .loading__outer
        .loading__inner
          .loading__mark
      .loading__stars
        .loading__star
        .loading__star
        .loading__star
        .loading__star
        .loading__star
    .container.aqi.h-py-6
      .row.h-mb-5
        .col-4
          h1.aqi__title.h-mb-3 空氣品質指標 (AQI)
          .aqi__selects
            select.aqi__select.h-p-3(v-model="Countys")
              option(value="請選擇地區" disabled) 請選擇地區
              option(:value="County" v-for="County in getCounty" :key="County") {{County}}
        .col-8
          .row.no-gutters.h-100
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv1
                span 0~50
              .aqi__standard__status
                span 良好
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv2
                span 51~100
              .aqi__standard__status
                span 普通
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv3
                span 101~150
              .aqi__standard__status
                span 對敏感族群 不健康
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv4
                span 151~200
              .aqi__standard__status
                span 對所有族群 不健康
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv5
                span 201~300
              .aqi__standard__status
                span 非常不健康
            .col.aqi__standard
              .aqi__standard__num.aqi__standard__num--lv6
                span 301~400
              .aqi__standard__status
                span 危害
      .aqi__currentCity.h-mb-5(v-if="Countys")
        h2.aqi__currentCity__title {{Countys}}
        .aqi__currentCity__hr.h-px-3
          svg(width="100%" height="11px")
            path(d="M 0 6 L 830 6" stroke="#121212" stroke-linecap="round"
            stroke-width="1" stroke-dasharray="3,3" fill="none")
        .aqi__currentCity__updateTime(v-if ="getUpdateTime")
          span {{getUpdateTime}}
          span.h-ml-3 update
      .row
        .col-4.aqi__currentZone(v-if="currentZone.SiteName")
          .row.no-gutters
            .col-6.h-py-3(:class="currentZone.SiteName | getSize") {{currentZone.SiteName}}
            .col-6.aqi__currentZone__status.h-py-3(:class="currentZone.Status | getColor") {{currentZone.AQI | getNum}}
            .col-12.aqi__currentZone__gass
              .h-p-3
                ul.aqi__currentZone__gas
                  li
                    b 臭氧
                    span.h-ml-2 O3 (ppb)
                    b.h-ml-auto {{currentZone.O3 | getNum}}
                  li
                    b 懸浮微粒
                    span.h-ml-2 PM10 (μg/m³)
                    b.h-ml-auto {{currentZone.PM10 | getNum}}
                  li
                    b 細懸浮微粒
                    span.h-ml-2 PM2.5 (μg/m³)
                    b.h-ml-auto {{currentZone['PM2.5'] | getNum}}
                  li
                    b 一氧化碳
                    span.h-ml-2 CO (ppm)
                    b.h-ml-auto {{currentZone.CO | getNum}}
                  li
                    b 二氧化硫
                    span.h-ml-2 SO2 (ppb)
                    b.h-ml-auto {{currentZone.SO2 | getNum}}
                  li
                    b 二氧化氮
                    span.h-ml-2 NO2 (ppb)
                    b.h-ml-auto {{currentZone.NO2 | getNum}}
        .col-8
          .row
            .col-6.h-mb-5(v-for="item in getCurrentCounty" :key="item.SiteName" @click="getCurrentZone(item)")
              .aqi__zoneList(:class="{'aqi__zoneList--active': currentZone.SiteName === item.SiteName}")
                h4(:class="{'aqi__zoneList__title' : item.SiteName.length < 3,'aqi__zoneList__titleSmall' : item.SiteName.length > 2}") {{item.SiteName}}
                span.aqi__zoneList__num(:class="item.Status | getColor") {{item.AQI | getNum}}
    Footer
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import { mapGetters, mapMutations } from 'vuex';
import Footer from '@/components/footer.vue';

export default {
  name: 'home',
  data() {
    return {
      zones: [],
      currentZone: {},
      Countys: '',
      isLoading: true,
    };
  },
  methods: {
    getData() {
      const vm = this;
      const api = `${process.env.VUE_APP_GoogleAppScript}?url=${process.env.VUE_APP_AQI}`;
      fetch(api, { method: 'get' }).then(response => response.json()).then((response) => {
        vm.zones = response;

        const num = Math.floor(Math.random() * vm.zones.length);
        vm.currentZone = vm.zones[num - 1];
        vm.Countys = vm.currentZone.County;
        vm.isLoading = false;
      }).catch((err) => {
        throw new Error(err);
      });
    },
    getCurrentZone(item) {
      const vm = this;
      vm.currentZone = item;
    },
    // ...mapMutations(['GETCURRENTZONE']),
  },
  computed: {
    getCounty() {
      const vm = this;
      const ary = [];
      vm.zones.forEach((item) => {
        if (ary.indexOf(item.County) === -1) {
          ary.push(item.County);
        }
      });
      return ary;
    },
    getCurrentCounty() {
      const vm = this;
      return vm.zones.filter(item => item.County === vm.Countys);
    },
    getUpdateTime() {
      const vm = this;
      let time = '';
      const ary = vm.zones.filter(item => item.County === vm.Countys);
      ary.forEach((item) => {
        if (item.PublishTime && !time) {
          time = item.PublishTime;
        }
      });
      return time;
    },
    // Countys: {
    //   get() {
    //     return this.$store.state.Countys;
    //   },
    //   set(value) {
    //     this.$store.commit('GETCOUNTYS', value);
    //   },
    // },
    // ...mapGetters(['currentZone', 'isLoading', 'zones']),
  },
  components: {
    Footer,
  },
  created() {
    this.getData();
    // this.$store.dispatch('getData');
  },
};
</script>
