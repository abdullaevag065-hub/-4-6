const API_URL = 'https://jsonplaceholder.typicode.com/comments';
        const commentsContainer = document.getElementById('commentsContainer');
        const commentForm = document.getElementById('commentForm');

        
        async function fetchComments() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Ошибка при получении данных');
                
                const comments = await response.ok ? await response.json() : [];
                
                
                commentsContainer.innerHTML = '';
                comments.slice(0, 5).forEach(comment => {
                    renderComment(comment);
                });
            } catch (error) {
                commentsContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
            }
        }

        
        function renderComment(comment) {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.innerHTML = `
                <h4>${comment.name}</h4>
                <div class="email">${comment.email}</div>
                <p>${comment.body}</p>
            `;
            // Вставляем новые комментарии в начало списка
            commentsContainer.prepend(card);
        }

       
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            
            const newComment = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                body: document.getElementById('body').value,
                postId: 1 
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(newComment)
                });

                if (!response.ok) throw new Error('Ошибка при отправке данных');

                const createdComment = await response.json();
                
                
                renderComment(createdComment);

                
                commentForm.reset();
                alert('Комментарий успешно отправлен (имитация)!');

            } catch (error) {
                alert(`Не удалось отправить: ${error.message}`);
            }
        });

        fetchComments();