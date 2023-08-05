let menuBar = document.querySelector(".bars")
let navbar = document.querySelector("nav")
let times = document.querySelector(".main-header .fa-times")
let searchBar = document.querySelector(".main-header .fa-search")
let searchForm = document.querySelector(".search-form")
let searchInput = document.querySelector(".search-form input")
let searchBtn = document.querySelector(".main-header .fa-search")
let featuredSlide = document.querySelector(".main-main .main-featured .swiper-wrapper")

let featuredLeft = document.querySelector(".main-main .main-featured .fa-angle-left")
let featuredRight = document.querySelector(".main-main .main-featured .fa-angle-right")
let featured = document.querySelector(".main-featured")
let mainBody = document.querySelector(".main-main")
let count = 0
  let interval;
  let subFeaturedInterval;
let secondFeaturedInterval
let fTimeout;
let isFunctioning = true

//Creating a functional menubar
function toggleMenu(){
  navbar.classList.add("active")
  menuBar.style.display = "none"
  times.style.display = "block"
}

function removeMenu(){
  navbar.classList.remove("active")
  menuBar.style.display = "flex"
  times.style.display = "none"
}

menuBar.addEventListener("click", toggleMenu)
times.addEventListener("click", removeMenu)

/* Search Form and its visibility functionality */

function displayFormInput(){
  featuredSlide.classList.toggle("active")
  searchForm.classList.toggle("active")
}

searchBtn.addEventListener("click", displayFormInput)


/* Creating an automated Slider for the featured*/
  /*Without Touching the images */


/* Creating Trending Movie for Featured */

  const trending = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGRmNjlmYjFiODVhZWIyNzY2ODkyZmRiZmFhMGFiZCIsInN1YiI6IjY0YzQwMjQ5NjZhMGQzMDEzYjNjYTU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qljTgqJazh41n86BOHAdG602Ek6FmeulrW_rTqeHqv4'
  }
};
async function forTrendingMovies(){
  if(isFunctioning){
  try{
let res = await fetch('https://api.themoviedb.org/3/trending/all/week', trending)
  let data = await res.json()
  let results = data.results
  
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  
results.forEach((info,idx) => {

let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
 
 image.append(tag)
 featuredSlide.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)
 
 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
 tag.classList.add("tag")
 
img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

tag.innerHTML = info.media_type
if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })

let featuredSlideItems = document.querySelectorAll(".main-featured .image")

featuredSlideItems.forEach((el,idx)=>{
  el.addEventListener("click", ()=>{
      getMovieInfo('movie',results[idx].id)
      isFunctioning = false
      clearInterval(interval)
  })
})


automateSlide(featuredSlideItems)

function manualSlideRight(){
count++

let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 100}%)`
    }
    else{
      count = 0
    }
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(interval)
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 50}%)`
    }
    else{
      count = 0
    }
}
else {
  clearInterval(interval)
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 33.3}%)`
    }
    else{
      count = 0
    }
}
}

// manual slides with btns
function manualSlideLeft(){
count--
  let windowW = window.innerWidth
  
  if (windowW > 0 && windowW < 600) {
    if (count >= 0) {
      featuredSlide.style.transform = `translate(-${count * 100}%)`
    }
    else {
      count = 0
    }
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(interval)
    if (count >= 0) {
      featuredSlide.style.transform = `translate(-${count * 50}%)`
    }
    else {
      count = 0
    }
  }
  else {
    clearInterval(interval)
    if (count >= 0) {
      featuredSlide.style.transform = `translate(-${count * 33.3}%)`
    }
    else {
      count = 0
    }
  }

}

featuredRight.addEventListener("click", ()=>{
  if(featuredRight.classList.contains("fa-angle-right")){
    clearInterval(interval)
    
  fTimeout =  setTimeout(()=>{
      automateSlide(featuredSlideItems)
    },500)
  }
manualSlideRight(featuredSlideItems)
})

featuredLeft.addEventListener("click",()=>{
  if(featuredRight.classList.contains("fa-angle-left")){
    clearInterval(interval)
    
 fTimeout = setTimeout(()=>{
   clearTimeout(fTimeout)
      automateSlide(featuredSlideItems)
    },500)
  }manualSlideLeft(featuredSlideItems)
})

}
catch(e){
  console.log(e);
}
  }
}

forTrendingMovies()



function automateSlide(featuredSlideItems) {

featuredSlideItems.forEach((el,idx) => {
el.style.transform = `translate(${idx * 100}%)`
})



let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  clearInterval(interval)
 interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 100}%)`
    }
    else{
      count = -1
    }
},4000)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(interval)
  interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 50}%)`
    }
    else{
      count = -1
    }
},4000)
}
else {
  clearInterval(interval)
  interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 33.3}%)`
    }
    else{
      count = -1
    }
},4000)
}
window.addEventListener("resize", ()=>{
  clearInterval(interval)
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 100}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(interval)
     interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 50}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
   else {
     clearInterval(interval)
     interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 33.3}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
})
}










// //......................................................




// Creating an automated Slider for the sub featured

let subFeaturedSlide = document.querySelector(".main-main .sub-featured .contain")
let subFeaturedSlideItems = document.querySelectorAll(".main-main .sub-featured .contain .image")
let subFeaturedLeft = document.querySelector(".main-main .sub-featured .paginators .fa-step-backward")
let subFeaturedRight = document.querySelector(".main-main .sub-featured .paginators .fa-step-forward")
let a =  document.querySelector(".sub-featured")


let subFeaturedCount = 0
let subFTimeout;

//Without Touching the images 
 
 const featuredOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGRmNjlmYjFiODVhZWIyNzY2ODkyZmRiZmFhMGFiZCIsInN1YiI6IjY0YzQwMjQ5NjZhMGQzMDEzYjNjYTU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qljTgqJazh41n86BOHAdG602Ek6FmeulrW_rTqeHqv4'
  }
};


