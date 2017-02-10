<template>
    <div id="map-container" style="width:{{dWidth}};height:{{dHeight}};"></div>
</template>
<script>
import AMap from 'AMap'
export default {
  ready () {
    console.log('this.myMessage', JSON.parse(JSON.stringify(this.myMessage)))
    if (this.myMessage.longitude && !isNaN(this.myMessage.longitude)) {
      console.log('**map1**', this.myMessage.longitude, this.myMessage.latitude)
      this.loadMap(this.myMessage.longitude, this.myMessage.latitude)
    } else {
      var self = this
      AMap.service('AMap.Geocoder', function () { /* 回调函数 */
        var geocoder = new AMap.Geocoder({ /* 实例化Geocoder */
          city: '010' /* 城市，默认：“全国” */
        })
        geocoder.getLocation(self.myMessage.address, function (status, result) {
          console.log(status, result)
          if (status === 'complete' && result.info === 'OK') {
            var geocode = result.geocodes
            var lngX = geocode[0].location.getLng()
            var latY = geocode[0].location.getLat()
            console.log('**map2**')
            self.loadMap(lngX, latY)
          } else {
            console.log('**map3**', status, result)
            self.loadMap()
          }
        })
      })
    }
  },
  vuex: {
    getters: {
    }
  },
  props: ['myMessage'],
  data () {
    return {
      dWidth: window.screen.availWidth + 'px',
      dHeight: window.screen.availHeight + 'px'
    }
  },
  methods: {
    loadMap: function (lngX, latY) {
      var map
      if (lngX && latY && !isNaN(lngX) && !isNaN(latY)) {
        map = new AMap.Map('map-container', {
          resizeEnable: true,
          zoom: 15,
          center: [lngX, latY]
        })
        var marker = new AMap.Marker({
          position: [lngX, latY],
          map: map
        })
        console.log(marker)
      } else {
        map = new AMap.Map('map-container', {
          resizeEnable: true,
          zoom: 15
        })
        console.log(map)
      }
    }
  }
}
</script>
<style>
#map-container {
  // height: 600px;
  // width:500px;
}
</style>
