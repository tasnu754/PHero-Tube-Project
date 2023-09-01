
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
        const element = document.createElement('div');
        element.classList = ` mx-auto `;

        element.innerHTML = `
        <button  onclick="displayVideos('${dataElement.category_id}')" class=" btn btn-primary bg-gray-200 text-black border-none w-24"> ${dataElement.category} </button>
        `;

        if(dataElement.category === 'All'){
            displayVideos(dataElement.category_id);
        }
        
        btnContainer.appendChild(element);
    })
}

const displayVideos = async(id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data2 = await res.json();
    const data = data2.data;

    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    // if(sort()){
    //     data.sort(function(a,b) {
    //         const viewStr1 = b.others?.view;
    //         viewInt1 = parseInt(viewStr1)
    //         const viewStr2 = a.others?.view;
    //         viewInt2 = parseInt(viewStr2)
    //         return viewInt1 - viewInt2;
    //     });     
    //     console.log(data);
        
    // }

    if(data.length > 0){

    data.forEach((item) => {
        const div = document.createElement('div');
        div.classList = "card card-compact w-[360px] bg-base-100 l ml-10 md:mx-2 lg:ml-4 ";

        const t = time(`${item?.others?.posted_date}`);


        div.innerHTML = `
                
        <div class="relative w-[312px]">
          <figure><img class="w-[400px] h-[200px] rounded-md" src="${item.thumbnail}" alt="Shoes" /></figure>
          <div class="border-none rounded-md ${t ? 'bg-[#171717]' : 'bg-none'}   absolute m-0 p-0 right-2 bottom-4">
            <p class="text-[#FFFFFF] mx-2 my-1  text-xs font-normal"> ${t} </p>
          </div>
        </div>
        
                <div class="card-body">
                  <div class="flex gap-4 items-center ">
                    <img class="w-[40px] h-[40px] rounded-full" src="${item.authors[0].profile_picture}" alt="">
                    <h2 class=" text-base font-bold ">${item.title}</h2>
                  </div>

                  <div class="flex gap-4 ml-14">
                    <h4 class="text-sm font-normal text-[#171717B2]">${item.authors[0].profile_name}</h4>
                    <p>
                    ${item.authors[0].verified? "<img class='w-[20px] h-[20px]' src='verified.png'/>": ''}
                    </p>
                  </div>
                  <div class="ml-14 text-sm font-normal text-[#171717B2]">
                    <p>${item.others?.views} views</p>
                  </div>
                </div>

        `;

      
        cardsContainer.appendChild(div);
        

    })

    }
    else{
        const div = document.createElement('div');
        div.classList = "w-[433px] md:mx-[200px] lg:mx-[600px] my-20";
        div.innerHTML = `
        <img class="mx-auto mb-4 w-[140px] h-[140px]" src="Icon.png">
        <h2 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
        `;

        cardsContainer.appendChild(div);
    }
    
}



const blogbtn = () => {
    location.href = 'blog.html';
}

const time = (sec) => {
    const totalMin = Math.floor( sec / 60);
    const hour = Math.floor(totalMin / 60);
    const min = totalMin % 60;

    const t = `${hour}hrs ${min}min ago`;
    if(hour === 0 && min === 0)
       return '';
    else
       return t;
}