async function displayFeaturedMovies(){
try{
let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=2', featuredOptions)
let data =  await res.json()
let results = data.results
  
 let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  

  
  
results.forEach((info,idx) => {
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  
 image.append(tag)
 subFeaturedSlide.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)
 
 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
 tag.classList.add("tag")
 
img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

tag.innerHTML = "Featured"
if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })
 
 
 let subFeaturedSlideItems = document.querySelectorAll(".sub-featured .contain .image")


 subFeaturedSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`
})
 
 
 
 
subFeaturedSlideItems.forEach((el,idx)=>{
  el.addEventListener("click", ()=>{
      getMovieInfo('movie',results[idx].id)
      clearInterval(subFeaturedInterval)
  })
})
 
 
 function manualSubFSlideRight(subFeaturedSlideItems){
       subFeaturedCount++
let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    
      if (subFeaturedCount < subFeaturedSlideItems.length) {
       subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }
  else if (windowW > 600 && windowW < 1100) {
    
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }
  else {
    
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }

  }
  
  
 function manualSubFSlideLeft(subFeaturedSlideItems){
   subFeaturedCount--

let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    
      if (subFeaturedCount >= 0) {
       subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }
  else if (windowW > 600 && windowW < 1100) {
      if (subFeaturedCount >= 0) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }
  else {
    
      if (subFeaturedCount >= 0) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
      }
      else {
        subFeaturedCount = 0
      }
  }
  
  }
  automateSubFSlide(subFeaturedSlideItems)
subFeaturedRight.addEventListener("click", ()=>{
   if(subFeaturedRight.classList.contains("fa-step-forward")){
    clearInterval(subFeaturedInterval)
    
   subFTimeout =  setTimeout(()=>{
clearTimeout(subFTimeout)
      automateSubFSlide(subFeaturedSlideItems)
    },1000)
   }
  manualSubFSlideRight(subFeaturedSlideItems)
 })
 
  subFeaturedLeft.addEventListener("click",()=>{
    if (subFeaturedRight.classList.contains("fa-step-backward")) {
      clearInterval(subFeaturedInterval)
    
      subFTimeout = setTimeout(() => {
        clearTimeout(subFTimeout)
        automateSubFSlide(subFeaturedSlideItems)
      }, 10000)
    }
      manualSubFSlideLeft(subFeaturedSlideItems)
  })
  
}
catch(e){
  console.log(e);
}
}
 displayFeaturedMovies()
 
 
function automateSubFSlide(subFeaturedSlideItems) {
 
  
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(subFeaturedInterval)
  subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
       subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
      }
      else {
        subFeaturedCount = -1
      }
      
    }, 3500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(subFeaturedInterval)
    subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
      }
      else {
        subFeaturedCount = -1
      }
    }, 3500)
  }
  else {
    clearInterval(subFeaturedInterval)
    subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
      }
      else {
        subFeaturedCount = -1
      }
      
    }, 3500)
  }

  window.addEventListener("resize", () => {
  
    let windowW = window.innerWidth

    if (windowW > 0 && windowW < 600) {
      clearInterval(subFeaturedInterval)
      subFeaturedInterval = setInterval(() => {
        subFeaturedCount++
        if (subFeaturedCount < subFeaturedSlideItems.length) {
         subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
        }
        else {
          subFeaturedCount = -1
        }
      }, 3500)
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(subFeaturedInterval)
      subFeaturedInterval = setInterval(() => {
        subFeaturedCount++
        if (subFeaturedCount < subFeaturedSlideItems.length) {
          subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
        }
        else {
          subFeaturedCount = -1
        }
      }, 3500)
    }
    else {
      clearInterval(subFeaturedInterval)
      subFeaturedInterval = setInterval(() => {
        subFeaturedCount++
        if (subFeaturedCount < subFeaturedSlideItems.length) {
          subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
        }
        else {
          subFeaturedCount = -1
        }
      }, 3500)
    }
  })
  
}



 //manual slides with btns
 
 
 
 
// ***************************************"""*""**
 
//Second Featured Slider 

//Automatic Slider below

let secondFeaturedSlide = document.querySelector("#second-featured .swiper-wrapper")
let secondFeaturedSlideItems = document.querySelectorAll("#second-featured .swiper-wrapper .image")
let secondFeaturedLeft = document.querySelector("#second-featured header .fa-step-backward")
let secondFeaturedRight = document.querySelector("#second-featured header .fa-step-forward")
let secondFeaturedCount = 0



const upcoming = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGRmNjlmYjFiODVhZWIyNzY2ODkyZmRiZmFhMGFiZCIsInN1YiI6IjY0YzQwMjQ5NjZhMGQzMDEzYjNjYTU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qljTgqJazh41n86BOHAdG602Ek6FmeulrW_rTqeHqv4'
  }
};

async function upcomingMovies(){
let res = await fetch('https://api.themoviedb.org/3/movie/upcoming', upcoming)
 let data = await res.json()
 let results = data.results
 
 let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  

  
  
results.forEach((info,idx) => {
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  
 image.append(tag)
 secondFeaturedSlide.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)
 
 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
 tag.classList.add("tag")
 
img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`


if(info.original_title === undefined){
  let date = new Date(String(info.release_date)).toDateString()
movieName.innerHTML = info.name
tag.innerHTML = date
}
else{
  let date = new Date(String(info.release_date)).toDateString()
movieName.innerHTML = info.title
tag.innerHTML = date
}


 })
 
 
 let secondFeaturedSlideItems = document.querySelectorAll("#second-featured .swiper-wrapper .image")
 
 secondFeaturedSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`

  el.addEventListener("click", ()=>{
      getMovieInfo('movie',results[idx].id)
      clearInterval(secondFeaturedInterval)
  })


})
 
 automateSecondFSlide(secondFeaturedSlideItems)
 
 secondFeaturedRight.addEventListener("click",()=>{
   if (secondFeaturedRight.classList.contains("fa-step-forward")) {
        clearInterval(secondFeaturedInterval)
  
        setTimeout(() => {
          automateSecondFSlide(secondFeaturedSlideItems)
        }, 2500)
      }
   manualSecondFSlideRight(secondFeaturedSlideItems)
})
secondFeaturedLeft.addEventListener("click",()=>{
      if (secondFeaturedRight.classList.contains("fa-step-backward")) {
        clearInterval(secondFeaturedInterval)
  
        setTimeout(() => {
          automateSecondFSlide(secondFeaturedSlideItems)
        }, 2500)
      }
  manualSecondFSlideLeft(secondFeaturedSlideItems)
})

}
upcomingMovies()





function automateSecondFSlide(secondFeaturedSlideItems) {
let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  clearInterval(secondFeaturedInterval)
 secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(secondFeaturedInterval)
  secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
else {
  clearInterval(secondFeaturedInterval)
  secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
window.addEventListener("resize", ()=>{
  clearInterval(secondFeaturedInterval)
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
     clearInterval(secondFeaturedInterval)
    secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(secondFeaturedInterval)
     secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
   else {
     clearInterval(secondFeaturedInterval)
     secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
})
}


//Manual Slide for Second Featured

function manualSecondFSlideRight(secondFeaturedSlideItems){
secondFeaturedCount++

let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
else if(windowW > 600 && windowW < 1100){
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
else {
  
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
}

function manualSecondFSlideLeft(secondFeaturedSlideItems){
secondFeaturedCount--

let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  
    if(secondFeaturedCount >= 0){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
else if(windowW > 600 && windowW < 1100){
  
    if(secondFeaturedCount >= 0){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
else {
  
    if(secondFeaturedCount >= 0){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
    }
    else{
      secondFeaturedCount = 0
    }
}
}



//*****************************/

// Movie Slide Automation


let movieSlide = document.querySelector(".main-main .movie-slide .contain")
let movieSlideTotal = document.querySelector(".main-main .movie-slide .total-no")
let movieCount = 0
let movieSlideInterval

//Without Touching the images 
 
// Replace 'YOUR_API_KEY' with your actual TMDb API key
const apiKey = '8ddf69fb1b85aeb2766892fdbfaa0abd';
const baseUrl = 'https://api.themoviedb.org/3';
const moviesToFetch = 100;

async function fetchAllMovies() {
  const selectedMovies = [];

  try {
    let page = 2;

    while (selectedMovies.length < moviesToFetch) {
      const response = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&primary_release_date.gte=2020-01-01&page=${page}`
      )
      const data = await response.json();
      const movies = data.results || [];

      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }

      if (movies.length === 0) {
        break;
      }

      selectedMovies.push(...movies);
      page++
    }

    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")

 selectedMovies.forEach(info =>{
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
   image.append(tag)
   movieSlide.append(image)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
   tag.classList.add("tag")
   
 
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  tag.innerHTML = "Movie"
 movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join('')


  })
  movieSlideTotal.innerHTML = selectedMovies.length
  let movieSlideItems = document.querySelectorAll(".movie-slide .contain .image")
  
  
  movieSlideItems.forEach((el, idx) => {
    el.style.transform = `translate(${idx * 100}%)`

  el.addEventListener("click", ()=>{
      getMovieInfo('movie',selectedMovies[idx].id)
      clearInterval(secondFeaturedInterval)
  })


  })
  

  automateMovieSlide(movieSlideItems) 


  } catch (error) {

  }
}

fetchAllMovies();

function automateMovieSlide(movieSlideItems) {
 
  
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(movieSlideInterval)
  movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
       movieSlide.style.transform = `translate(-${movieCount * 33.3}%)`
      }
      else {
        movieCount = -1
      }
      
    }, 2500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(movieSlideInterval)
    movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
        movieSlide.style.transform = `translate(-${movieCount * 25}%)`
      }
      else {
        movieCount = -1
      }
    }, 2500)
  }
  else {
    clearInterval(movieSlideInterval)
    movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
        movieSlide.style.transform = `translate(-${movieCount * 20}%)`
      }
      else {
        movieCount = -1
      }
      
    }, 2500)
  }

  window.addEventListener("resize", () => {
  
    let windowW = window.innerWidth

    if (windowW > 0 && windowW < 600) {
      clearInterval(movieSlideInterval)
      movieSlideInterval = setInterval(() => {
        movieCount++
        if (movieCount < movieSlideItems.length) {
         movieSlide.style.transform = `translate(-${movieCount * 33.3}%)`
        }
        else {
          movieCount = -1
        }
      }, 2500)
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(movieSlideInterval)
      movieSlideInterval = setInterval(() => {
        movieCount++
        if (movieCount < movieSlideItems.length) {
          movieSlide.style.transform = `translate(-${movieCount * 25}%)`
        }
        else {
          movieCount = -1
        }
      }, 2500)
    }
    else {
      clearInterval(movieSlideInterval)
      movieSlideInterval = setInterval(() => {
        movieCount++
        if (movieCount < movieSlideItems.length) {
          movieSlide.style.transform = `translate(-${movieCount * 20}%)`
        }
        else {
          movieCount = -1
        }
      }, 2500)
    }
  })
  
}


//********************************"*******"
/*automating TV featuted Slide */
let tvFeaturedSlide = document.querySelector(".tv-featured-slide .swiper-wrapper")
let tvFeaturedCount = 0
let tvFeaturedInterval;


let apiKeyTvF = "8ddf69fb1b85aeb2766892fdbfaa0abd"
let tvFUrl = 'https://api.themoviedb.org/3'
let tvFeaturedTotal = 100
let selectedTvFeatured = []

async function allTvFeatured(){
try {
  let page = 1

while (selectedTvFeatured.length < tvFeaturedTotal) {
  let res = await fetch(`${tvFUrl}/discover/tv?api_key=${apiKeyTvF}&first_air_date.gte=2023-01-01&page=${page}`)
  let data = await res.json()
  let results = data.results || []

  if(results.length === 0){
    break
  }

  selectedTvFeatured.push(...results)
  page++
}

let image = document.createElement("div")
let img = document.createElement("img")
let item = document.createElement("div")
let movieName = document.createElement("div")
let year = document.createElement("div")
let tag = document.createElement("div")

selectedTvFeatured.forEach(info =>{
let image = document.createElement("div")
let img = document.createElement("img")
let item = document.createElement("div")
let movieName = document.createElement("div")
let year = document.createElement("div")
let tag = document.createElement("div")

image.append(tag)
tvFeaturedSlide.append(image)
image.append(img)
image.append(item)
item.append(movieName)
item.append(year)

image.classList.add("image")
item.classList.add("item")
movieName.classList.add("movie-name")
year.classList.add("year")
tag.classList.add("tag")


img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

tag.innerHTML = "Tv Featured"
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join('')


})


let tvFeaturedSlideItems = document.querySelectorAll(".tv-featured-slide .swiper-wrapper .image")

tvFeaturedSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`
  el.addEventListener("click", ()=>{
      getMovieInfo('tv',selectedTvFeatured[idx].id)
  })

})

automateTvFSlide(tvFeaturedSlideItems)
} catch (e) {
  console.log(e)
}
}

allTvFeatured()

function automateTvFSlide(tvFeaturedSlideItems) {
let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  clearInterval(tvFeaturedInterval)
 tvFeaturedInterval = setInterval(() =>{
    tvFeaturedCount++
    if(tvFeaturedCount < tvFeaturedSlideItems.length){
    tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 100}%)`
    }
    else{
      tvFeaturedCount = -1
    }
},2500)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(tvFeaturedInterval)
  tvFeaturedInterval = setInterval(() =>{
    tvFeaturedCount++
    if(tvFeaturedCount < tvFeaturedSlideItems.length){
    tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 50}%)`
    }
    else{
      tvFeaturedCount = -1
    }
},2500)
}
else {
  clearInterval(tvFeaturedInterval)
  tvFeaturedInterval = setInterval(() =>{
    tvFeaturedCount++
    if(tvFeaturedCount < tvFeaturedSlideItems.length){
    tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 33.3}%)`
    }
    else{
      tvFeaturedCount = -1
    }
},2500)
}
window.addEventListener("resize", ()=>{
  clearInterval(tvFeaturedInterval)
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
     clearInterval(tvFeaturedInterval)
    tvFeaturedInterval = setInterval(() =>{
       tvFeaturedCount++
       if(tvFeaturedCount < tvFeaturedSlideItems.length){
       tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 100}%)`
       }
       else{
         tvFeaturedCount = -1
       }
   },2500)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(tvFeaturedInterval)
     tvFeaturedInterval = setInterval(() =>{
       tvFeaturedCount++
       if(tvFeaturedCount < tvFeaturedSlideItems.length){
       tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 50}%)`
       }
       else{
         tvFeaturedCount = -1
       }
   },2500)
   }
   else {
     clearInterval(tvFeaturedInterval)
     tvFeaturedInterval = setInterval(() =>{
       tvFeaturedCount++
       if(tvFeaturedCount < tvFeaturedSlideItems.length){
       tvFeaturedSlide.style.transform = `translate(-${tvFeaturedCount * 33.3}%)`
       }
       else{
         tvFeaturedCount = -1
       }
   },2500)
   }
})
}

