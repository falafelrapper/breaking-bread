// profile script
var image_url;

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dmm9eqw1o',
    uploadPreset: 'opqxqpcl'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        image_url = result.info.url;
        console.log('Done! Here is the image info: ', result.info);
    }
}
)

const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#recipeName').value.trim();
    const time = document.querySelector('#prepTime').value.trim();
    let category_id = document.querySelector('#recipeCategory').value;
    const description = document.querySelector('#recipeDescription').value.trim();
    const ingredients = document.querySelector('#recipeIngredients').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();

    category_id = parseInt(category_id);
    console.log(category_id);
    
    if (name && time && category_id && description && ingredients && instructions) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, time, category_id, description, image_url, ingredients, instructions }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create recipe');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete recipe');
        }
    }
};



document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

document.querySelector('.recipe-Creator').addEventListener('submit', newFormHandler);

const delBtn = document.querySelectorAll('.project-list');
for (let i = 0; i <delBtn.length; i++) {
    delBtn[i].addEventListener('click', delButtonHandler);
};