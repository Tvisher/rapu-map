
// function openModal(copyElement) {
//     var modalContent = $(copyElement).clone();
//     $infoModal.find('.modal-body').empty().append(modalContent);
//     $infoModal.modal('show');
// }
const isMobile = false;


function startPopovers() {
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
            // else {
            //     $mapElement.on('click', function (e) {
            //         e.preventDefault();
            //         openModal(el);
            //     });
            // }
        });
    }
}



const res = [
    {
        "region": "region_23",
        "color": "#26c99b",
        "data": {
            "title": "test2",
            "modalData": [
                {
                    "city": "gorod1",
                    "name": "name1",
                    "company": "name1",
                    "logo": "/upload/iblock/df5/ski5mpzjijdgcar8q198bjevxm3dt2m4/png-transparent-number-graphy-1-miscellaneous-computer-network-angle (1).png"
                },
                {
                    "city": "gorod2",
                    "name": "name2",
                    "company": "name2",
                    "logo": "/upload/iblock/f53/hgmqahfprwsmaayj74bcofxj0bk9dktg/\u0411\u0435\u0437 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f (3).png"
                },
                {
                    "city": "gorod3",
                    "name": "name3",
                    "company": "name3",
                    "logo": "/upload/iblock/e8d/6jmolbsynpw8j4k4e1n5aubobtj6hdu6/\u0411\u0435\u0437 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044f (4).png"
                },
                { "city": "gorod4", "name": "name4", "company": "name4", "logo": null }
            ]
        }
    },
    {
        "region": "region_32",
        "color": "#c754c7",
        "data": {
            "title": "test1",
            "modalData": [
                { "city": "gorod1", "name": "name1", "company": "name1", "logo": null },
                { "city": "gorod2", "name": "name2", "company": "name2", "logo": null },
                { "city": "gorod3", "name": "name3", "company": "name3", "logo": null },
                { "city": "gorod4", "name": "name4", "company": "name4", "logo": null }
            ]
        }
    },
    { "region": "region_46", "color": "#39db51" }
]

const modalsContainer = document.querySelector('.map-popovers');
function paintMap(res) {
    const regions = document.querySelectorAll('[data-id]');
    const regionsLocation = document.querySelectorAll('[data-ico]');
    regions.forEach(item => {
        item.computedStyleMap.fill = '#D0D0D0';
    });
    regionsLocation.forEach(item => item.classList.remove('show'));


    res.forEach(item => {
        const region = item.region;
        const regionColor = item.color;
        const mapRegion = document.querySelector(`[data-id="${region}"]`);
        const regionMarker = document.querySelector(`[data-ico="${region}"]`);
        mapRegion.style.fill = regionColor;
        regionMarker.classList.add('show');

        const modalRows = [];
        if (item.hasOwnProperty('data')) {
            if (!item.data.hasOwnProperty('modalData')) return;
            item.data.modalData.forEach(item => {
                const modalRow = `
            <tr>
                <td class="map-company-field map-company-field--city">
                    <div>
                        <div class="map-company-field__name">Город</div>
                        <div class="map-company-field__value">${item.city}</div>
                    </div>
                    <img src="${item.logo}" class="map-company-logo map-company-logo--mobile">
                </td>
                <td class="map-company-field">
                    <div class="map-company-field__name">Название</div>
                    <div class="map-company-field__value">${item.name}</div>
                </td>
                <td class="map-company-field">
                    <div class="map-company-field__name">Компания</div>
                    <div class="map-company-field__value">${item.company}</div>
                    <img src="${item.logo}" class="map-company-logo" alt="">
                </td>
            </tr>`;
                modalRows.push(modalRow);
            });
            const modalRowsString = modalRows.join(' ');
            const modalTemplate = `
            <div class="map-card" data-city="${region}">
                <div class="map-card__header">
                    <h2 class="map-card__title">${item.data.title}</h2>
                </div>
                <div class="map-card__body">
                    <table class="map-company-table">
                        ${modalRowsString}
                    </table>
                </div>
            </div>`;

            modalsContainer.innerHTML = '';
            modalsContainer.insertAdjacentHTML('afterbegin', modalTemplate);
            startPopovers();
        }
    });

}

paintMap(res);