//********"***;+*+$-+$+$-*:*:$-$-$--*-**-;*;"

/* TV Show Slide Automation*/


let tvShowSlide = document.querySelector(".tv-shows .contain")
let tvShowTotalNo = document.querySelector(".tv-shows header .see-all .total-no")
let tvShowCount = 0
let tvShowSlideInterval;
/*Without Touching the images */



const apiKeyTv= '8ddf69fb1b85aeb2766892fdbfaa0abd'; // Replace with your actual TMDb API key
const baseUrlTv = 'https://api.themoviedb.org/3';
let tvTotal = 100
let selectedTv = []

async function showAllTvShows() {

  try {
    let page = 4
    while (selectedTv.length < tvTotal) {
      let res = await fetch(`${baseUrlTv}/discover/tv?api_key=${apiKeyTv}&first_air_date.gte=2021-01-01&page=${page}`)
      let data = await res.json()
      let tv = data.results || []

      if (tv.length === 0) {
        break
      }
      
      selectedTv.push(...tv)
      page++
     
    }

    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")

 selectedTv.forEach(info =>{
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")

   tvShowSlide.append(image)
   image.append(tag)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
   tag.classList.add("tag")
 
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  tag.innerHTML = "Tv"
 movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join('')
  })
tvShowTotalNo.innerHTML = selectedTv.length
   
  let tvShowSlideItems = document.querySelectorAll(".tv-shows .contain .image")



 tvShowSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`
  el.addEventListener("click", ()=>{
      getMovieInfo('tv',selectedTv[idx].id)

})
})
automateTvShowSlide(tvShowSlideItems)
  } catch (error) {
 console.log(error)
  }
}

showAllTvShows()

function automateTvShowSlide(tvShowSlideItems) {


  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(tvShowSlideInterval)
    movieSlideInterval = setInterval(() => {
      tvShowCount++
      if (tvShowCount < tvShowSlideItems.length) {
        tvShowSlide.style.transform = `translate(-${tvShowCount * 33.3}%)`
      }
      else {
        tvShowCount = -1
      }

    }, 2500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(tvShowSlideInterval)
    tvShowSlideInterval = setInterval(() => {
      tvShowCount++
      if (tvShowCount < tvShowSlideItems.length) {
        tvShowSlide.style.transform = `translate(-${tvShowCount * 25}%)`
      }
      else {
        tvShowCount = -1
      }
    }, 2500)
  }
  else {
    clearInterval(tvShowSlideInterval)
    tvShowSlideInterval = setInterval(() => {
      tvShowCount++
      if (tvShowCount < tvShowSlideItems.length) {
        tvShowSlide.style.transform = `translate(-${tvShowCount * 20}%)`
      }
      else {
        tvShowCount = -1
      }

    }, 2500)
  }

  window.addEventListener("resize", () => {

    let windowW = window.innerWidth

    if (windowW > 0 && windowW < 600) {
      clearInterval(tvShowSlideInterval)
      tvShowSlideInterval = setInterval(() => {
        tvShowCount++
        if (tvShowCount < tvShowSlideItems.length) {
          tvShowSlide.style.transform = `translate(-${tvShowCount * 33.3}%)`
        }
        else {
          tvShowCount = -1
        }
      }, 2500)
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(tvShowSlideInterval)
      tvShowSlideInterval = setInterval(() => {
        tvShowCount++
        if (tvShowCount < tvShowSlideItems.length) {
          tvShowSlide.style.transform = `translate(-${tvShowCount * 25}%)`
        }
        else {
          tvShowCount = -1
        }
      }, 2500)
    }
    else {
      clearInterval(tvShowSlideInterval)
      tvShowSlideInterval = setInterval(() => {
        tvShowCount++
        if (tvShowCount < tvShowSlideItems.length) {
          tvShowSlide.style.transform = `translate(-${tvShowCount * 20}%)`
        }
        else {
          tvShowCount = -1
        }
      }, 2500)
    }
  })
}

// let topMoviesSeeAll = document.querySelector(".top-movies header .see-all")

let topMoviessBox = document.querySelector("#top-ms")
let topMovieApi = "8ddf69fb1b85aeb2766892fdbfaa0abd"
let topMovieUrl = "https://api.themoviedb.org/3"
let totalTopMovies = 50
let selectedTopMovies = []


async function getAllTopMovies(){
  try{
    let page = 1
    
    while(selectedTopMovies.length < totalTopMovies){
    let res =await fetch(`${topMovieUrl}/discover/movie?api_key=${topMovieApi}&&primary_release_date.gte=2022-01-01&page=${page}`)
    let data = await res.json()
    let results = data.results || []
    if(results === 0){
      break;
    }
    
    selectedTopMovies.push(...results)
    page++
    }
    let imageBox = document.createElement("div")
    let image = document.createElement("div")
    let img = document.createElement("img")
    let num = document.createElement("div")
    let ratingBox = document.createElement("div")
    let movieName = document.createElement("div")
    let rating = document.createElement("div")

selectedTopMovies.sort((a, b) => b.vote_average - a.vote_average)

 selectedTopMovies.forEach((info,idx) =>{
   
    let imageBox = document.createElement("div")
    let image = document.createElement("div")
    let img = document.createElement("img")
    let num = document.createElement("div")
    let ratingBox = document.createElement("div")
    let movieName = document.createElement("div")
    let rating = document.createElement("div")
    
  topMoviessBox.append(imageBox)
   imageBox.append(image)
   image.append(img)
   image.append(num)
   imageBox.append(ratingBox)
   ratingBox.append(rating)
   ratingBox.append(movieName)
   
   
   image.classList.add("image")
   imageBox.classList.add("item")
   ratingBox.classList.add("top-rating-box")
   movieName.classList.add("movie-name")
   rating.classList.add("rating")
 num.classList.add("num")
 
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  rating.innerHTML = info.vote_average
 movieName.innerHTML = info.title
num.innerHTML = idx +1
 })
 
 let topMoviessBoxItem = document.querySelectorAll("#top-ms .item")
 topMoviessBoxItem.forEach((el,idx)=>{
  el.addEventListener("click", ()=>{
    getMovieInfo('movie',selectedTopMovies[idx].id)
  })
 })
  }
  catch(e){
    console.log(e)
  }
}

getAllTopMovies()



//Top Series 

// let topSeriesSeeAll = document.querySelector(".top-series header .see-all")

let topSeriessBox = document.querySelector("#top-sss")
let topSeriesApi = "8ddf69fb1b85aeb2766892fdbfaa0abd"
let topSeriesUrl = "https://api.themoviedb.org/3"
let totalTopSeries = 100
let selectedTopSeries = []


async function getAllTopSeries(){
  try{
    let page = 1
    
    while(selectedTopSeries.length < totalTopSeries){
  let res =await fetch(`${topSeriesUrl}/discover/tv?api_key=${topSeriesApi}&&primary_release_date.gte=2022-01-01&page=${page}`)
  let data = await res.json()
    let results = data.results || []
    if(results === 0){
      break;
    }
    
    selectedTopSeries.push(...results)
    page++
    }
    let imageBox = document.createElement("div")
    let image = document.createElement("div")
    let img = document.createElement("img")
    let num = document.createElement("div")
    let ratingBox = document.createElement("div")
    let movieName = document.createElement("div")
    let rating = document.createElement("div")

selectedTopSeries.sort((a, b) => b.vote_average - a.vote_average)

 selectedTopSeries.forEach((info,idx) =>{
   
   if(info.original_language === "en"){
    let imageBox = document.createElement("div")
    let image = document.createElement("div")
    let img = document.createElement("img")
    let num = document.createElement("div")
    let ratingBox = document.createElement("div")
    let movieName = document.createElement("div")
    let rating = document.createElement("div")
    
  topSeriessBox.append(imageBox)
   imageBox.append(image)
   image.append(img)
   image.append(num)
   imageBox.append(ratingBox)
   ratingBox.append(rating)
   ratingBox.append(movieName)
   
   
   image.classList.add("image")
   imageBox.classList.add("item")
   ratingBox.classList.add("top-rating-box")
   movieName.classList.add("movie-name")
   rating.classList.add("rating")
 num.classList.add("num")


  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  rating.innerHTML = info.vote_average
 movieName.innerHTML = info.name
 
    
}

 })
  
 let topSeriessBoxItem = document.querySelectorAll("#top-sss .item")
 
 topSeriessBoxItem.forEach((el,idx) =>{
   num.innerHTML = idx + 1
   el.addEventListener("click", ()=>{
    getMovieInfo('tv',selectedTopMovies[idx].id)
  })
 })
  }
  catch(e){
    console.log(e)
  }
}

getAllTopSeries()






/* MOVIE PAGE */

/* Creating Trending Movie for Featured in See all Box */

function seeAllMajorMovie(){
    // let container = document.querySelector(".container")
    // container.style.display = 'none'
  let seeAllSlide = document.querySelector(".see-all-page .main-featured .swiper-wrapper")
  
  let seeAllLeft = document.querySelector(".see-all-page .main-featured .fa-angle-left")
  let seeAllRight = document.querySelector(".see-all-page .main-featured .fa-angle-right")
  // let seeAll = document.querySelector(".see-all-page")
  // seeAll.style.display = 'block'
  
  let seeAllCount = 0
  let seeAllInterval;
  let seeAllTimeout;
  
  
  
  async function seeAllMovies(){
  let res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=2`)
    let data = await res.json()
    let results = data.results
    
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
  
  results.forEach((info,idx) => {
  let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
   image.append(tag)
   seeAllSlide.append(image)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
   tag.classList.add("tag")
   
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  tag.innerHTML = info.media_type
  
  if(info.original_title === undefined){
  movieName.innerHTML = info.name
  year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
  }
  else{
  movieName.innerHTML = info.title
  year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
  }
  
  
   })
  
  let seeAllSlideItems = document.querySelectorAll(".see-all-page .main-featured .image")
    
    
    
seeAllSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`
  el.addEventListener("click", ()=>{
    if (results[idx].media_type === 'tv') {
      getMovieInfo('tv',results[idx].id)
    }
      getMovieInfo('movie',results[idx].id)
      console.log('ffj');
  })

})
  
  
  
  
  
  
  
  automateSeeAllSlide(seeAllSlideItems)
  
  function manualSeeAllSlideRight(){
  seeAllCount++
  
  let windowW = window.innerWidth
  
  if (windowW > 0 && windowW < 600) {
      if(seeAllCount < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 100}%)`
      }
      else{
        seeAllCount = 0
      }
  }
  else if(windowW > 600 && windowW < 1100){
    clearInterval(seeAllInterval)
      if(seeAllCount < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 50}%)`
      }
      else{
        seeAllCount = 0
      }
  }
  else {
    clearInterval(seeAllInterval)
      if(seeAllCount < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 33.3}%)`
      }
      else{
        seeAllCount = 0
      }
  }
  }
  
  // manual slides with btns
  
  function manualSeeAllSlideLeft(){
    seeAllCount--
    let windowW = window.innerWidth
    
    if (windowW > 0 && windowW < 600) {
      if (seeAllCount >= 0) {
        seeAllSlide.style.transform = `translate(-${seeAllCount * 100}%)`
      }
      else {
        seeAllCount = 0
      }
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(seeAllInterval)
      if (seeAllCount >= 0) {
        seeAllSlide.style.transform = `translate(-${seeAllCount * 50}%)`
      }
      else {
        seeAllCount = 0
      }
    }
    else {
      clearInterval(seeAllInterval)
      if (seeAllCount >= 0) {
        seeAllSlide.style.transform = `translate(-${seeAllCount * 33.3}%)`
      }
      else {
        seeAllCount = 0
      }
    }
  
  }
  
  seeAllRight.addEventListener("click", ()=>{
    if(seeAllRight.classList.contains("fa-angle-right")){
      clearInterval(seeAllInterval)
      
    seeAllTimeout =  setTimeout(()=>{
        automateSlide(seeAllSlideItems)
      },500)
    }
  manualSeeAllSlideRight(seeAllSlideItems)
  })
  
  seeAllLeft.addEventListener("click",()=>{
    if(seeAllRight.classList.contains("fa-angle-left")){
      clearInterval(seeAllInterval)
      
   seeAllTimeout = setTimeout(()=>{
     clearTimeout(seeAllTimeout)
        automateSeeAllSlide(seeAllSlideItems)
      },500)
    }manualSeeAllSlideLeft(seeAllSlideItems)
  })
    
  }
  
  seeAllMovies()
  
  function automateSeeAllSlide(seeAllSlideItems) {
  
    seeAllSlideItems.forEach((el,idx) => {
  el.style.transform = `translate(${idx * 100}%)`
  })
  
  
  
  let windowW = window.innerWidth
  
  if (windowW > 0 && windowW < 600) {
    clearInterval(seeAllInterval)
   seeAllInterval = setInterval(() =>{
      seeAllCount++
      if(seeAllCount < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 100}%)`
      }
      else{
        seeAllCount = -1
      }
  },4000)
  }
  else if(windowW > 600 && windowW < 1100){
    clearInterval(seeAllInterval)
    seeAllInterval = setInterval(() =>{
      seeAllCount++
      if(count < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 50}%)`
      }
      else{
        seeAllCount = -1
      }
  },4000)
  }
  else {
    clearInterval(seeAllInterval)
    seeAllInterval = setInterval(() =>{
      seeAllCount++
      if(seeAllCount < seeAllSlideItems.length){
      seeAllSlide.style.transform = `translate(-${seeAllCount * 33.3}%)`
      }
      else{
        seeAllCount = -1
      }
  },4000)
  }
  window.addEventListener("resize", ()=>{
    clearInterval(seeAllInterval)
  
    let windowW = window.innerWidth
  
    if (windowW > 0 && windowW < 600) {
      seeAllInterval = setInterval(() =>{
         seeAllCount++
         if(seeAllCount < seeAllSlideItems.length){
         seeAllSlide.style.transform = `translate(-${seeAllCount * 100}%)`
         }
         else{
           seeAllCount = -1
         }
     },4000)
     }
     else if(windowW > 600 && windowW < 1000){
       clearInterval(seeAllInterval)
       seeAllInterval = setInterval(() =>{
         seeAllCount++
         if(seeAllCount < seeAllSlideItems.length){
         seeAllSlide.style.transform = `translate(-${seeAllCount * 50}%)`
         }
         else{
           seeAllCount = -1
         }
     },4000)
     }
     else {
       clearInterval(seeAllInterval)
       seeAllInterval = setInterval(() =>{
         seeAllCount++
         if(seeAllCount < seeAllSlideItems.length){
         seeAllSlide.style.transform = `translate(-${seeAllCount * 33.3}%)`
         }
         else{
          seeAllCount = -1
         }
     },4000)
     }
  })
  }
  
  
  
  
  
  
  //Creating an automated Slider for the sub featured
  
  let seeAllSubFeaturedSlide = document.querySelector(".see-all-page .sub-featured .contain")
  let seeAllSubFeaturedSlideItems = document.querySelectorAll(".see-all-page .sub-featured .contain .image")
  let seeAllSubFeaturedLeft = document.querySelector(".see-all-page .sub-featured .paginators .fa-step-backward")
  let seeAllSubFeaturedRight = document.querySelector(".see-all-page .sub-featured .paginators .fa-step-forward")
  
  let seeAllSubFeaturedCount = 0
  let seeAllSubFeaturedInterval;
  let seeAllSubFTimeout;
  
  //Without Touching the images 
  
  
  
  async function displaySeeAllFeaturedMovies(){
  
  let res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=2`)
  let data =  await res.json()
  let results = data.results
    
   let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
  
    
    
  results.forEach((info,idx) => {
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
   image.append(tag)
   seeAllSubFeaturedSlide.append(image)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
   tag.classList.add("tag")
   
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  tag.innerHTML = "Featured"
  if(info.original_title === undefined){
  movieName.innerHTML = info.name
  year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
  }
  else{
  movieName.innerHTML = info.title
  year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
  }
  
  
   })
   
   
   let seeAllSubFeaturedSlideItems = document.querySelectorAll(".sub-featured .contain .image")
  
   
   seeAllSubFeaturedSlideItems.forEach((el, idx) => {
    el.style.transform = `translate(${idx * 100}%)`
    el.addEventListener("click", ()=>{
      if (results[idx].media_type === 'tv') {
        getMovieInfo('tv',results[idx].id)
      }
        getMovieInfo('movie',results[idx].id)
  
    })
  
  })
   
   
   
   
   
   
   function manualSeeASubFSlideRight(subFeaturedSlideItems){
         seeAllSubFeaturedCount++
  let windowW = window.innerWidth
  
    if (windowW > 0 && windowW < 600) {
      
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
         seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 33.3}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
    else if (windowW > 600 && windowW < 1100) {
      
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 25}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
    else {
      
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 20}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
  
    }
    
    
   function manualSeeASubFSlideLeft(seeAllSubFeaturedSlideItems){
     seeAllSubFeaturedCount--
  
  let windowW = window.innerWidth
  
    if (windowW > 0 && windowW < 600) {
      
        if (seeAllSubFeaturedCount >= 0) {
         seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 33.3}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
    else if (windowW > 600 && windowW < 1100) {
        if (seeAllSubFeaturedCount >= 0) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 25}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
    else {
      
        if (seeAllSubFeaturedCount >= 0) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 20}%)`
        }
        else {
          seeAllSubFeaturedCount = 0
        }
    }
    
    }
    automateSeeAllSubFSlide(seeAllSubFeaturedSlideItems)
  seeAllSubFeaturedRight.addEventListener("click", ()=>{
     if(seeAllSubFeaturedRight.classList.contains("fa-step-forward")){
      clearInterval(seeAllSubFeaturedInterval)
      
     seeAllSubFTimeout =  setTimeout(()=>{
  clearTimeout(seeAllSubFTimeout)
        automateSeeAllSubFSlide(seeAllSubFeaturedSlideItems)
      },1000)
     }
    manualSeeASubFSlideRight(seeAllSubFeaturedSlideItems)
   },500)
   
    seeAllSubFeaturedLeft.addEventListener("click",()=>{
      if (seeAllSubFeaturedRight.classList.contains("fa-step-backward")) {
        clearInterval(seeAllSubFeaturedInterval)
      
        seeAllSubFTimeout = setTimeout(() => {
          clearTimeout(seeAllSubFTimeout)
          automateSubFSlide(seeAllSubFeaturedSlideItems)
        }, 10000)
      }
        manualSeeASubFSlideLeft(seeAllSubFeaturedSlideItems)
    },500)
    
  }
  
   
   displaySeeAllFeaturedMovies()
   
   
  function automateSeeAllSubFSlide(seeAllSubFeaturedSlideItems) {
   
    
    let windowW = window.innerWidth
  
    if (windowW > 0 && windowW < 600) {
      clearInterval(seeAllSubFeaturedInterval)
    seeAllSubFeaturedInterval = setInterval(() => {
        seeAllSubFeaturedCount++
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
         seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 33.3}%)`
        }
        else {
          seeAllSubFeaturedCount = -1
        }
        
      }, 3500)
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(seeAllubFeaturedInterval)
      seeAllSubFeaturedInterval = setInterval(() => {
        seeAllSubFeaturedCount++
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 25}%)`
        }
        else {
          seeAllSubFeaturedCount = -1
        }
      }, 3500)
    }
    else {
      clearInterval(seeAllSubFeaturedInterval)
      seeAllSubFeaturedInterval = setInterval(() => {
        seeAllSubFeaturedCount++
        if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
          seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 20}%)`
        }
        else {
          seeAllSubFeaturedCount = -1
        }
        
      }, 3500)
    }
  
    window.addEventListener("resize", () => {
    
      let windowW = window.innerWidth
  
      if (windowW > 0 && windowW < 600) {
        clearInterval(seeAllSubFeaturedInterval)
        seeAllSubFeaturedInterval = setInterval(() => {
          seeAllSubFeaturedCount++
          if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
           seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 33.3}%)`
          }
          else {
            seeAllSubFeaturedCount = -1
          }
        }, 3500)
      }
      else if (windowW > 600 && windowW < 1100) {
        clearInterval(seeAllSubFeaturedInterval)
        seeAllSubFeaturedInterval = setInterval(() => {
          seeAllSubFeaturedCount++
          if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
            seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 25}%)`
          }
          else {
            seeAllSubFeaturedCount = -1
          }
        }, 3500)
      }
      else {
        clearInterval(seeAllSubFeaturedInterval)
        seeAllSubFeaturedInterval = setInterval(() => {
          seeAllSubFeaturedCount++
          if (seeAllSubFeaturedCount < seeAllSubFeaturedSlideItems.length) {
            seeAllSubFeaturedSlide.style.transform = `translate(-${seeAllSubFeaturedCount * 20}%)`
          }
          else {
            seeAllSubFeaturedCount = -1
          }
        }, 3500)
      }
    })
    
  }
  
  let seeAllRecentlyItems = document.querySelector(".see-all-page .recently-added .contain")
    let seeAllRecentNo = document.querySelector(".see-all-page .recently-added header .total")
  //Without Touching the images 
  
  let recentMovies = []
  let recentMoviesTotal = 50
  
  async function displayRecentMovies(){
  
    try{
      let page = 2
  
  while(recentMovies.length < recentMoviesTotal){
  let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=${page}`)
  let data =  await res.json()
  let results = data.results
  
  if (results.length === 0) {
    break
  }
  
  recentMovies.push(...results)
  page++
  }
  
  
   let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
  
    
  
    
    
  recentMovies.forEach((info,idx) => {
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
  
    
   
   seeAllRecentlyItems.append(image)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
  
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  if(info.original_title === undefined){
  movieName.innerHTML = info.name
  year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
  }
  else{
  movieName.innerHTML = info.title
  year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
  }
   
  
   })
   let seeAllRecentlyItemsImage = document.querySelectorAll(".see-all-page .recently-added .contain .image")
   seeAllRecentlyItemsImage.forEach((el,idx)=>{
   el.addEventListener("click", ()=>{
      getMovieInfo('movie',recentMovies[idx].id)
  })
   })
  
  seeAllRecentNo.innerHTML = recentMovies.length
  
  }
  catch(e){
    console.log(e);
  }
   
   
  
  
  }
  
   
  
  displayRecentMovies()
  
  
  
  let seeAllRelated = document.querySelector(".see-all-page .related .contain")
  
  //Without Touching the images 
  
  let relatedMovies = []
  let relatedMoviesTotal = 50
  
  async function displayRelatedMovies(){
  
    try{
      let page = 10
  
  while(relatedMovies.length < relatedMoviesTotal){
  let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=${page}`)
  let data =  await res.json()
  let results = data.results
  
  if (results.length === 0) {
    break
  }
  
  relatedMovies.push(...results)
  page++
  }
  
  
   let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
  let tag = document.createElement("div")
    
  
    
    
  relatedMovies.forEach((info,idx) => {
    let image = document.createElement("div")
    let img = document.createElement("img")
    let item = document.createElement("div")
    let movieName = document.createElement("div")
    let year = document.createElement("div")
    let tag = document.createElement("div")
    
   
   seeAllRelated.append(image)
   image.append(img)
   image.append(item)
   item.append(movieName)
   item.append(year)
   image.append(tag)
   
   image.classList.add("image")
   item.classList.add("item")
   movieName.classList.add("movie-name")
   year.classList.add("year")
  tag.classList.add("tag")
  tag.innerHTML = "Movie"
  
  img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
  if(info.original_title === undefined){
  movieName.innerHTML = info.name
  year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
  }
  else{
  movieName.innerHTML = info.title
  year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
  }
  
  
   })
   let seeAllRelatedItemsImage = document.querySelectorAll(".see-all-page .related .contain .image")
 
   seeAllRelatedItemsImage.forEach((el,idx)=>{
    el.addEventListener("click", ()=>{
       getMovieInfo('movie',relatedMovies[idx].id)
   })
    })
  }
  catch(e){
    console.log(e);
  }
  }
   
   
  
  displayRelatedMovies()
  }
  //See all tv




let seeAllTvSlide = document.querySelector(".see-all-page-tv .main-featured .swiper-wrapper")

let seeAllTvLeft = document.querySelector(".see-all-page-tv .main-featured .fa-angle-left")
let seeAllTvRight = document.querySelector(".see-all-page-tv .main-featured .fa-angle-right")
let seeAllTv = document.querySelector(".see-all-tv")
let seeAllTvCount = 0
let seeAllTvInterval;
let seeAllTvTimeout;


function seeAllTvPage(){
async function seeAllTv(){
let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&first_air_date.gte=2023-01-01&page=1`)
  let data = await res.json()
  let results = data.results
  
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  

results.forEach((info,idx) => {
let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")
  
 image.append(tag)
 seeAllTvSlide.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)
 
 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
 tag.classList.add("tag")
 
img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

tag.innerHTML = 'tv'

if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })

let seeAllTvSlideItems = document.querySelectorAll(".see-all-page-tv .main-featured .image")
  
  
seeAllTvSlideItems.forEach((el,idx)=>{

  el.addEventListener("click", ()=>{
      getMovieInfo('tv',results[idx].id)
 
  })
})







automateSeeAllTvSlide(seeAllTvSlideItems)

function manualSeeAllTvSlideRight(){
seeAllTvCount++

let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 100}%)`
    }
    else{
      seeAllTvCount = 0
    }
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(seeAllITvnterval)
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 50}%)`
    }
    else{
      seeAllTvCount = 0
    }
}
else {
  clearInterval(seeAllTvInterval)
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 33.3}%)`
    }
    else{
      seeAllTvCount = 0
    }
}
}

// manual slides with btns

function manualSeeAllTvSlideLeft(){
  seeAllTvCount--
  let windowW = window.innerWidth
  
  if (windowW > 0 && windowW < 600) {
    if (seeAllTvCount >= 0) {
      seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 100}%)`
    }
    else {
      seeAllTvCount = 0
    }
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(seeAllTvInterval)
    if (seeAllTvCount >= 0) {
      seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 50}%)`
    }
    else {
      seeAllTvCount = 0
    }
  }
  else {
    clearInterval(seeAllTvInterval)
    if (seeAllTvCount >= 0) {
      seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 33.3}%)`
    }
    else {
      seeAllTvCount = 0
    }
  }

}

