// console.log("hello");

const handleBtn = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data1 = await res.json();
    const data2 = data1.data;
    displayBtn(data2);
}

handleBtn();

const displayBtn = (data) => {

    const btnContainer = document.getElementById('btn-container');
    
    data.forEach( (dataElement) => {
        console.log(dataElement);
        const element = document.createElement('div');
        element.classList = ` mx-auto `;

        element.innerHTML = `
        <button  onclick="displayVideos('${dataElement.category_id}')" class=" btn btn-primary bg-gray-200 text-black border-none w-24"> ${dataElement.category} </button>
        `;
        
        btnContainer.appendChild(element);
    })
}

const displayVideos = (id) => {
    console.log(id);
}

const blogbtn = () => {
    location.href = 'blog.html';
}