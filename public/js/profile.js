// profile script
var img_url = '';

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'my_cloud_name',
    uploadPreset: 'my_preset'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        img_url = result.info.url;
        console.log('Done! Here is the image info: ', result.info);
    }
}
)

const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#recipeName').value.trim();
    const time = document.querySelector('#prepTime').value.trim();
    const category = document.querySelector('#recipeCategory').value.trim();
    const description = document.querySelector('#recipeDescription').value.trim();
    const ingredients = document.querySelector('#recipeIngredients').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();

    if (name && time && category && description && ingredients && instructions) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ name, time, category, description, img_url, ingredients, instructions }),
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

document.querySelector('.project-list').addEventListener('click', delButtonHandler);