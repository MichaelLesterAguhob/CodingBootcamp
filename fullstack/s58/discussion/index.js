
fetch('https://jsonplaceholder.typicode.com/posts')
.then(function(response) {
	return response.json()
})
.then(function(data) {
	// console.log(data)
	showPosts(data);
});


const showPosts = function(posts) {
	let postEntries = '';
	posts.forEach(function(post) {
		postEntries += `
			<div id="post-${post.id}">
				<h3 id="post-title-${post.id}">${post.title}</h3>
				<p id="post-body-${post.id}">${post.body}</p>
				<button onclick="editPost('${post.id}')">Edit</button>
				<button onclick="deletePost('${post.id}')">Delete</button>
			</div>
		`
	});
	document.querySelector("#div-post-entries").innerHTML = postEntries;
}


document.querySelector('#form-add-post').addEventListener('submit', function(event) {

	event.preventDefault();

	let titleInput = document.querySelector('#txt-title');
	let bodyInput = document.querySelector('#txt-body');

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({
			title: titleInput.value,
			body: bodyInput.value,
			userId: 1
		}),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(function(response) {
		return response.json()
	})
	.then(function(data) {
		console.log(data);
		alert('Successfully added');
		titleInput.value = null;
		bodyInput.value = null;
	})
})


const editPost = function(id) {
	let title = document.querySelector(`#post-title-${id}`).innerHTML;
	let body = document.querySelector(`#post-body-${id}`).innerHTML;

	document.querySelector('#txt-edit-id').value = id;
	document.querySelector('#txt-edit-title').value = title;
	document.querySelector('#txt-edit-body').value = body;
	document.querySelector('#btn-submit-update').removeAttribute('disabled');
}


document.querySelector('#form-edit-post').addEventListener('submit', function(event) {
	event.preventDefault();

	let titleInput = document.querySelector('#txt-edit-title');
	let bodyInput = document.querySelector('#txt-edit-body');

	fetch('https://jsonplaceholder.typicode.com/posts/1', {
		method: 'PUT',
		body: JSON.stringify({
			title: titleInput.value,
			body: bodyInput.value,
			userId: 1
		}),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(function(response) {
		return response.json()
	})
	.then(function(data) {
		// console.log(data);
        console.log("Successfully Updated");
		alert('Successfully updated');
		titleInput.value = null;
		bodyInput.value = null;
        document.querySelector('#btn-submit-update').setAttribute('disabled', 'true');
	})

})

function deletePost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        alert('Successfully deleted');
        document.querySelector(`#post-${postId}`).remove();
    })
}

document.querySelector('#delete-all').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/delete-all', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        alert('All Posts Deleted');
        
        document.querySelectorAll('#div-post-entries div').forEach(post => {
            post.remove();
        })
    })
})