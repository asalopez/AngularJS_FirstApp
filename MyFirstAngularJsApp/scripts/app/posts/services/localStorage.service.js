angular.module('app')

.service('localStorageService', ['$localStorage', function ($localStorage) {

    // Constante para el objeto del LocalStorage
    const POSTS = 'posts';

    // Comprueba si existen Posts en el LocalStorage
    this.any = function any() {
        return $localStorage[POSTS] != null;
    };

    // Guarda los datos en el LocalStorage
    this.save = function save(data) {
        $localStorage[POSTS] = data;
        console.log('Posts guardados en el LocalStorage');
    };

    // Devuelve el contenido del LocalStorage
    this.get = function get() {
        return $localStorage[POSTS];
    };

    // Elimina un Post del LocalStorage
    this.remove = function remove(postId) {
        $localStorage[POSTS] = $localStorage[POSTS].filter(function (item) {
            return item.id != postId;
        });

        return $localStorage[POSTS];
    };

    // Elimina un elemento del array a partir de su índice: OJO si se usa el OrderBy en el listado (índice invertido)
    this.removeByIndex = function removeByIndex(index) {
        return $localStorage[POSTS].splice(index, 1);
    }

    // Guarda un nuevo objeto en el LocalStorage
    this.savePost = function savePost(post) {

        // Si es nueva creación, rellena los campos que le faltan al Post
        if (post.id == null) {
            post.id = $localStorage[POSTS].length + 1;
            post.userId = $localStorage[POSTS].length + 1;

            $localStorage[POSTS].push(post);

            // Si es edición, actualiza el objeto
        } else {
            var index = $localStorage[POSTS].findIndex(function (item) {
                return item.id == post.id;
            });

            $localStorage[POSTS][index] = post;
        }

        return $localStorage[POSTS];
    };

    // Devuelve el post del LocalStorage con el identificador indicado
    this.findOne = function findOne(postId) {
        return $localStorage[POSTS].find(function (item) {
            return item.id == postId;
        });
    };

    // Elimina los elementos almacenados en el LocalStorage
    this.removeAll = function removeAll() {
        delete $localStorage[POSTS];
    };

}]);