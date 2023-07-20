<template>
  <div class="echart" ref="pie"></div>
</template>

<script>
export default {
  props: {
    vdata: {
      type: Array,
      default: () =>[
        {name: 'a',value: 44}, 
        {name: 'b',value: 55}, 
        {name: 'c',value: 16}
      ]
    }
  },

  data () {
    return {
      
    }
  },

  watch: {
    vdata: {
      handler() {
        this.F_init();
      },
      deep: true
    }
  },

  mounted () {
    this.F_init();
  },

  methods: {
    F_init() {
      const { Basis, Pie } = this.$mychar;

      const data = {
        data:this.vdata,
        opacity:'.8',
        color:['#0089e5','#4134d5','#0dca9c','#00c1e1'],
      }

      let options = new Pie().renderPie3D(data);
      
      this.custom(options);

      Basis.render(this.$refs.pie, options);
    },

    // 自定义配置
    custom(options) {
      // options.legend.orient = 'horizontal';
      // options.grid3D.top = '-10%';
      var arr = [],color = ['#6495ED','#538aeb','#3e6ec3']
      for (let i = 0; i < 3; i++) {
        arr.push({
          name: 'mouseoutSeries',
          type: 'surface',
          parametric: true,
          wireframe: {show: false,},
          itemStyle: {
            opacity: 0.06,
            color: color[i],
          },
          parametricEquation: {
            u: {min: 0,max: Math.PI * 2,step: Math.PI / 20,},
            v: {min: 0,max: Math.PI,step: Math.PI / 20,},
            x: function (u, v) {return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * (3.5+i*0.3)},
            y: function (u, v) {return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * (3.5+i*0.3)},
            z: function (u, v) {return Math.cos(v) > 0 ? 0-(i*0.1) : -1-(i*0.1);},
          },
        });
        options.series.push(...arr)
      }
    }
  },

}
</script>

<style lang='scss' scoped>
  .echart {
    width: 100%;
    height: 100%;
  }
</style>