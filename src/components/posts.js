/* import {
  onGetPosts, deletePost, getPost, savePost, updatePost,
} from '../firestore';

export function listPosts() {
  const formHome = document.getElementById('formHome');
  const postContainer = document.getElementById('postContainer');
  const btnPost = document.getElementById('btnPost');

  let editStatus = false;
  let id = '';

  onGetPosts((querySnapshot) => {
    postContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const post = doc.data();

      postContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
      <p>${post.message}</p>
      <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
      </div>
      `;
    });

    const btnsDelete = postContainer.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => btn.addEventListener('click', async ({ target: { dataset } }) => {
      try {
        if (window.confirm('Estas seguro de que quieres eliminar este post?')) {
          await deletePost(dataset.id);
        }
      } catch (error) {
        console.log(error);
      }
    }));

    const btnsEdit = postContainer.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => btn.addEventListener('click', async (e) => {
      try {
        const doc = await getPost(e.target.dataset.id);
        const post = doc.data();
        formHome['description-posts'].value = post.message;
        console.log(formHome['btn-post']);

        editStatus = true;
        id = doc.id;
        btnPost.innerHTML = 'Guardar';
        // formHome['btn-post'] = 'update';
      } catch (error) {
        console.log(error);
      }
    }));
  });

  // Borramos un post
  const btnsDelete = postContainer.querySelectorAll('.btn-delete');
  btnsDelete.forEach((btn) => btn.addEventListener('click', async ({ target: { dataset } }) => {
    try {
      if (window.confirm('Estas seguro de que quieres eliminar este post?')) {
        await deletePost(dataset.id);
      }
    } catch (error) {
      console.log(error);
    }
  }));

  // Editamos el post
  const btnsEdit = postContainer.querySelectorAll('.btn-edit');
  btnsEdit.forEach((btn) => btn.addEventListener('click', async (e) => {
    try {
      const doc = await getPost(e.target.dataset.id);
      const post = doc.data();
      formHome['description-posts'].value = post.message;
      console.log(formHome['btn-post']);

      editStatus = true;
      id = doc.id;
      btnPost.innerHTML = 'Guardar';
      // formHome['btn-post'] = 'update';
    } catch (error) {
      console.log(error);
    }
  }));

  // Enviamos el post
  formHome.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textArea = formHome['description-posts'];
    const uid = localStorage.getItem('userId');

    try {
      if (!editStatus) {
        await savePost(textArea.value, uid);
      } else {
        await updatePost(id, {
          message: textArea.value,
        });

        editStatus = false;
        id = '';
        btnPost.innerHTML = 'Publicar';
        // formHome['btn-post'] = 'publicar';
      }

      formHome.reset();
    } catch (error) {
      console.log(error);
    }
  });
}
*/