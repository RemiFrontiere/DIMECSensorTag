<template>
  <div class="dashboard">
    <h1>Sensortag EC</h1>
    <h4>{{ this.dbDatasCount}}</h4>
    <div class="contentDash">
      <div class="graph">
        <h3>Lumière Ambiante</h3>
        <trend class="bob"
          :data="this.dbDataAmbientLight"
          :gradient="['black', 'gray', 'white']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
      <div class="graph">
        <h3>Pression</h3>
        <trend class="bob"
          :data="this.dbDataPressure"
          :gradient="['yellow', 'yellow', 'yellow']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
      <div class="graph">
        <h3>Humidité</h3>
        <trend class="bob"
          :data="this.dbDataHum"
          :gradient="['yellow', 'red', 'blue']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
      <div class="graph">
        <h3>Temperatures</h3>
        <trend class="bob"
          :data="this.dbDataTemp"
          :gradient="['blue', 'yellow', 'red']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
      <div class="graph">
        <h3>AccelX</h3>
        <trend class="bob"
          :data="this.dbDataAccelX"
          :gradient="['blue', 'yellow', 'red']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
      <div class="graph">
        <h3>AccelY</h3>
        <trend class="bob"
          :data="this.dbDataAccelY"
          :gradient="['blue', 'yellow', 'red']"
          auto-draw
          smooth
          :stroke-width="3">
        </trend>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  http: {
 headers: {
   Authorization: 'Basic ZWI3NDJkMDItMTE5NC00MzM4LThiOTgtODdhOTEzMTFmMTg1LWJsdWVtaXg6ODQ4OWU1OTIyNzZlMmRmYTIwNzNlMWY0Nzc4NTdhOTczMzMyZjA5OWU1NjdiN2U0ZDIzNDE3MmY5NjdlODJiYw=='
   }
  },
    data () {

        return {
          dbURL: "https://eb742d02-1194-4338-8b98-87a91311f185-bluemix.cloudant.com/sensortag_ec/",
          dbDataAmbientLight: [],
          dbDataPressure: [],
          dbDataTemp: [],
          dbDataHum: [],
          dbDataAccelY: [],
          dbDataAccelX: [],
          lastItem: "",
          dbLast: "",
          dbDatasCount: 0,
          datas: "",
          x: 0
        }
    },
    computed : {
    },
    methods: {
      loadData() {
        this.$http.get(this.dbURL+'_all_docs?limit=15').then((response)=>{
          this.dbDatasCount = JSON.parse(response['bodyText']).total_rows;
          this.datas = response["data"]["rows"];
          //this.loadLast();
          for (var i = 0; i < response["data"]["rows"].length; i++) {
              this.$http.get(this.dbURL+this.datas[i].id).then((response)=>{
                 this.dbDataAmbientLight.push(JSON.parse(response['bodyText']).payload.d.ambientLight);
                 this.dbDataPressure.push(JSON.parse(response['bodyText']).payload.d.pressure);
                 this.dbDataTemp.push(JSON.parse(response['bodyText']).payload.d.ambientTemp);
                 this.dbDataHum.push(JSON.parse(response['bodyText']).payload.d.humidity);
                 this.dbDataAccelX.push(JSON.parse(response['bodyText']).payload.d.accelX);
                 this.dbDataAccelY.push(JSON.parse(response['bodyText']).payload.d.accelY);
               },(err)=>{
                 console.log(err)
               });
            }

          /*  setInterval(function(){
              this.datas = response["data"]["rows"];
            let x=0;
                do {
                //  console.log("https://eb742d02-1194-4338-8b98-87a91311f185-bluemix.cloudant.com/sensortag_ec/" + this.datas[x].id)
                     this.$http.get("https://eb742d02-1194-4338-8b98-87a91311f185-bluemix.cloudant.com/sensortag_ec/"+this.datas[x].id).then((response)=>{
                      this.dbDataAmbientLight.push(JSON.parse(response['bodyText']).payload.d.ambientLight);
                      console.log(this.dbDataAmbientLight);
                    },(err)=>{
                      console.log(err)
                    });
                  x++;
                } while (x < response["data"]["rows"].length);
            }, 10000);*/

/*
var i = setInterval(function(){
    // do your thing
let x=0;
    do {
      console.log(this.datas[x])
      // this.$http.get(this.dbURL+this.datas[x].id).then((response)=>{
      //    this.dbDataAmbientLight.push(JSON.parse(response['bodyText']).payload.d.ambientLight);
      //    console.log(this.dbDataAmbientLight);
      //  },(err)=>{
      //    console.log(err)
      //  });
      x++;
    } while (x < response["data"]["rows"].length);
}, 10000);
*/

        },(err)=>{
          console.log(err)
        });
      },
    },
    mounted(){
      this.loadData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dashboard{
  height: 500px;
  color: yellow;
  width: 90%;
  background-color: #848484;
}

.contentDash{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 84%;
}
.bob{
    height: 50%;
    width: 85%;
}
.graph {
  width: 33%;
  height: 50%;
}

h1{
  margin-bottom: 0
}

h4{
  margin: 0
}
</style>