seeAllTvRight.addEventListener("click", ()=>{
  if(seeAllTvRight.classList.contains("fa-angle-right")){
    clearInterval(seeAllTvInterval)
    
  seeAllTvTimeout =  setTimeout(()=>{
      automateSeeAllTvSlide(seeAllTvSlideItems)
    },500)
  }
manualSeeAllTvSlideRight(seeAllTvSlideItems)
})

seeAllTvLeft.addEventListener("click",()=>{
  if(seeAllTvRight.classList.contains("fa-angle-left")){
    clearInterval(seeAllTvInterval)
    
 seeAllTvimeout = setTimeout(()=>{
   clearTimeout(seeAllTvTimeout)
      automateSeeAllTvSlide(seeAllTvSlideItems)
    },500)
  }manualSeeAllTvSlideLeft(seeAllTvSlideItems)
})
  
}

seeAllTv()

function automateSeeAllTvSlide(seeAllTvSlideItems) {

  seeAllTvSlideItems.forEach((el,idx) => {
el.style.transform = `translate(${idx * 100}%)`
})



let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  clearInterval(seeAllTvInterval)
 seeAllTvInterval = setInterval(() =>{
    seeAllTvCount++
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 100}%)`
    }
    else{
      seeAllTvCount = -1
    }
},4000)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(seeAllTvInterval)
  seeAllTvInterval = setInterval(() =>{
    seeAllTvCount++
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllSlide.style.transform = `translate(-${seeAllCount * 50}%)`
    }
    else{
      seeAllTvCount = -1
    }
},4000)
}
else {
  clearInterval(seeAllTvInterval)
  seeAllTvInterval = setInterval(() =>{
    seeAllTvCount++
    if(seeAllTvCount < seeAllTvSlideItems.length){
    seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 33.3}%)`
    }
    else{
      seeAllTvCount = -1
    }
},4000)
}
window.addEventListener("resize", ()=>{
  clearInterval(seeAllTvInterval)

  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    seeAllTvInterval = setInterval(() =>{
       seeAllTvCount++
       if(seeAllTvCount < seeAllTvSlideItems.length){
       seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 100}%)`
       }
       else{
         seeAllTvCount = -1
       }
   },4000)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(seeAllTvInterval)
     seeAllTvInterval = setInterval(() =>{
       seeAllTvCount++
       if(seeAllTvCount < seeAllTvSlideItems.length){
       seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 50}%)`
       }
       else{
         seeAllTvCount = -1
       }
   },4000)
   }
   else {
     clearInterval(seeAllTvInterval)
     seeAllTvInterval = setInterval(() =>{
       seeAllTvCount++
       if(seeAllTvCount < seeAllTvSlideItems.length){
       seeAllTvSlide.style.transform = `translate(-${seeAllTvCount * 33.3}%)`
       }
       else{
        seeAllTvCount = -1
       }
   },4000)
   }
})
}


