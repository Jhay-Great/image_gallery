'use script'
// all variable declarations
const galleryContainer = document.querySelector('.image_gallery');
const mainContainer = document.querySelector('main');
const lightboxContainer = document.querySelector('.lightbox_container');
const captionContainer = document.querySelector('.image_container > div');
const editCaptionContainer = document.querySelector('.edit_caption')

// buttons
const editBtn = document.querySelector('.edit-btn');
const okayBtn = document.querySelector('.ok');
const cancelBtn = document.querySelector('.cancel');


// image data
const imageDB = [
    {id: 0, imageURL : 'female_designer.jpg', thumbnailURL : 'mimi_female_designer.jpg', caption: 'Cute girl in front of her computer'},
    {id: 1, imageURL : 'smoky.jpg', thumbnailURL : 'mimi_smoky.jpg', caption: 'beautiful smoky background'},
    {id: 2, imageURL : 'mid-day_highway.jpg', thumbnailURL : 'mimi_mid-day_highway.jpg', caption: 'Highway background image'},
    {id: 3, imageURL : 'awesome_painting.jpg', thumbnailURL : 'mimi_awesome_painting.jpg', caption: 'artistic oil painting'},
    {id: 4, imageURL : 'water-droplets.jpg', thumbnailURL : 'mimi_water-droplets.jpg', caption: 'Water droplet image'},
    {id: 5, imageURL : 'stars.jpg', thumbnailURL : 'mimi_stars.jpg', caption: 'stars above the sky'},
    {id: 6, imageURL : 'cube.jpg', thumbnailURL : 'mimi_cube.jpg', caption: 'transparent cube'},
    {id: 7, imageURL : 'male_programmer.jpg', thumbnailURL : 'mimi_male_programmer.jpg', caption: 'male programer'},
    {id: 8, imageURL : 'bike.jpg', thumbnailURL : 'mimi_bike.jpg', caption: 'steel bike'},
    {id: 9, imageURL : 'falls.jpg', thumbnailURL : 'mimi_falls.jpg', caption: 'water fall'},
    {id: 10, imageURL : 'hill.jpg', thumbnailURL : 'mimi_hill.jpg', caption: 'Amazing pictograph of a hill'},
    {id: 11, imageURL : 'stuff.jpg', thumbnailURL : 'mimi_stuff.jpg', caption: 'collection of items'},
    {id: 12, imageURL : 'party.jpg', thumbnailURL : 'mimi_party.jpg', caption: 'Night life'},
    {id: 13, imageURL : 'forest.jpg', thumbnailURL : 'mimi_forest.jpg', caption: 'Amazon forest'},
    {id: 14, imageURL : 'cup.jpg', thumbnailURL : 'mimi_cup.jpg', caption: 'a cup of water'},
    {id: 15, imageURL : 'red_cube.jpg', thumbnailURL : 'mimi_red_cude.jpg', caption: 'hot red cube'},
    {id: 16, imageURL : 'soundbox.jpg', thumbnailURL : 'mimi_soundbox.jpg', caption: 'sound engineer items'},
    {id: 17, imageURL : 'waterfall.jpg', thumbnailURL : 'mimi_waterfall.jpg', caption: 'beautiful waterfall'},
];
let clickedId;



// all helper variables declarations

// all helper functions
// render markup
const renderMarkup = function(container, position, markup) {
    container.insertAdjacentHTML(position, markup);
}

const addHidden = function(container, activity) {
    lightboxContainer.classList.add('hidden')
}


// all event listeners
// rendering images on start
document.addEventListener('DOMContentLoaded', function(e) {
    imageDB.forEach(image => {
        renderMarkup(galleryContainer, 'beforeend', thumbnailMarkup(image));
    })

    // const imgElements = document.querySelectorAll('.thumbnail_image');
    const imgElements = document.querySelectorAll('img[data-img]');

    // using intersection observer 
    const options = {
        root: null,
        threshold: 0,
    }
    const observerFn = function(entries) {

        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // entry.target.src = entry.target.dataset.img;
            entry.target.closest('.thumbnail_image').classList.remove('blur');
            entry.target.closest('.thumbnail_image').classList.remove('disable_mouse_event');

            entry.target.addEventListener('load', function() {
                this.closest('.thumbnail_image').classList.remove('blur');
                this.closest('.thumbnail_image').classList.remove('disable_mouse_event');

            })
            
        });
    }
    const observer = new IntersectionObserver(observerFn, options)
    imgElements.forEach(element => observer.observe(element))

})




/**lightbox 
 * when an image is clicked it should open up
 * 
 */
