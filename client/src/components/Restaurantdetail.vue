<template lang="html">
  <div class="restaurant-detail">
    <h2>{{ restaurant.name }}</h2>
    <p>Restaurant range: {{restaurant.range}}</p>
    <p>Cuisine: {{restaurant.cuisine}}</p>
    <p>Location: {{restaurant.location}}</p>
    <p>Postcode: {{restaurant.postcode}}</p>
    <p>Phone Number: {{restaurant.phone}}</p>

    <form v-on:submit="submit" id="review-form">
      <textarea placeholder="Add Review" type="text" name="review"></textarea>
      <input class="submit" type="submit">
    </form>

    <restaurant-review  v-for="review in restaurant.reviews"  :review="review" >
    </restaurant-review>


    <div id="ratings">
      <star-rating   @rating-selected ="setRating" ></star-rating>
    </div>
    <br>

    <button class="ratings-button" type="button" name="button" v-on:click="seeRatingsHighchart" >see ratings </button>
    <restaurant-highcharts v-if="showChart" :restaurant="restaurant"></restaurant-highcharts>

  </div>

</template>

<script>
import { eventBus } from '@/main.js'
import StarRating from 'vue-star-rating'
import RestaurantRatingChart from '@/components/RestaurantRatingChart.vue'
import RestaurantsService from '@/services/RestaurantsService'
import RestaurantReview from '@/components/RestaurantReview'

export default {
  name: "restaurant-detail",
  data(){
    return{
      rating: [],
      showChart: false,
      resetableRating: 0,
      review:""
    }

  },


  props:['restaurant'],
  methods: {
    deleteRestaurant(){
      RestaurantsService.deleteRestaurant(this.restaurant._id)
      .then(() => eventBus.$emit('restaurant-deleted', this.restaurant._id))
    },
    submit(){
      event.preventDefault();
      this.restaurant.reviews.push(event.target.review.value);
      let reviewsLocal = {
        "reviews":[]
      }
      reviewsLocal.reviews = this.restaurant.reviews
      RestaurantsService.UpdateRestaurant(this.restaurant._id , reviewsLocal);
      event.target.reset()
    },
    setRating(rating)
    {

      let rat = rating
      this.rating.push(rat);
      let lastRating = this.rating.pop()
      this.restaurant.ratings.push(lastRating)
      let ratingsArray ={
        "ratings":[]
      }
      ratingsArray.ratings=this.restaurant.ratings
      RestaurantsService.UpdateRestaurant(this.restaurant._id , ratingsArray)
      eventBus.$emit('restaurant-highchartRating', this.restaurant.ratings)
    },

    seeRatingsHighchart(){
      this.showChart = true
    }

  },


  components:{
    'restaurant-review': RestaurantReview,
    'restaurant-highcharts': RestaurantRatingChart,
    StarRating


  },
  mounted() {
    eventBus.$on('restaurant-selected', (restaurant) => {
      this.showChart = false;
    })
  }
}
</script>

<style lang="css" scoped>

/* body {
font-family: 'Raleway', sans-serif;
} */

/* .custom-text {
font-weight: bold;
font-size: 1.9em;
border: 1px solid #cfcfcf;
padding-left: 10px;
padding-right: 10px;
border-radius: 5px;
color: #999;
background: #fff;
} */

.restaurant-detail {
font-family: 'Oswald', sans-serif;
font-size: 24px;}

h2 {
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 15px;
}

textarea {
  font-size: 20px;
  font-weight: 300;
  margin-top: 10px;
  width: 300px;
  height: 200px;
}

textarea::placeholder {
  font-size: 20px;
}

p {
  padding-left: 0;
  margin-bottom: 10px;
}

.submit {
  background-color: #FA6C50;
  box-shadow: 5px 10px #E8553E;
  padding: 20px;
  font-family: 'Lakki Reddy', cursive;
  font-size: 20px;
  border: none;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#ratings {
  margin-top: 25px;
}

.ratings-button {
  background-color: #FDCD56;
  box-shadow: 5px 10px #F5B945;
  padding: 20px;
  font-family: 'Lakki Reddy', cursive;
  font-size: 20px;
  border: none;
  margin-top: 20px;

}

</style>