//Creating an automated Slider for the sub featured

let seeAllTvSubFeaturedSlide = document.querySelector(".see-all-page-tv .sub-featured .contain")
let seeAllTvSubFeaturedSlideItems = document.querySelectorAll(".see-all-page-tv .sub-featured .contain .image")
let seeAllTvSubFeaturedLeft = document.querySelector(".see-all-page-tv .sub-featured .paginators .fa-step-backward")
let seeAllTvSubFeaturedRight = document.querySelector(".see-all-page-tv .sub-featured .paginators .fa-step-forward")

let seeAllTvSubFeaturedCount = 0
let seeAllTvSubFeaturedInterval;
let seeAllTvSubFTimeout;

//Without Touching the images 



async function displaySeeAllTvFeatured(){

let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&first_all_date.gte=2022-01-01&page=3`)
let data =  await res.json()
let results = data.results

 let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")




results.forEach((info,idx) => {
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")

 image.append(tag)
 seeAllTvSubFeaturedSlide.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)

 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
 tag.classList.add("tag")

img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

tag.innerHTML = "Featured"
if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })


 let seeAllTvSubFeaturedSlideItems = document.querySelectorAll(".see-all-page-tv .sub-featured .contain .image")


 seeAllTvSubFeaturedSlideItems.forEach((el, idx) => {
  el.style.transform = `translate(${idx * 100}%)`
  el.addEventListener("click", ()=>{
      getMovieInfo('tv',results[idx].id)
 
})
})






 function manualSeeATvSubFSlideRight(SeeAllTvSsubFeaturedSlideItems){
       seeAllTvSubFeaturedCount++
let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {

      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
       seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 33.3}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }
  else if (windowW > 600 && windowW < 1100) {

      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 25}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }
  else {

      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 20}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }

  }


 function manualSeeATvSubFSlideLeft(seeAllTvSubFeaturedSlideItems){
   seeAllTvSubFeaturedCount--

let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {

      if (seeAllTvSubFeaturedCount >= 0) {
       seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 33.3}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }
  else if (windowW > 600 && windowW < 1100) {
      if (seeAllTvSubFeaturedCount >= 0) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 25}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }
  else {

      if (seeAllTvSubFeaturedCount >= 0) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 20}%)`
      }
      else {
        seeAllTvSubFeaturedCount = 0
      }
  }

  }
  automateSeeAllTvSubFSlide(seeAllTvSubFeaturedSlideItems)
