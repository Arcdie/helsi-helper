/* global
functions, makeRequest,
objects, moment,
*/

/* Constants */

const URL_CHECK_DIAGNOSES = '/api/diagnoses/check';
const URL_GET_DIAGNOSES_BY_NAME = '/api/diagnoses/byName';

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

  if (parsedData.event !== 'checkDiagnoses') {
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
      const result = await checkDiagnoses();

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

      const diagnoses = await getDiagnosesByName(value);

      $patientList.empty();

      if (!diagnoses.length) {
        $patientList.append('Результатів не знайдено');
      } else {
        let appendStr = '';

        diagnoses.forEach(e => {
          const fullName = `${e.patient.lastName || ''} ${e.patient.firstName || ''} ${e.patient.middleName || ''}`;

          let diagnosesStr = '';

          if (e.diagnoses && e.diagnoses.length) {
            e.diagnoses.forEach(d => {
              const validDate = moment(d.effectiveDateTime).format('DD.MM.YY HH:mm');

              diagnosesStr += `<div class="diagnosis">
                <a href="https://helsi.pro/emk/page/${e.patient.patientId}/diagnosticReports/view/${d.id}" target="_blank">${d.name} (${validDate})</a>
                <div class="result">
                  <div class="titles">
                    <span>Заключення лікаря:</span>
                    <span>Результати дослідження:</span>
                  </div>
                  <div class="values">
                    <span>${d.conclusion}</span>
                    <span>${d.diagnosticResult}</span>
                  </div>
                </div>
              </div>`;
            });
          }

          appendStr += `<div class="patient">
            <a class="link" href="https://helsi.pro/emk/page/${e.patient.patientId}/diagnosticReports" target="_blank">${fullName}</a>
            ${diagnosesStr}
          </div>`;
        });

        $patientList.append(appendStr);
      }
    });
});

const getDiagnosesByName = async (names) => {
  const response = await makeRequest({
    method: 'POST',
    url: URL_GET_DIAGNOSES_BY_NAME,
    body: { names },
  });

  if (!response) {
    alert('Can not get diagnoses');
    return false;
  }

  return response;
};

const checkDiagnoses = async () => {
  const response = await makeRequest({
    method: 'GET',
    url: URL_CHECK_DIAGNOSES,
  });

  if (!response) {
    alert('Can not check diagnoses');
    return false;
  }

  return response;
};

