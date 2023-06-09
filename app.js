
function openModal(copyElement) {
    var modalContent = $(copyElement).clone();
    $infoModal.find('.modal-body').empty().append(modalContent);
    $infoModal.modal('show');
}
const isMobile = false;

if ($('.map-popovers').length) {
    var $infoModal = $('#info-modal');

    $('[data-city]').each(function (i, el) {
        var $el = $(el),
            mapElementSelector = $el.data('city'),
            $mapElement = $(`[data-id="${mapElementSelector}"]`);

        if (!$mapElement.length) {
            console.warn('Не удалось найти элемент карты ' + mapElementSelector);
            return;
        }

        // На десктопе используем popover
        if (!isMobile) {
            $mapElement.popover({
                content: el,
                html: true,
                trigger: 'hover',
                placement: 'auto',
                template: '<div class="popover map-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            });
        }
        // На мобильных modal
        else {
            $mapElement.on('click', function (e) {
                e.preventDefault();
                openModal(el);
            });
        }
    });
}