function openTopic(evt, topicName, firstSubTopicName,firstSubTopicSection) {
  // console.log(firstSubTopicSection)
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  firstSTN = document.getElementById(firstSubTopicName);

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(topicName).style.display = "grid";
  document.getElementById(firstSubTopicSection).style.display = "grid";
  firstSTN.className += " active"
  evt.currentTarget.className += " active";
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('overlay').style.zIndex = '999';
}

function closeTopic() {
  var tabcontentSection = document.getElementsByClassName('mainContent');
  var subtabcontentbtn = document.getElementsByClassName('subTabLinks');
  var subtabcontentSection = document.getElementsByClassName('subtabcontent');
  tablinks = document.getElementsByClassName("tablinks");
  for(let i=0;i<tabcontentSection.length;i++){
    // console.log(i)
    tabcontentSection[i].style.display = 'none';
  }
  for(let i=0;i<subtabcontentSection.length;i++){
    // console.log(i)
    subtabcontentSection[i].style.display = 'none';
  }
  for(let i=0;i<subtabcontentbtn.length;i++){
    // console.log(i)
    subtabcontentbtn[i].className = subtabcontentbtn[i].className.replace(" active", "");
  }
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  document.getElementById('overlay').style.zIndex = '0';
  document.getElementById('overlay').style.display = 'none';
}

function openSubTopic(evt, subTopicName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("subtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("subTabLinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(subTopicName).style.display = "grid";
  evt.currentTarget.className += " active";
  document.getElementById('overlay').style.display = 'block';
}

var heartClicked = false;

function fillHeart() {
  var redHeart = document.getElementById('heart');
  if (heartClicked == false) {
    redHeart.classList.remove('fa-regular');
    redHeart.classList.add('fa-solid');
    redHeart.style.color = "red";
    redHeart.style.opacity = 1;
    const title = document.title; // Assuming the page title contains the desired title
    const description = "Your description goes here"; // Replace with your actual description

    // Create an object to hold the data
    const data = {
      title: title,
      description: description,
      // Add other relevant properties as needed
    };

    // Store the data in local storage
    localStorage.setItem('favoriteData', JSON.stringify(data));


    redHeart.style.textShadow = "-1px 0 #fffbfb, 0 1px #fff, 1px 0 #fff, 0 -1px #fff";
    heartClicked = true;
  } else {
    redHeart.classList.remove('fa-solid');
    redHeart.classList.add('fa-regular');
    redHeart.style.color = "";
    heartClicked = false;
    localStorage.removeItem('favoriteData');
  }
}




function showGallery() {
  var gallery = document.getElementById('photoGallery');
  var lightbox = document.getElementById('myModal');
  lightbox.style.display = 'none';
  gallery.style.display = 'block';
  var mainContainer = document.getElementById('mainC');
  mainContainer.style.display = 'none';
  var imgList = document.querySelectorAll('.gallery img').length;
  document.getElementById('counts').innerText = '(' + imgList + ')';
}


function closeGallery() {
  var gallery = document.getElementById('photoGallery');
  gallery.style.display = 'none';
  var mainContainer = document.getElementById('mainC');
  mainContainer.style.display = 'block';
}


// REVIEW CODE

// Get all the review star elements
const reviewStars = document.querySelectorAll('.review-types .rtype-stars');

// Initialize an array to store the selected star indices for each review
const selectedStars = Array.from(reviewStars).map(() => -1);

// Add click event listeners to each review star element
reviewStars.forEach((stars, index) => {
  stars.addEventListener('click', (event) => {
    const selectedStar = event.target;
    const selectedStarIndex = Array.from(stars.children).indexOf(selectedStar);

    // Update the stars color for the selected star and previous stars
    for (let i = 0; i <= selectedStarIndex; i++) {
      stars.children[i].style.color = '#02a5e8';
    }

    // Update the stars color for the remaining stars
    for (let i = selectedStarIndex + 1; i < stars.children.length; i++) {
      stars.children[i].style.color = '#abaeb1';
    }

    // Store the selected star index for the current review
    selectedStars[index] = selectedStarIndex;

    // Check if all the reviews have been rated
    const allReviewsRated = selectedStars.every((starIndex) => starIndex !== -1);

    // Calculate the average rating if all reviews have been rated
    if (allReviewsRated) {
      // Calculate the average rating
      const average = calculateAverageRating();

      // Update the main average star element
      updateMainAverageStar(average);
    }
  });
});

// Function to calculate the average rating
function calculateAverageRating() {
  let totalRating = 0;

  // Iterate over each review star element
  reviewStars.forEach((stars, index) => {
    const selectedStarIndex = selectedStars[index];

    // Add the selected star index to the total rating
    totalRating += selectedStarIndex + 1;
  });

  // Calculate the average rating
  const average = Math.round(totalRating / reviewStars.length);

  return average;
}

// Function to update the main average star element
function updateMainAverageStar(average) {
  const mainAverageStar = document.getElementById('mainAverageStar');

  // Reset the main average star color
  mainAverageStar.querySelectorAll('i').forEach((star) => {
    star.style.color = '#abaeb1';
  });

  // Update the color for the selected average stars
  for (let i = 0; i < average; i++) {
    mainAverageStar.children[i].style.color = '#02a5e8';
  }


}

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "flex";
  var mainContainer = document.getElementById('mainC');
    mainContainer.style.display = 'none';
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  var mainContainer = document.getElementById('mainC');
  mainContainer.style.display = 'block';
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  // var dots = document.getElementsByClassName("demo");
  // var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex-1].style.display = "block";
  // dots[slideIndex-1].className += " active";
  // captionText.innerHTML = dots[slideIndex-1].alt;
}


const navExpand = [].slice.call(document.querySelectorAll('.nav-expand'));
const backLink = `
<li class="nav-item">
	<a class="nav-link nav-back-link" href="javascript:;">
		Back
	</a>
</li>`;
navExpand.forEach(item => {
  item.querySelector('.nav-expand-content').insertAdjacentHTML('afterbegin', backLink);
  item.querySelector('.nav-link').addEventListener('click', () => item.classList.add('active'));
  item.querySelector('.nav-back-link').addEventListener('click', () => item.classList.remove('active'));
});

// ---------------------------------------
// not-so-important stuff starts here

const ham1 = document.getElementById('ham1');
const close1 = document.getElementById('close1');
const close2 = document.getElementById('close2');
const close3 = document.getElementById('close3');
var navDrill = document.getElementById('nav-drill');
ham1.addEventListener('click', function () {
  navDrill.style.display = 'flex';
  document.body.classList.toggle('nav-is-toggled');
});
close1.addEventListener('click', function () {
  navDrill.style.display = 'flex';
  document.body.classList.toggle('nav-is-toggled');
});
close2.addEventListener('click', function () {
  navDrill.style.display = 'flex';
  document.body.classList.toggle('nav-is-toggled');
});
close3.addEventListener('click', function () {
  navDrill.style.display = 'flex';
  document.body.classList.toggle('nav-is-toggled');
});

