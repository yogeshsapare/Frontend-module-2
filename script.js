const createBlog = document.querySelector(".create-blog");
const modal =document.querySelector(".modal");
const modalEdit =document.querySelector(".modal-edit");

const publish=document.querySelector(".publish");
const cancel =document.querySelector(".cancel");
const closeEl =document.querySelector(".close");
const topic=document.querySelector('#topic');
const description=document.querySelector('#description');
const blogEl =document.querySelector(".blog")


let blogData=[];



function createModal(){
    modal.classList.remove('hide');

}




function cancelBlog() {
    topic.value="";
    description.value="";
    modal.classList.add('hide');
}

function abc(){
    alert("hiiii");
}




createBlog.addEventListener('click',createModal);
// publish.addEventListener('click',publishBlog)
cancel.addEventListener('click',cancelBlog)
closeEl.addEventListener('click',cancelBlog)
// editButton.addEventListener('click',abc)

function createPost(){
    const title = document.getElementById("topic").value;
    const description = document.getElementById("description").value;
    const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
const createdAt = `Created At: ${date} at ${time}`;

    blogData.push({
        id: blogData.length + 1,
        title,
        description,
        createdAt

    });

    modal.classList.add('hide');

    showAllPosts();

    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
}

function editPost(id){
    modalEdit.classList.remove('hide');
    const blog = blogData.find(s => s.id === id);

    document.getElementById("edit-topic").value = blog.title;
    document.getElementById("edit-description").value = blog.description;

    document.getElementById("edit-post-button").setAttribute("data", id);
    document.getElementById("delete-post-button").setAttribute("data", id);
}

function saveEditPost() {
    const id = Number(document.getElementById("edit-post-button").getAttribute("data"));
    const title = document.getElementById("edit-topic").value;
    const description = document.getElementById("edit-description").value;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const createdAt = `Last updated At: ${date} at ${time}`;

    blogData.find(s => s.id === id).title = title;
    blogData.find(s => s.id === id).description = description;
    blogData.find(s => s.id === id).createdAt = createdAt;

    modalEdit.classList.add('hide');

    showAllPosts();

    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
}

function deletePost(id){
    let blogId = id;

    if(!blogId)
        blogId = Number(document.getElementById("delete-post-button").getAttribute("data"));

    blogData = blogData.filter(s => s.id !== blogId);

    modalEdit.classList.add('hide');
    showAllPosts();

}
function closebtn()
{

    modalEdit.classList.add('hide');
    showAllPosts();
}
function showAllPosts(){
    const showPostWrapper = document.getElementById("showPost");

    showPostWrapper.innerHTML = "";

    blogData.map((blog) => {

        showPostWrapper.innerHTML += `
        <div class="blogItems">
        <div class="titleName">${blog.title}</div>
        <div class="DescName">${blog.description}</div>
        <div class=btnTime>
        <div>
        <button class="editButton" onclick="editPost(${blog.id})">Edit Post</button>
        <button onclick="deletePost(${blog.id})">Delete Post</button>
        </div>
        
        <div> ${blog.createdAt}  </div>
        </div>
        </div>
        `;
    });
}