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
    {id: 0, imageURL : 'female_designer.jpg', thumbnailURL : '', caption: 'Cute girl in front of her computer'},
    {id: 1, imageURL : 'img2.jpg', thumbnailURL : '', caption: 'beautiful smoky background'},
    {id: 2, imageURL : 'mid-day_highway.jpg', thumbnailURL : '', caption: 'Highway background image'},
    {id: 3, imageURL : 'awesome_painting.jpg', thumbnailURL : '', caption: 'artistic oil painting'},
    {id: 4, imageURL : 'water-droplets.jpg', thumbnailURL : '', caption: 'Water droplet image'},
    {id: 5, imageURL : 'stars.jpg', thumbnailURL : '', caption: 'stars above the sky'},
    {id: 6, imageURL : 'cube.jpg', thumbnailURL : '', caption: 'transparent cube'},
    {id: 7, imageURL : 'male_programmer.jpg', thumbnailURL : '', caption: 'male programer'},
    {id: 8, imageURL : 'male_programmer.jpg', thumbnailURL : '', caption: 'male programer'},
    {id: 9, imageURL : 'male_programmer.jpg', thumbnailURL : '', caption: 'male programer'},
    {id: 10, imageURL : 'male_programmer.jpg', thumbnailURL : '', caption: 'male programer'},
    {id: 11, imageURL : 'male_programmer.jpg', thumbnailURL : '', caption: 'male programer'},
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
        const markup = 
        `
            <!-- thumbnail element -->
            <div class="thumbnail_image" data-key=${image.id}>
                <!-- alt text for accessibility -->
                    
              <img src="./assets/images/${image.imageURL}" alt="${image.caption}"> 
            </div>
        `;

        renderMarkup(galleryContainer, 'afterbegin', markup);
    })
})

/**lightbox 
 * when an image is clicked it should open up
 * 
 */
mainContainer.addEventListener('click', function(e) {
    if (e.target.closest('.thumbnail_image')) {
        // console.log(e.target);
        clickedId = e.target.closest('.thumbnail_image').dataset.key;
        console.dir(clickedId);
        // opening lightbox using classLists
        // lightboxContainer.classList.remove('hidden');

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
                <img src="" alt="some image">
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
        
        return;
        
    }
    if (e.target.closest('.close-btn')) {
        e.target.closest('.lightbox_container').remove()
        // lightboxContainer.classList.add('hidden');

        return;
    }
})

// 
mainContainer.addEventListener('click', function(e) {
    let updatedCaption = '';

    if (e.target && e.target.closest('.edit-btn')) {
        // console.log(imageDB[clickedId].caption);

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
        console.log(updatedCaption);
        imageDB[clickedId].caption = updatedCaption;
        console.log(imageDB[clickedId].caption);

        e.target.closest('.caption_container').querySelector('.caption').textContent = updatedCaption;

        // // removing element from DOM
        // e.target.closest('.edit_caption').remove();
    }
    
    // if e.target is cancel
    if (e.target.classList.contains('ok') || e.target.classList.contains('cancel')) return e.target.closest('.edit_caption').remove();

    // implement a scenario if input was updated as blank it through an alert

})

// editing caption
mainContainer.addEventListener('click', function(e) {

})



// editBtn?.addEventListener('click', function(e) {
//     const editPopupMarkup = 
//     `
//     <section class="edit_caption">
//         <input type="text" class="edit_input">
//         <div class="response_controls">
//             <button class="cancel">Cancel</button>
//             <button class="ok">Ok</button>
//         </div>
//     </section>
//     `;
//     renderMarkup(captionContainer, 'beforeend', editPopupMarkup);
// });

// captionContainer?.addEventListener('click', function(e) {
//     if (e.target.classList.contains('ok') || e.target.classList.contains('cancel')) {
//         console.log(clickedId);
//         e.target.closest('.edit_caption').remove();
//     }
// })

// editCaptionContainer?.addEventListener('click', function(e) {
//     console.log('w')
//     // if (e.target.closest('.response_controls')) {
//     //     e.target.closest('.edit_caption').remove();
//     // }
// })