mainContainer.addEventListener('click', function(e) {
    if (e.target.closest('.thumbnail_image')) {
        clickedId = +e.target.closest('.thumbnail_image').dataset.key;

        // opening lightbox dynamic from js
        const lightboxMarkup = 
        `
        <!-- ligthbox container -->
        <section class="lightbox_container  ">
            <!-- close btn -->
            <button class="close-btn">
                <img src="./assets/svgs/close.svg" alt="close button svg">
            </button>
            <!-- navigation btn -->
             <div class="navigations">
                 <button class="previous-btn">
                     <img src="./assets/svgs/previous.svg" alt="previous button svg">
                 </button>
                 <button class="next-btn">
                     <img src="./assets/svgs/next.svg" alt="next button svg">
                 </button>
             </div>
            <!-- image container -->
            <figure class="image_container">
                <img src="./assets/images/${imageDB[clickedId].imageURL}" alt="${imageDB[clickedId].caption}">
                <!-- caption -->
                 <div class="caption_container">
                     <figcaption class="caption">${imageDB[clickedId].caption}</figcaption>
                     <button class="edit-btn">
                         <img src="./assets/svgs/edit.svg" alt="edit icon svg">
                     </button>
                 </div>
            </figure>
        </section>
        `
        renderMarkup(mainContainer, 'beforeend', lightboxMarkup);
        document.querySelector('body').classList.add('noscroll');
        return;
        
    }
    if (e.target.closest('.close-btn')) {
        e.target.closest('.lightbox_container').remove()
        document.querySelector('body').classList.remove('noscroll');
        return;
    }
})

/**loading effect
 * when you click on a selected image
 * the lightbox container or markup is pushed to the DOM and parsed with the thumbnail
 * listen to the load of the original or the high image
 * animate the loading effect
 * when load is complete display image
 */

// 
mainContainer.addEventListener('click', function(e) {
    let updatedCaption = '';

    if (e.target && e.target.closest('.edit-btn')) {
        const editPopupMarkup = 
        `
        <section class="edit_caption">
            <input type="text" class="edit_input" value="${imageDB[clickedId].caption}">
            <div class="response_controls">
                <button class="cancel">Cancel</button>
                <button class="ok">Ok</button>
            </div>
        </section>
        `;
        const captionContainer = this.querySelector('.image_container > div');
        renderMarkup(captionContainer, 'beforeend', editPopupMarkup);
    }

    // if e.target is ok
    if (e.target.classList.contains('ok')) {
        updatedCaption = e.target.closest('.edit_caption').querySelector('input').value;
        imageDB[clickedId].caption = updatedCaption;

        e.target.closest('.caption_container').querySelector('.caption').textContent = updatedCaption;
    }
    
    // closing the edit popup
    if (e.target.classList.contains('ok') || e.target.classList.contains('cancel')) return e.target.closest('.edit_caption').remove();

    // implement a scenario if input was updated as blank it through an alert


    // navigation - moving left or right
    // (clickedId < 1) && document.querySelector('.previous-btn')?.classList.add('hidden');
    // (clickedId >= imageDB.length - 1) && document.querySelector('.next-btn')?.classList.add('hidden');

    if (e.target.closest('.previous-btn')) {
        previousImage(e, clickedId);
    }
    
    if (e.target.closest('.next-btn')) {
        nextImage(e, clickedId);
    }

})

const previousImage = function(e, index) {
    const imgElement = e.target.closest('.lightbox_container').querySelector('figure > img');
    const captionElement = e.target.closest('.lightbox_container').querySelector('figcaption');

    imgElement.setAttribute('src', `./assets/images/${imageDB[index - 1].imageURL}`);
    imgElement.setAttribute('alt', `${imageDB[index - 1].caption}`);
    captionElement.textContent = `${imageDB[index - 1].caption}`;

    clickedId -= 1;
    (clickedId < 1) && e.target.closest('.previous-btn').classList.add('hidden');
    e.target.closest('.navigations').querySelector('.next-btn').classList.remove('hidden');  

    return;
}
const nextImage = function(e, index) {
    const imgElement = e.target.closest('.lightbox_container').querySelector('figure > img')
    const captionElement = e.target.closest('.lightbox_container').querySelector('figcaption');

    imgElement.setAttribute('src', `./assets/images/${imageDB[index + 1].imageURL}`);
    imgElement.setAttribute('alt', `${imageDB[index + 1].caption}`);
    captionElement.textContent = `${imageDB[index + 1].caption}`;

    clickedId += 1;
    (clickedId === imageDB.length - 1) && e.target.closest('.next-btn').classList.add('hidden');
    e.target.closest('.navigations').querySelector('.previous-btn').classList.remove('hidden');

    return;
}

const thumbnailMarkup = function(imageData) {
    return `
        <!-- thumbnail element -->
        <div class="thumbnail_image disable_mouse_event blur" data-key=${imageData.id}>
            <!-- alt text for accessibility -->
                
          <img src="./assets/mimified_imgs/${imageData.thumbnailURL}" alt="${imageData.caption}"  data-img="./assets/images/${imageData.imageURL}"> 
        </div>
    `;
}











