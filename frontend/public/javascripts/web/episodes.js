/* global
functions, makeRequest,
objects,
*/

/* Constants */

const URL_CHECK_EPISODES = '/api/episodes/check';
const URL_GET_EPISODES_BY_NAME = '/api/episodes/byName';

/* Variables *

/* JQuery */
const $reload = $('.reload');
const $searchInput = $('.search input');
const $searchButton = $('.search button');

const $patientList = $('.patient-list');

const $shadow = $('.shadow');
const $popup = $shadow.find('.popup');

wsClient.onmessage = async data => {
  const parsedData = JSON.parse(data.data);

  if (parsedData.event !== 'checkEpisodes') {
    return false;
  }

  if (parsedData.message.isFinished) {
    $shadow.removeClass('is_active');

    if (parsedData.message.error) {
      alert(parsedData.message.error);
    }
  } else {
    $popup.empty().append(`<p>Оброблено ${parsedData.message.current} з ${parsedData.message.totalCount}</p>`);
  }
};

$(document).ready(async () => {
  $reload
    .on('click', async () => {
      $shadow.addClass('is_active');
      const result = await checkEpisodes();

      if (!result.status) {
        alert(result.message);
      }
    });

  $searchButton
    .on('click', async function () {
      const value = $searchInput.val();

      if (!value) {
        $patientList.empty();
        return true;
      }

      const episodes = await getEpisodesByName(value);

      $patientList.empty();

      if (!episodes.length) {
        $patientList.append('Результатів не знайдено');
      } else {
        let appendStr = '';

        episodes.forEach(e => {
          const fullName = `${e.patient.lastName || ''} ${e.patient.firstName || ''} ${e.patient.middleName || ''}`;

          appendStr += `<div class="patient">
            <a class="link" href="https://helsi.pro/emk/page/${e.patient.patientId}/medicalHistory/episodes" target="_blank">${fullName}</a>
            <a class="episode" href="https://helsi.pro/emk/page/${e.patient.patientId}/episode/${e.id}/receptions" target="_blank">${e.name}</a>
          </div>`;
        });

        $patientList.append(appendStr);
      }
    });
});

const getEpisodesByName = async (name) => {
  const response = await makeRequest({
    method: 'POST',
    url: URL_GET_EPISODES_BY_NAME,
    body: { name },
  });

  if (!response) {
    alert('Can not get episodes');
    return false;
  }

  return response;
};

const checkEpisodes = async () => {
  const response = await makeRequest({
    method: 'GET',
    url: URL_CHECK_EPISODES,
  });

  if (!response) {
    alert('Can not check episodes');
    return false;
  }

  return response;
};
