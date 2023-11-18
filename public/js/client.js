const app = (() => {

    
    
    const postTable = document.querySelector('.user-posts')

    async function deletePost(id) {
        
        await fetch('/post/' + id, {
            method: 'DELETE'
        })
        window.location.reload()
    }

    function askAgain(id) {
        const del = confirm('Are you sure you want to delete this post?')

        if (del) deletePost(id)
    }

    function init() {
        
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn'))
            askAgain(e.target.dataset.id)
        })
    }

    return { init }
})()

app.init()