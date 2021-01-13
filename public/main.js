


const update = document.querySelector('#update-button')
update.addEventListener('click', () => {
    fetch('/quotes',
        {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Dark Vadar',
                quote: 'come'
            })

        }

    )
})

const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click',()=>{
    fetch('/quotes',
    {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "Dark Vadar"
        })
    })
})