seeAllTvSubFeaturedRight.addEventListener("click", ()=>{
   if(seeAllTvSubFeaturedRight.classList.contains("fa-step-forward")){
    clearInterval(seeAllTvSubFeaturedInterval)

   seeAllTvSubFTimeout =  setTimeout(()=>{
clearTimeout(seeAllTvSubFTimeout)
      automateSeeAllTvSubFSlide(seeAllTvSubFeaturedSlideItems)
    },1000)
   }
  manualSeeATvSubFSlideRight(seeAllTvSubFeaturedSlideItems)
 },500)

  seeAllTvSubFeaturedLeft.addEventListener("click",()=>{
    if (seeAllTvSubFeaturedRight.classList.contains("fa-step-backward")) {
      clearInterval(seeAllTvSubFeaturedInterval)

      seeAllTvSubFTimeout = setTimeout(() => {
        clearTimeout(seeAllTvSubFTimeout)
        automateSeeAllTvSubFSlide(seeAllTvSubFeaturedSlideItems)
      }, 10000)
    }
      manualSeeATvSubFSlideLeft(seeAllTvSubFeaturedSlideItems)
  },500)

}


 displaySeeAllTvFeatured()


function automateSeeAllTvSubFSlide(seeAllSubFeaturedSlideItems) {


  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(seeAllTvSubFeaturedInterval)
  seeAllTvSubFeaturedInterval = setInterval(() => {
      seeAllTvSubFeaturedCount++
      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
       seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 33.3}%)`
      }
      else {
        seeAllTvSubFeaturedCount = -1
      }

    }, 3500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(seeAllTvSubFeaturedInterval)
    seeAllTvSubFeaturedInterval = setInterval(() => {
      seeAllTvSubFeaturedCount++
      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 25}%)`
      }
      else {
        seeAllTvSubFeaturedCount = -1
      }
    }, 3500)
  }
  else {
    clearInterval(seeAllTvSubFeaturedInterval)
    seeAllTvSubFeaturedInterval = setInterval(() => {
      seeAllTvSubFeaturedCount++
      if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
        seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 20}%)`
      }
      else {
        seeAllTvSubFeaturedCount = -1
      }

    }, 3500)
  }

  window.addEventListener("resize", () => {

    let windowW = window.innerWidth

    if (windowW > 0 && windowW < 600) {
      clearInterval(seeAllTvSubFeaturedInterval)
      seeAllTvSubFeaturedInterval = setInterval(() => {
        seeAllTvSubFeaturedCount++
        if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
         seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 33.3}%)`
        }
        else {
          seeAllTvSubFeaturedCount = -1
        }
      }, 3500)
    }
    else if (windowW > 600 && windowW < 1100) {
      clearInterval(seeAllTvSubFeaturedInterval)
      seeAllTvSubFeaturedInterval = setInterval(() => {
        seeAllTvSubFeaturedCount++
        if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
          seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 25}%)`
        }
        else {
          seeAllTvSubFeaturedCount = -1
        }
      }, 3500)
    }
    else {
      clearInterval(seeAllTvSubFeaturedInterval)
      seeAllTvSubFeaturedInterval = setInterval(() => {
        seeAllTvSubFeaturedCount++
        if (seeAllTvSubFeaturedCount < seeAllTvSubFeaturedSlideItems.length) {
          seeAllTvSubFeaturedSlide.style.transform = `translate(-${seeAllTvSubFeaturedCount * 20}%)`
        }
        else {
          seeAllTvSubFeaturedCount = -1
        }
      }, 3500)
    }
  })

}






let seeAllTvRecentlyItems = document.querySelector(".see-all-page-tv .recently-added .contain")
let seeAllTvRecentNo = document.querySelector(".see-all-page-tv .recently-added header .total")
//Without Touching the images 

let recentTv = []
let recentTvTotal = 50

async function displayRecentTv(){

  try{
    let page = 2

while(recentTv.length < recentTvTotal){
let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=${page}`)
let data =  await res.json()
let results = data.results

if (results.length === 0) {
  break
}

recentTv.push(...results)
page++
}


 let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")





recentTv.forEach((info,idx) => {
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")



 seeAllTvRecentlyItems.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)

 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")

img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })
 let seeAllTvSlideRItems = document.querySelectorAll(".see-all-page-tv .recently-added .contain .image")
  
  
 seeAllTvSlideRItems.forEach((el,idx)=>{
   el.addEventListener("click", ()=>{
       getMovieInfo('tv',recentTv[idx].id)
  
   })
 })
seeAllTvRecentNo.innerHTML = recentTv.length

}
catch(e){
  console.log(e);
}




}



displayRecentTv()



let seeAllTvRelated = document.querySelector(".see-all-page-tv .related .contain")

//Without Touching the images 

let relatedTv = []
let relatedTvTotal = 50

async function displayRelatedTv(){

  try{
    let page = 10

while(relatedTv.length < relatedTvTotal){
let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=${page}`)
let data =  await res.json()
let results = data.results

if (results.length === 0) {
  break
}

relatedTv.push(...results)
page++
}


 let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
let tag = document.createElement("div")




relatedTv.forEach((info,idx) => {
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let year = document.createElement("div")
  let tag = document.createElement("div")


 seeAllTvRelated.append(image)
 image.append(img)
 image.append(item)
 item.append(movieName)
 item.append(year)
 image.append(tag)

 image.classList.add("image")
 item.classList.add("item")
 movieName.classList.add("movie-name")
 year.classList.add("year")
tag.classList.add("tag")
tag.innerHTML = "Movie"

img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`

if(info.original_title === undefined){
movieName.innerHTML = info.name
year.innerHTML = String(info.first_air_date).split("").slice(0, 4).join("")
}
else{
movieName.innerHTML = info.title
year.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
}


 })
 let seeAllTvSlideRelItems = document.querySelectorAll(".see-all-page-tv .related .contain .image")
  
  
 seeAllTvSlideRelItems.forEach((el,idx)=>{
   el.addEventListener("click", ()=>{
       getMovieInfo('tv',relatedTv[idx].id)
  
   })
 })
 
}
catch(e){
  console.log(e);
}




}



displayRelatedTv()


}


// let topSeeMoviesSeeAll = document.querySelector(".see-all-top-movies .top-movies header .see-all")

// let topSeeMoviesBox = document.querySelector(".see-all-top-movies .top-movies .swiper-wrapper")
// let topSeeMovieApi = "8ddf69fb1b85aeb2766892fdbfaa0abd"
// let topSeeMovieUrl = "https://api.themoviedb.org/3"
// let totalSeeTopMovies = 50
// let selectedSeeTopMovies = []
// let seeMovieNo = document.querySelector(".see-all-top-movies header .no")

// async function getSeeAllTopMovies(){
//   try{
//     let page = 1
    
//     while(selectedSeeTopMovies.length < totalSeeTopMovies){
//     let res =await fetch(`${topSeeMovieUrl}/discover/movie?api_key=${topSeeMovieApi}&&primary_release_date.gte=2022-01-01&page=${page}`)
//     let data = await res.json()
//     let results = data.results || []
//     if(results === 0){
//       break;
//     }
    
//     selectedSeeTopMovies.push(...results)
//     page++
//     }
//     let imageBox = document.createElement("div")
//     let image = document.createElement("div")
//     let img = document.createElement("img")
//     let num = document.createElement("div")
//     let ratingBox = document.createElement("div")
//     let movieName = document.createElement("div")
//     let rating = document.createElement("div")

// selectedSeeTopMovies.sort((a, b) => b.vote_average - a.vote_average)

//  selectedSeeTopMovies.forEach((info,idx) =>{
   
//     let imageBox = document.createElement("div")
//     let image = document.createElement("div")
//     let img = document.createElement("img")
//     let num = document.createElement("div")
//     let ratingBox = document.createElement("div")
//     let movieName = document.createElement("div")
//     let rating = document.createElement("div")
    
