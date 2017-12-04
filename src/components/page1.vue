<template>
  <div id="divBG">
    <div id="soleil" class="soleil">

    </div>
    <div class="grass"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  http: {
   headers: {
     Authorization: 'Basic ZWI3NDJkMDItMTE5NC00MzM4LThiOTgtODdhOTEzMTFmMTg1LWJsdWVtaXg6ODQ4OWU1OTIyNzZlMmRmYTIwNzNlMWY0Nzc4NTdhOTczMzMyZjA5OWU1NjdiN2U0ZDIzNDE3MmY5NjdlODJiYw=='
   }
 },
  components: {
    },
    data () {

        return {
          dbURL: "https://eb742d02-1194-4338-8b98-87a91311f185-bluemix.cloudant.com/sensortag_ec/",
          dbData: [],
          lastItem: "",
          dbLast: "",
          dbDatasCount: 0,
          x: 0
        }
    },
    computed : {
    },
    methods: {
      loadData() {
        this.$http.get(this.dbURL+'_all_docs?limit=20').then((response)=>{
          this.dbDatasCount = JSON.parse(response['bodyText']).total_rows;
          this.dbLast = response["data"]["rows"]["0"].id;
          this.loadLast();
          this.onChange();
          console.log(this.x);
          this.x++;
        },(err)=>{
          console.log(err)
        });
      },
      loadLast() {
        this.$http.get(this.dbURL+this.dbLast).then((response)=>{
          this.lastItem = JSON.parse(response['bodyText']).payload.d;
        },(err)=>{
          console.log(err)
        });
      },
      onChange(){
        this.$http.get(this.dbURL+'_changes').then((response)=>{
          console.log("", response)
          this.dbDatasCount = JSON.parse(response['bodyText']).total_rows;
          this.dbLast = response["data"]["results"]["0"].id;

          this.loadLast();

        //  this.onChange();
        },(err)=>{
          console.log(err)
        });
      },
      defineSky(){
        let moonSky_0 = 0;
        let moonSky_1 = 1;

        let sunSKy_r = 168;
        let sunSKy_g = 168;
        let sunSKy_b = 241;
        let sunSKy_a = 1;

        let sun = document.getElementById("soleil");
        let sky = document.getElementById("divBG");
        // on récupère l'élément*
        let sunPosition = 30;//this.lastItem.ambientLight / 10 - 40;
        let bottum = sunPosition - 40;
        let right = sunPosition - 10;
        if(sunPosition > 0 && sunPosition <= 100){
          sun.style.bottom = bottum.toString()+'%';
          sun.style.right = right.toString()+'%';

          sky.style.backgroundColor = "rgba("+sunSKy_r+","+sunSKy_g+","+sunSKy_b+","+sunSKy_a+")";
        }
        else {
            /*
{ "myName": "sensor", "humidity": 27.1, "objectTemp": 20.16,
"ambientTemp": 24.9, "pressure": 981, "accelX": 1.01, "accelY": 0, "accelZ": -0.06, "gyroX": -0.73, "gyroY": 1.9,
"gyroZ": 1.34, "ambientLight": 712.3, "button1": 0, "button2": 0, "reed": 0, "battery": -1, "timestamp": 1512300822140 }
            */
        }

      //  sun.style.top =
      }
    },
    mounted(){
      this.loadData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: -webkit-auto;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  width: 100%;
  height: 100%;

  background-color: #626264;
}
#divBG{


  height: 470px;
  background-color: red;
  width: 98%;
}
.grass{
  background-image: url(/static/img/grass.05722cc.png);
  position: absolute;
  height: 100%;
  top: 16%;
  width: 98%;
  z-index: 3;
  background-size: 100%;
}
.others{
  width: 98%;
  height: 500px;
  border:  1px solid black;s
  border-radius: 5px;
}
.soleil{
  background-image: url("../assets/lune.png");
  position: absolute;
  background-size: 105%;
  background-position-x: center;
  background-position-y: center;
  z-index: 2;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: yellow;
}
.countData{
  color: red;
}
</style>
