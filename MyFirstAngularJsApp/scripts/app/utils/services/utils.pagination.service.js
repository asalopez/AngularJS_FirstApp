angular.module('app')

.service('paginationService', paginationServiceFn);

function paginationServiceFn() {

    this.gridPagination = [];
    this.totalPags = 0;

    // Devuelve un JSON con la paginación deseada
    // gridPageSelected: página seleccionada en el GRID que corresponda
    // totalPags: numéro de páginas totales en base al resultado del API
    this.getPagination = function (gridPageSelected, totalPags) {

        this.gridPagination = [{ "page": "←", "disabled": (gridPageSelected == 1), "show": true }];

        for (var i = 0; i < totalPags; i++) {
            this.gridPagination.push({ "page": i + 1, "disabled": (i + 1 == gridPageSelected), "show": false });
        }

        this.gridPagination.push({ "page": "→", "disabled": (gridPageSelected == totalPags), "show": true });

        // More 6 pags, ...
        if (totalPags > 6) {
            // Select 5 first
            if (gridPageSelected <= 4) {
                for (var i = 1; i <= 5; i++) {
                    this.gridPagination[i].show = true;
                }

                this.gridPagination.splice(6, 0, { "page": "...", "disabled": true, "show": true });

                this.gridPagination[totalPags + 1].show = true;
            }

                // Select the middle
            else if (gridPageSelected > 4 && gridPageSelected <= totalPags - 4) {
                for (var i = gridPageSelected; i <= gridPageSelected + 1; i++) {
                    this.gridPagination[i].show = true;
                }

                for (var i = gridPageSelected; i >= gridPageSelected - 1; i--) {
                    this.gridPagination[i].show = true;
                }

                this.gridPagination.splice(gridPageSelected - 2, 0, { "page": "...", "disabled": true, "show": true });
                this.gridPagination.splice(gridPageSelected + 3, 0, { "page": "...", "disabled": true, "show": true });

                this.gridPagination[1].show = true;
                this.gridPagination[totalPags + 2].show = true;
            }

                // Select 5 last
            else if (gridPageSelected >= totalPags - 4) {
                for (var i = totalPags - 4; i <= totalPags; i++) {
                    this.gridPagination[i].show = true;
                }

                this.gridPagination.splice(totalPags - 6, 0, { "page": "...", "disabled": true, "show": true });

                this.gridPagination[1].show = true;
            }
        }
        else {
            angular.forEach(this.gridPagination, function (item, idex) {
                item.show = true;
            });
        }

        return this.gridPagination;
    }

};