//   topSeeMoviesBox.append(imageBox)
//    imageBox.append(image)
//    image.append(img)
//    image.append(num)
//    imageBox.append(ratingBox)
//    ratingBox.append(rating)
//    ratingBox.append(movieName)
   
   
//    image.classList.add("image")
//    imageBox.classList.add("item")
//    ratingBox.classList.add("top-rating-box")
//    movieName.classList.add("movie-name")
//    rating.classList.add("rating")
//  num.classList.add("num")
 
//   img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
//   rating.innerHTML = info.vote_average
//  movieName.innerHTML = info.title
// num.innerHTML = idx +1
//  })
 
//  let topMoviesSeeBoxItem = document.querySelectorAll(".top-movies .swiper-wrapper .item")
 
//  topMoviesSeeBoxItem.forEach((el,idx)=>{
//   el.addEventListener("click", ()=>{
//     getMovieInfo('movie',selectedSeeTopMovies[idx].id)
 
  
//   })
//  })
//  seeMovieNo.innerHTML = selectedSeeTopMovies.length
//   }
//   catch(e){
//     console.log(e)
//   }
// }

// getSeeAllTopMovies()



// let topSeeSeriesSeeAll = document.querySelector("see-all-top-tv .top-series header .see-all")

// let topSeeSeriesBox = document.querySelector(".see-all-top-tv .top-series .swiper-wrapper")
// let topSeeSeriesApi = "8ddf69fb1b85aeb2766892fdbfaa0abd"
// let topSeeSeriesUrl = "https://api.themoviedb.org/3"
// let totalSeeTopSeries = 100
// let selectedSeeTopSeries = []
// let seeTvNo = document.querySelector(".see-all-top-tv header .no")
// async function getAllSeeTopSeries(){
//   try{
//     let page = 1
    
//     while(selectedSeeTopSeries.length < totalSeeTopSeries){
//   let res =await fetch(`${topSeeSeriesUrl}/discover/tv?api_key=${topSeeSeriesApi}&&primary_release_date.gte=2022-01-01&page=${page}`)
//     let data = await res.json()
//     let results = data.results || []
//     if(results === 0){
//       break;
//     }
    
//     selectedSeeTopSeries.push(...results)
//     page++
//     }
//     let imageBox = document.createElement("div")
//     let image = document.createElement("div")
//     let img = document.createElement("img")
//     let num = document.createElement("div")
//     let ratingBox = document.createElement("div")
//     let movieName = document.createElement("div")
//     let rating = document.createElement("div")

// selectedSeeTopSeries.sort((a, b) => b.vote_average - a.vote_average)

//  selectedSeeTopSeries.forEach((info,idx) =>{
   
//    if(info.original_language === "en"){
//     let imageBox = document.createElement("div")
//     let image = document.createElement("div")
//     let img = document.createElement("img")
//     let num = document.createElement("div")
//     let ratingBox = document.createElement("div")
//     let movieName = document.createElement("div")
//     let rating = document.createElement("div")
    
//   topSeeSeriesBox.append(imageBox)
//    imageBox.append(image)
//    image.append(img)
//    image.append(num)
//    imageBox.append(ratingBox)
//    ratingBox.append(rating)
//    ratingBox.append(movieName)
   
   
//    image.classList.add("image")
//    imageBox.classList.add("item")
//    ratingBox.classList.add("top-rating-box")
//    movieName.classList.add("movie-name")
//    rating.classList.add("rating")
//  num.classList.add("num")


//   img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`
  
//   rating.innerHTML = info.vote_average
//  movieName.innerHTML = info.name
 
 
//  let topSeriesSeeBoxItem = document.querySelectorAll(".top-series .swiper-wrapper .item")
 
//  topSeriesSeeBoxItem.forEach((el,idx) =>{
//    num.innerHTML = idx + 1
//    el.addEventListener("click", ()=>{
//     getMovieInfo('tv',selectedSeeTopSeries[idx].id)
//    })
//  })
    
// }

//  })
//  seeTvNo.innerHTML = selectedSeeTopSeries.length
//   }
//   catch(e){
//     console.log(e)
//  }
 //}

// getAllSeeTopSeries()

//get movie info

async function getMovieInfo(m,id){
  try{
    let movieImg = document.querySelector(".movie-page .d-box .image img")
let movieTitle = document.querySelector(".movie-page .d-box .text .movie-name")
let synoSum = document.querySelector(".movie-page .d-box .text .syno-summ")
let movieDate = document.querySelector(".movie-page .d-box .text .d-c .date")
let movieCountry = document.querySelector(".movie-page .d-box .d-c .country")
let runTime = document.querySelector(".runtime")
let backdropImg = document.querySelector(".movie-page  .backdrop img")
let mName = document.querySelector(".movie-page  .movie-info .name-text .movie-title")
let imdb = document.querySelector(".movie-page  .imdb .star .rating-no")
let tmdb = document.querySelector(".movie-page .tmdb .star .rating-no")
let synopsis = document.querySelector("#synopsi")
let genre = document.querySelector(".genre")
let experiContain = document.querySelector('.experience-mr .contain')
let container = document.querySelector(".container")
let moviePage = document.querySelector(".movie-page")
let seeMoviePage = document.querySelector(".see-all-top-movies")
let seeTvPage = document.querySelector(".see-all-top-tv")
  let seeAll = document.querySelector(".see-all-page")
  let seeAllTv = document.querySelector(".see-all-page-tv")
seeMoviePage.style.display = 'none'
seeAll.style.display = 'none'
container.style.display = 'none'
seeTvPage.style.display = 'none'
seeAllTv.style.display = 'none'


let windoww = window.innerWidth

if (windoww > 0  && windoww < 600) {
  moviePage.style.display = 'block'
}
else if (windoww > 600) {
  
  moviePage.style.display = 'flex'

}


window.addEventListener("resize", ()=>{
  let windoww = window.innerWidth

  if (windoww > 0  && windoww < 600) {
    moviePage.style.display = 'block'
    seeTvPage.style.display = 'none'
    
    container.style.display = 'none'
  }
  else if (windoww > 600) {
    
    moviePage.style.display = 'flex'
  }
  
  
})

let experiMovies = []
let experiMoviesTotal = 50
    const getMovie = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGRmNjlmYjFiODVhZWIyNzY2ODkyZmRiZmFhMGFiZCIsInN1YiI6IjY0YzQwMjQ5NjZhMGQzMDEzYjNjYTU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qljTgqJazh41n86BOHAdG602Ek6FmeulrW_rTqeHqv4'
      }
    };

let res = await fetch(`https://api.themoviedb.org/3/${m}/${id}?language=en-US`, getMovie)
let data = await res.json()
if (m === 'tv') {
  /*
movieImg.src =`https://image.tmdb.org/t/p/original${data.poster_path}`
movieTitle.innerHTML = data.name
movieDate.innerHTML = new Date(data.release_date).toDateString()
if (data.production_countries[0]) {
  movieCountry.innerHTML = data.production_countries[0].iso_3166_1
}
else{
  
  movieCountry.innerHTML = data.production_countries[0].iso_3166_1
}*/
}
else{
movieImg.src =`https://image.tmdb.org/t/p/original${data.poster_path}`
movieTitle.innerHTML = data.title
synoSum.innerHTML = data.overview.split("").filter((el,i)=> i < 15).join("")+"..."
movieDate.innerHTML = new Date(data.release_date).toDateString()
if (data.production_countries[0]) {
  movieCountry.innerHTML = data.production_countries[0].iso_3166_1
}

runTime.innerHTML = data.runtime  + "m"
synopsis.innerHTML = data.overview

data.genres.forEach(el =>{
let genres = document.createElement("div")
genre.append(genres)

genres.innerHTML = el.name
})

backdropImg.src = `https://image.tmdb.org/t/p/w300${data.backdrop_path}`
mName.innerHTML = data.title
imdb.innerHTML = data.vote_average
tmdb.innerHTML = data.vote_average
}
async function experi() {
  try{
    let page = 5

while(experiMovies.length < experiMoviesTotal){
let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8ddf69fb1b85aeb2766892fdbfaa0abd&page=${page}`)
let data =  await res.json()
let results = data.results

if (results.length === 0) {
  break
}

experiMovies.push(...results)
page++
}


let box = document.createElement("div")
let image = document.createElement("div")
let img = document.createElement("img")
let item = document.createElement("div")
let movieName = document.createElement("div")
let rBox = document.createElement("div")
let star = document.createElement("div")
let b = document.createElement("div")
let i = document.createElement("i")
let num = document.createElement("div")
let c = document.createElement("div")

  
  
experiMovies.forEach((info,idx) => {
  let box = document.createElement("div")
  let image = document.createElement("div")
  let img = document.createElement("img")
  let item = document.createElement("div")
  let movieName = document.createElement("div")
  let rBox = document.createElement("div")
  let star = document.createElement("div")
  let b = document.createElement("div")
  let i = document.createElement("i")
  let num = document.createElement("div")
  let c = document.createElement("div")

 experiContain.append(box)
 box.append(image)
 image.append(img)
 box.append(item)
 item.append(movieName)
 item.append(rBox)
 rBox.append(star)
 star.append(b)
 b.append(i)
 b.append(num)
star.append(c)

 
 box.classList.add("item")
 image.classList.add("image")
 item.classList.add("text")
 star.classList.add("star")
 b.classList.add("b")
 i.setAttribute("class", "fa fa-star")
 movieName.classList.add("movie-name")
 num.classList.add("rating-no")
 c.classList.add("c")

let itemMovie = document.querySelectorAll("#experi-contain")

itemMovie.forEach((el,idx) =>{
// el.addEventListener('click', ()=>{
// getMovieInfo(experiMovies[idx].id)
// })
})
img.src = `https://image.tmdb.org/t/p/w300${info.poster_path}`


movieName.innerHTML = info.title
c.innerHTML = String(info.release_date).split("").slice(0, 4).join("")
num.innerHTML = info.vote_average
})
  }

catch(e){
  console.log(e);
}
}
experi()
  }
  catch(e){
    console.log(e);
  }
}

let goBackBtn = document.querySelector(".movie-page .group1 .fa-angle-left")
function goBack() {
  let moviePage = document.querySelector(".movie-page")
  let container = document.querySelector(".container")
  moviePage.style.display = 'none'
  container.style.display = 'block'
  
/* For Featured Slide */
  let featuredSlideItems = document.querySelectorAll(".main-featured .image")

let windowW = window.innerWidth

if (windowW > 0 && windowW < 600) {
  clearInterval(interval)
 interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 100}%)`
    }
    else{
      count = -1
    }
},4000)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(interval)
  interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 50}%)`
    }
    else{
      count = -1
    }
},4000)
}
else {
  clearInterval(interval)
  interval = setInterval(() =>{
    count++
    if(count < featuredSlideItems.length){
    featuredSlide.style.transform = `translate(-${count * 33.3}%)`
    }
    else{
      count = -1
    }
},4000)
}
window.addEventListener("resize", ()=>{
  clearInterval(interval)
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 100}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(interval)
     interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 50}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
   else {
     clearInterval(interval)
     interval = setInterval(() =>{
       count++
       if(count < featuredSlideItems.length){
       featuredSlide.style.transform = `translate(-${count * 33.3}%)`
       }
       else{
         count = -1
       }
   },4000)
   }
})

// Sub featured Slide 

let subFeaturedSlideItems = document.querySelectorAll(".sub-featured .contain .image")


if (windowW > 0 && windowW < 600) {
  clearInterval(subFeaturedInterval)
subFeaturedInterval = setInterval(() => {
    subFeaturedCount++
    if (subFeaturedCount < subFeaturedSlideItems.length) {
     subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
    }
    else {
      subFeaturedCount = -1
    }
    
  }, 3500)
}
else if (windowW > 600 && windowW < 1100) {
  clearInterval(subFeaturedInterval)
  subFeaturedInterval = setInterval(() => {
    subFeaturedCount++
    if (subFeaturedCount < subFeaturedSlideItems.length) {
      subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
    }
    else {
      subFeaturedCount = -1
    }
  }, 3500)
}
else {
  clearInterval(subFeaturedInterval)
  subFeaturedInterval = setInterval(() => {
    subFeaturedCount++
    if (subFeaturedCount < subFeaturedSlideItems.length) {
      subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
    }
    else {
      subFeaturedCount = -1
    }
    
  }, 3500)
}

window.addEventListener("resize", () => {

  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(subFeaturedInterval)
    subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
       subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 33.3}%)`
      }
      else {
        subFeaturedCount = -1
      }
    }, 3500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(subFeaturedInterval)
    subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 25}%)`
      }
      else {
        subFeaturedCount = -1
      }
    }, 3500)
  }
  else {
    clearInterval(subFeaturedInterval)
    subFeaturedInterval = setInterval(() => {
      subFeaturedCount++
      if (subFeaturedCount < subFeaturedSlideItems.length) {
        subFeaturedSlide.style.transform = `translate(-${subFeaturedCount * 20}%)`
      }
      else {
        subFeaturedCount = -1
      }
    }, 3500)
  }
})

// Second Featured 


let secondFeaturedSlideItems = document.querySelectorAll("#second-featured .swiper-wrapper .image")
 
if (windowW > 0 && windowW < 600) {
  clearInterval(secondFeaturedInterval)
 secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
else if(windowW > 600 && windowW < 1100){
  clearInterval(secondFeaturedInterval)
  secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
else {
  clearInterval(secondFeaturedInterval)
  secondFeaturedInterval = setInterval(() =>{
    secondFeaturedCount++
    if(secondFeaturedCount < secondFeaturedSlideItems.length){
    secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
    }
    else{
      secondFeaturedCount = -1
    }
},3500)
}
window.addEventListener("resize", ()=>{
  clearInterval(secondFeaturedInterval)
  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
     clearInterval(secondFeaturedInterval)
    secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 100}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
   else if(windowW > 600 && windowW < 1000){
     clearInterval(secondFeaturedInterval)
     secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 50}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
   else {
     clearInterval(secondFeaturedInterval)
     secondFeaturedInterval = setInterval(() =>{
       secondFeaturedCount++
       if(secondFeaturedCount < secondFeaturedSlideItems.length){
       secondFeaturedSlide.style.transform = `translate(-${secondFeaturedCount * 33.3}%)`
       }
       else{
         secondFeaturedCount = -1
       }
   },3500)
   }
})

// Movie Slide
let movieSlideItems = document.querySelectorAll(".movie-slide .contain .image")
  

if (windowW > 0 && windowW < 600) {
  clearInterval(movieSlideInterval)
movieSlideInterval = setInterval(() => {
    movieCount++
    if (movieCount < movieSlideItems.length) {
     movieSlide.style.transform = `translate(-${movieCount * 33.3}%)`
    }
    else {
      movieCount = -1
    }
    
  }, 2500)
}
else if (windowW > 600 && windowW < 1100) {
  clearInterval(movieSlideInterval)
  movieSlideInterval = setInterval(() => {
    movieCount++
    if (movieCount < movieSlideItems.length) {
      movieSlide.style.transform = `translate(-${movieCount * 25}%)`
    }
    else {
      movieCount = -1
    }
  }, 2500)
}
else {
  clearInterval(movieSlideInterval)
  movieSlideInterval = setInterval(() => {
    movieCount++
    if (movieCount < movieSlideItems.length) {
      movieSlide.style.transform = `translate(-${movieCount * 20}%)`
    }
    else {
      movieCount = -1
    }
    
  }, 2500)
}

window.addEventListener("resize", () => {

  let windowW = window.innerWidth

  if (windowW > 0 && windowW < 600) {
    clearInterval(movieSlideInterval)
    movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
       movieSlide.style.transform = `translate(-${movieCount * 33.3}%)`
      }
      else {
        movieCount = -1
      }
    }, 2500)
  }
  else if (windowW > 600 && windowW < 1100) {
    clearInterval(movieSlideInterval)
    movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
        movieSlide.style.transform = `translate(-${movieCount * 25}%)`
      }
      else {
        movieCount = -1
      }
    }, 2500)
  }
  else {
    clearInterval(movieSlideInterval)
    movieSlideInterval = setInterval(() => {
      movieCount++
      if (movieCount < movieSlideItems.length) {
        movieSlide.style.transform = `translate(-${movieCount * 20}%)`
      }
      else {
        movieCount = -1
      }
    }, 2500)
  }
})

}

goBackBtn.addEventListener("click", goBack)

//Display the see all page
let seeAllBtn = document.querySelector("#movie-see-all")

function displaySeeAllMoviePage() {
  let seeMoviePage = document.querySelector(".see-all-page")
  let container = document.querySelector(".container")

  container.style.display = 'none'
  let windoww = window.innerWidth
if (windoww > 0  && windoww < 600) {
  seeMoviePage.style.display = 'block'
}
else if (windoww > 600) {
  
  seeMoviePage.style.display = 'flex'

}


window.addEventListener("resize", ()=>{
  let windoww = window.innerWidth

  if (windoww > 0  && windoww < 600) {
    
    seeMoviePage.style.display = 'flex'
    
  }
  else if (windoww > 600) {
    
    seeMoviePage.style.display = 'flex'
  }
  
  
})
  seeAllMajorMovie()
}

seeAllBtn.addEventListener("click", displaySeeAllMoviePage)

let backArrowSeeAll = document.querySelector(".see-all-page .group1 .fa-arrow-left")

function seeAllBack() {
  let seeMoviePage = document.querySelector(".see-all-page")
  let container = document.querySelector(".container")
  seeMoviePage.style.display = 'none'
  container.style.display = 'block'
}

backArrowSeeAll.addEventListener("click", seeAllBack)

let backArrowSeeAllTv = document.querySelector(".see-all-page-tv .group1 .fa-arrow-left")

//See all TV

function seeAllTvBack() {
  let seeMoviePage = document.querySelector(".see-all-page-tv")
  let container = document.querySelector(".container")
  seeMoviePage.style.display = 'none'
  container.style.display = 'block'
}

backArrowSeeAllTv.addEventListener("click", seeAllTvBack)

//see all tv page

//Display the see all page
let seeAllTvBtn = document.querySelector("#tv-see-all")

function displaySeeAllTvPage() {
  let seeMoviePage = document.querySelector(".see-all-page-tv")
  let container = document.querySelector(".container")
  container.style.display = 'none'

  let windoww = window.innerWidth
  if (windoww > 0  && windoww < 600) {
    seeMoviePage.style.display = 'block'
  }
  else if (windoww > 600) {
    
    seeMoviePage.style.display = 'flex'
  
  }
  
  
  window.addEventListener("resize", ()=>{
    let windoww = window.innerWidth
  
    if (windoww > 0  && windoww < 600) {
      
      seeMoviePage.style.display = 'block'
      
    }
    else if (windoww > 600) {
      
      seeMoviePage.style.display = 'flex'
    }
    
    
  })
  seeAllTvPage()
}

seeAllTvBtn.addEventListener("click", displaySeeAllTvPage)

function displaySeeAllTopMoviePage() {
  let seeAllMoviePage = document.querySelector(".see-all-top-movies")
  let container = document.querySelector(".container")
  seeAllMoviePage.style.display = 'block'
  container.style.display = 'none'
 getSeeAllTopMovies()
}

let seeAllTopMoviesBtn = document.querySelector(".top-movies header .see-all")

seeAllTopMoviesBtn.addEventListener("click", displaySeeAllTopMoviePage)

function displaySeeAllTopTvPage() {
  let seeMoviePage = document.querySelector(".see-all-top-tv")
  let container = document.querySelector(".container")

  seeMoviePage.style.display = 'block'
  container.style.display = 'none'
  
getAllSeeTopSeries()
}

let seeAllTopTvBtn = document.querySelector(".top-series header .see-all")

seeAllTopTvBtn.addEventListener("click", displaySeeAllTopTvPage)